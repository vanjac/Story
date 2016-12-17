// WORK IN PROGRESS!


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
    
    var inString = false, stringStartChar, bracketDepth = 0,
        textInLine = false, textInPreviousLine = false;
    var multiline = false, textLiteral = true, underscores = true;
    for(var i = 0; i < len; i++) {
        var c = expression.charAt(i);
        
        if(c != '_')
            underscores = false;
        
        if(c == ' ' || c == '\t')
            continue;
        
        if(c == '\n' && bracketDepth == 0) {
            textInPreviousLine = textInLine;
            textInLine = false;
            continue;
        }
        
        textInLine = true;
        if(textInPreviousLine) {
            multiline = true;
            break;
        }
        
        if(inString) {
            if(c == stringStartChar) {
                inString = false;
            }
        } else {
            if(c == '\"' || c == '\'') {
                inString = true;
                stringStartChar = c;
            } else {
                textLiteral = false;
            }
            
            if(c == '[')
                bracketDepth += 1;
            if(c == ']')
                bracketDepth -= 1;
        }
    }
    
    if(multiline) {
        // multiline...
        // split into lines (brackets contine line); remove all comments
        console.log("multiline");
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
        // remove all comments!
        console.log("command");
    }
}


function _removeComments(expression) {
    var lines = expression.split("\n");
    for(var i = 0, numLines = lines.length; i < numLines; i++) {
        var line = lines[i];
        var inString = false, stringStartChar;
        for(var j = 0, numChars = line.length; j < numChars; j++) {
            var c = line.charAt(j);
            
            if(!inString) {
                if(c == '\"' || c == '\'') {
                    inString = true;
                    stringStartChar = c;
                }
                if(c == ':') {
                    line = line.substring(0, j);
                    break;
                }
            } else {
                if(c == stringStartChar) {
                    inString = false;
                }
            }
        }
        
        lines[i] = line;
    }
    
    return lines.join("\n");
}


function ScriptError(message, type, index, length) {
    this.message = message;
    this.type = type;
    this.index = index;
    this.length = length;
}

