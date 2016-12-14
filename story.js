// WORK IN PROGRESS!


if(typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}


// assumes that the expression has no errors
function compileExpression(expression, language) {
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
    var inComment = false, inString = false, stringStartChar, bracketDepth = 0,
        textInLine = false, textInPreviousLine = false;
    var multiline = false, numberLiteral = true, textLiteral = true,
        underscores = true, empty = true;
    for(var i = 0; i < len; i++) {
        var c = expression.charAt(i);
        if(c == ' ' || c == '\t') {
            underscores = false;
            numberLiteral = false;
            continue;
        }
        if(c == '\n' && bracketDepth == 0) {
            inComment = false;
            textInPreviousLine = textInLine;
            textInLine = false;
            continue;
        }
        if(!inComment) {
            if(c == ':' && !inString) {
                inComment = true;
                underscores = false;
                numberLiteral = false;
                textLiteral = false;
                continue;
            }
            
            textInLine = true;
            if(textInPreviousLine)
                multiline = true;
            empty = false;
            
            if(c != '_')
                underscores = false;
            if(isNaN(c) && c != '.' && c != '-')
                numberLiteral = false;
            
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
    }
    
    if(empty) {
        return null;
    } else if(multiline) {
        // multiline...
        console.log("multiline");
    } else if(underscores) {
        // blank
        throw "You must remove all blanks (underscores) before compiling!";
    } else if(numberLiteral) {
        // number literal
        return {
            "literalText": expression
        };
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


function ScriptError(message, type, index, length) {
    this.message = message;
    this.type = type;
    this.index = index;
    this.length = length;
}

