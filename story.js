// WORK IN PROGRESS!

// assumes that the expression has no errors
function compileExpression(expression, language) {
    return _compileRecursive(expression, language);
}

function checkExpression(expression, language) {
    var errors = [ ]
    
    return errors;
}


function _compileRecursive(expression, language) {
    var len = expression.length;
    if(len == 0)
        return null;
    // determine what type of expression this is...
    var inComment = false, inString = false, stringStartChar,
        textInLine = false, textInPreviousLine = false;
    var multiline = false, numberLiteral = true, textLiteral = true,
        underscores = true, empty = true;
    for(var i = 0; i < len; i++) {
        var c = expression.charAt(i);
        if(c == ' ' || c == '\t')
            continue;
        if(c == '\n') {
            inComment = false;
            textInPreviousLine = textInLine;
            textInLine = false;
            continue;
        }
        if(!inComment) {
            if(c == ':' && !inString) {
                inComment = true;
                continue;
            }
            
            textInLine = true;
            if(textInPreviousLine)
                multiline = true;
            empty = false;
            
            if(c != '_')
                underscores = false;
            if(isNaN(c))
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
            }
        }
    }
    
    if(empty)
        return null;
}


function ScriptError(message, type, index, length) {
    this.message = message;
    this.type = type;
    this.index = index;
    this.length = length;
}

