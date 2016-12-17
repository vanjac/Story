// WORK IN PROGRESS!

var STRING_LITERAL_CHARS = ['\'', '\"'];
var WHITESPACE = [' ', '\t'];
// strings of symbols have implicit whitespace surrounding them
var SYMBOLS = ['*', '+', '-', '/', '<', '=', '>', '^'];


if(typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}


// assumes that the expression has no errors
function compileExpression(expression, language) {
    expression = _removeComments(expression);
    return _compileRecursive(expression, language);
}

function checkExpression(expression, language) {
    var errors = [ ]
    
    return errors;
}


function _compileRecursive(expression, language) {
    expression = expression.trim();
    var len = expression.length;
    if(len == 0)
        return null;
    // determine what type of expression this is...
    
    if(!isNaN(expression)) {
        // number literal
        return {
            "literalText": expression
        };
    }
    
    var textInLine = false, textInPreviousLine = false;
    var multiline = false, textLiteral = true, underscores = true;
    _iterateExpression(expression, function(c, i, inString, bracketDepth) {
        if(c != '_')
            underscores = false;
        
        if(WHITESPACE.indexOf(c) != -1) {
            if(!inString)
                textLiteral = false;
            return;
        }
        
        if(c == '\n' && bracketDepth == 0) {
            textInPreviousLine = textInLine;
            textInLine = false;
            textLiteral = false;
            return;
        }
        
        textInLine = true;
        if(textInPreviousLine) {
            multiline = true;
            return false;
        }
        
        if(!inString && STRING_LITERAL_CHARS.indexOf(c) == -1)
            textLiteral = false;
    });
    
    if(multiline) {
        // multiline...
        var lines = [];
        var prevLineIndex = 0;
        _iterateExpression(expression, function(c, i, inString, bracketDepth) {
            if(c == '\n' && bracketDepth == 0) {
                var line = expression.substring(prevLineIndex, i).trim();
                if(line.length != 0)
                    lines.push(line);
                prevLineIndex = i + 1;
            }
        });
        var line = expression.substring(prevLineIndex, len).trim();
        if(line.length != 0)
            lines.push(line);
        var compiledLines = [];
        for(var i = 0, numLines = lines.length; i < numLines; i++) {
            compiledLines.push(_compileRecursive(lines[i], language));
        }
        return {
            "Lines": compiledLines
        };
    } else if(underscores) {
        // blank
        throw "You must remove all blanks (underscores) before compiling!";
    } else if(textLiteral) {
        // text literal
        return {
            "literalText": expression.substring(1, expression.length - 1)
        };
    } else {
        // command...
        var parts = [];
        var prevSpaceIndex = 0, symbolString = false, wasInString = false;
        expression = expression + " "; // process last part
        _iterateExpression(expression, function(c, i, inString, bracketDepth) {
            var isSymbol = SYMBOLS.indexOf(c) != -1;
            var isWhitespace = WHITESPACE.indexOf(c) != -1;
            var isStringChar = STRING_LITERAL_CHARS.indexOf(c) != -1;
            if((bracketDepth == 0 || (bracketDepth == 1 && c == '['))
                    && (!inString || isStringChar)) {
                if(isWhitespace || c == '[' || (isSymbol && !symbolString)
                        || (!isSymbol && symbolString)
                        || (!(inString || isStringChar) && wasInString)
                        || ((inString || isStringChar) && !wasInString)) {
                    symbolString = isSymbol;
                    var part = expression.substring(prevSpaceIndex, i).trim();
                    if(part.length != 0) {
                        if(part.charAt(0) == '['
                                && part.charAt(part.length - 1) == ']') {
                            part = part.substring(1, part.length - 1).trim();
                            // [ ] is still allowed
                        }
                        parts.push(part);
                    }
                    prevSpaceIndex = i;
                }
            } else {
                symbolString = false;
            }
            wasInString = inString || isStringChar;
        });
        
        // determine which command this is...
        var matchingCommand = null;
        for(var i = 0, numCommands = language.Commands.length;
                i < numCommands; i++) {
            var command = language.Commands[i];
            var keywordWords = command.BasePhrase.keyword.split(" ");
            var hasPrefix = command.PrecedingArgument !== undefined;
            var minimumLength = keywordWords.length;
            if(hasPrefix)
                minimumLength += 1;
            if(parts.length < minimumLength)
                continue;
            var matches = true;
            for(var partIndex = 0; partIndex < keywordWords.length;
                    partIndex++) {
                if(parts[partIndex + (hasPrefix ? 1 : 0)]
                        != keywordWords[partIndex]) {
                    matches = false;
                    break;
                }
            }
            
            if(matches) {
                matchingCommand = command;
                break;
            }
        }
        if(matchingCommand == null) {
            throw "No matching command for " + expression;
        }
        var compiledCommand = {
            "keyword": matchingCommand.BasePhrase.keyword,
            "Arguments": [ ],
            "optionalPhraseKeywords": [ ]
        }
        
        var partIndex = 0;
        if(matchingCommand.PrecedingArgument !== undefined) {
            compiledCommand.PrecedingExpression =
                _partValue(parts[0], matchingCommand.PrecedingArgument,
                    language);
            partIndex = 1;
        }
        // skip keywords
        partIndex += command.BasePhrase.keyword.split(" ").length;
        for(var phrasePartIndex = 0,
                numPhraseParts = matchingCommand.BasePhrase.Parts.length;
                phrasePartIndex < numPhraseParts; phrasePartIndex++) {
            var part = parts[partIndex];
            var phrasePart = matchingCommand.BasePhrase.Parts[phrasePartIndex];
            if(phrasePart.id !== undefined) {
                compiledCommand.Arguments.push({
                    "id": phrasePart.id,
                    "Expression": _partValue(part, phrasePart, language)
                });
            }
            partIndex++;
        }
        // optional phrases...
        
        return compiledCommand
    }
}


function _partValue(part, partDefinition, language) {
    if(partDefinition.type == "") {
        return {
            "literalText": part
        };
    } else {
        return _compileRecursive(part, language);
    }
}


function _removeComments(expression) {
    var lines = expression.split("\n");
    for(var i = 0, numLines = lines.length; i < numLines; i++) {
        var line = lines[i];
        _iterateExpression(line, function(c, j, inString, bracketDepth) {
            if(!inString && c == ':') {
                line = line.substring(0, j);
                return false;
            }
        });
        
        lines[i] = line;
    }
    
    return lines.join("\n");
}


// f(char c, int i, bool inString, int bracketDepth)
// return false to stop
function _iterateExpression(expression, f) {
    var inString = false, stringStartChar, bracketDepth = 0;
    for(var i = 0, len = expression.length; i < len; i++) {
        var c = expression.charAt(i);
        
        if(inString) {
            if(c == stringStartChar) {
                inString = false;
            }
        } else {
            if(STRING_LITERAL_CHARS.indexOf(c) != -1) {
                inString = true;
                stringStartChar = c;
            }
            
            if(c == '[')
                bracketDepth += 1;
            if(c == ']')
                bracketDepth -= 1;
        }
        
        if(f(c, i, inString, bracketDepth) === false)
            break;
    }
}


function ScriptError(message, longMessage, type, line) {
    this.message = message;
    this.longMessage = longMessage;
    this.type = type;
    this.line = line;
}

