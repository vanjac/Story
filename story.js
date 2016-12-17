// WORK IN PROGRESS!

STRING_LITERAL_CHARS = ['\'', '\"']


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
        
        if(c == ' ' || c == '\t')
            return;
        
        if(c == '\n' && bracketDepth == 0) {
            textInPreviousLine = textInLine;
            textInLine = false;
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
        // split into lines (brackets contine line)
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
        console.log("command");
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

