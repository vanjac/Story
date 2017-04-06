
### Syntax Constants ###

INVALID_CHARS = ['!', '#', '$', '%', '&', '(', ')', ',', ';', '?', '@', '\\',
                 '`', '{', '|', '}', '~']
WHITESPACE = [' ', '\t']
# strings of symbols have implicit whitespace surrounding them
SYMBOLS = ['*', '+', '-', '/', '<', '=', '>', '^']
TEXT_LITERAL_CHARS = ["'", '"']
COMMENT_CHAR = ':'
OPEN_BRACKET = '['
CLOSE_BRACKET = ']'
BLANK = '_'
MINUS = '-'
# not including minus
NUMBER_LITERAL_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
# not including letters and numbers
WORD_CHARS = ['_']


### Errors, warnings, messages ###

class CompileMessage:

    def __init__(self, message, messageType, location, length):
        self.message = message
        self.type = messageType
        self.location = location
        self.length = length

    def __repr__(self):
        return self.type + " at " + str(self.location) + " - "\
               + str(self.location + self.length) + ": " + self.message

class CompileError(CompileMessage):

    def __init__(self, message, location, length):
        super().__init__(message, "error", location, length)

class CompileWarning(CompileMessage):

    def __init__(self, message, location, length):
        super().__init__(message, "warning", location, length)


class BlankMessage(CompileMessage):

    def __init__(self, location, length):
        super().__init__("Fill in the blank", "blank", location, length)

class UnknownError(CompileError):

    def __init__(self, location, length):
        super().__init__("An unknown error occurred", location, length)

class InvalidCharacterError(CompileError):

    def __init__(self, character, location):
        super().__init__("Invalid character: " + character, location, length=1)

class IncompleteTextError(CompileError):

    def __init__(self, location):
        super().__init__("Text is missing an ending quote", location, length=1)

class UnmatchedOpenBracketError(CompileError):

    def __init__(self, location):
        super().__init__("Opening bracket doesn't have a matching closing "
                         "bracket", location, length=1)

class UnmatchedCloseBracketError(CompileError):

    def __init__(self, location):
        super().__init__("Closing bracket doesn't have a matching opening "
                         "bracket", location, length=1)

class InvalidNumberLiteralError(CompileError):

    def __init__(self, location, length):
        super().__init__("Badly formatted number", location, length)

class TypeNotNothingError(CompileError):

    def __init__(self, location, length):
        super().__init__("Incomplete statement", location, length)

class EmptyExpressionError(CompileError):

    def __init__(self, location, length):
        super().__init__("Empty expression", location, length)


### Tokenizer ###

class Token:

    def __init__(self, location, text=''):
        self.text = text
        self.location = location

    def __repr__(self):
        return repr(self.text) + " @ " + str(self.location)

# check token type:
# these assume a correctly formatted token, which the tokenize function should
# produce as long as there are no errors

def tokenIsNewline(text):
    return text == '\n'

def tokenIsOpenBracket(text):
    return text == OPEN_BRACKET

def tokenIsCloseBracket(text):
    return text == CLOSE_BRACKET

def tokenIsWord(text):
    if text == '':
        return False
    return text[0] != BLANK and (text[0].isalpha() or text[0] in WORD_CHARS)

def tokenIsText(text):
    if text == '':
        return False
    return text[0] in TEXT_LITERAL_CHARS

def tokenIsSymbol(text):
    if text == '':
        return False
    if text[0] == MINUS:
        # make sure this isn't a number
        if len(text) == 1:
            return True
        else:
            return text[1] in SYMBOLS
    else:
        return text[0] in SYMBOLS

def tokenIsNumber(text):
    if text == '':
        return False
    elif len(text) == 1:
        return text in NUMBER_LITERAL_CHARS
    elif text[0] == MINUS:
        return text[1] in NUMBER_LITERAL_CHARS
    else:
        return text[0] in NUMBER_LITERAL_CHARS

def tokenIsBlank(text):
    if text == '':
        return False
    return text[0] == BLANK

# return a tuple: (list of Tokens, list of CompileMessages)
def tokenize(script):
    script += '\n'

    messages = []
    tokens = []

    currentToken = Token(0)
    # identify currentToken type:
    symbol = False
    numberLiteral = False
    blank = False
    word = False

    inComment = False
    inText = False
    textStartChar = None
    bracketDepth = 0
    lineIsEmpty = True

    lastOpenBracketI = 0

    for i in range(0, len(script)):
        c = script[i]

        if inComment:
            if c == '\n':
                inComment = False
            else:
                continue

        if inText:
            currentToken.text += c
            if c == textStartChar or c == '\n':
                if c == '\n':
                    messages.append(IncompleteTextError(i))
                    currentToken.text = currentToken.text[:-1]
                inText = False
                tokens.append(currentToken)
                currentToken = None
            continue

        if c in INVALID_CHARS:
            messages.append(InvalidCharacterError(c, i))

        if c != '\n' and not c in WHITESPACE:
            lineIsEmpty = False


        # check for end of token (no continues here):

        if symbol and not c in SYMBOLS:
            tokens.append(currentToken)
            currentToken = None
            symbol = False

        if numberLiteral and not c in NUMBER_LITERAL_CHARS:
            tokens.append(currentToken)
            try:
                n = float(currentToken.text)
            except ValueError:
                messages.append(InvalidNumberLiteralError(currentToken.location,
                                                        len(currentToken.text)))
            currentToken = None
            numberLiteral = False

        if blank and not c == BLANK:
            tokens.append(currentToken)
            messages.append(BlankMessage(currentToken.location,
                                         len(currentToken.text)))
            currentToken = None
            blank = False

        if word and (not c.isdigit()) and (not c.isalpha()) \
                and not c in WORD_CHARS:
            tokens.append(currentToken)
            currentToken = None
            word = False

        # text / comments are special

        if c in TEXT_LITERAL_CHARS:
            inText = True
            textStartChar = c
            currentToken = Token(i, c)
            continue

        if c == COMMENT_CHAR:
            inComment = True
            continue

        # non-token checks

        if c == '\n':
            if not lineIsEmpty:
                tokens.append(Token(i, '\n'))
            lineIsEmpty = True

        if c == OPEN_BRACKET:
            bracketDepth += 1
            tokens.append(Token(i, c))
            lastOpenBracketI = i

        if c == CLOSE_BRACKET:
            if bracketDepth == 0:
                messages.append(UnmatchedCloseBracketError(i))
            else:
                bracketDepth -= 1
            tokens.append(Token(i, c))

        # check for start/continuation of token:

        if symbol or numberLiteral or blank or word:
            currentToken.text += c
            # can't have multiple tokens at once
            continue

        if c in SYMBOLS:
            symbol = True
            currentToken = Token(i, c)

        elif c in NUMBER_LITERAL_CHARS:
            numberLiteral = True
            if len(tokens) > 0 and tokens[-1].text == MINUS \
                    and _minusIsNegative(tokens):
                minusToken = tokens.pop()
                currentToken = Token(minusToken.location, MINUS + c)
            else:
                currentToken = Token(i, c)

        elif c == BLANK:
            blank = True
            currentToken = Token(i, c)

        elif c in WORD_CHARS or c.isalpha():
            word = True
            currentToken = Token(i, c)

    # end for i in range(0, len(script)):

    if bracketDepth > 0:
        messages.append(UnmatchedOpenBracketError(lastOpenBracketI))

    return tokens, messages
# end tokenize

# Used for when the most recent token is a minus sign and a number is about
# to be added. Should the minus sign be interpreted as the negative sign of the
# number? (True) or as a subtract symbol? (False)
# There shouldn't be any ambiguity in these rules.
def _minusIsNegative(tokens):
    if len(tokens) == 1:
        # nothing before it, so nothing to subtract from.
        return True

    beforeMinus = tokens[-2]
    if tokenIsOpenBracket(beforeMinus.text) \
            or tokenIsSymbol(beforeMinus.text) \
            or tokenIsWord(beforeMinus.text) \
            or tokenIsNewline(beforeMinus.text):
        # open bracket or newline: start of command, nothing to subtract from
        # word or symbol: in the middle of a command that isn't a subtraction
        return True

    # beforeMinus is a number, blank, close bracket, or string

    if len(tokens) == 2:
        # the number, blank, or string is the first argument of a subtraction
        return False

    if tokenIsCloseBracket(beforeMinus.text):
        # find token before matching open bracket
        i = len(tokens) - 3
        searchBracketDepth = 1
        while i >= 0:
            t = tokens[i]
            if tokenIsOpenBracket(t.text):
                searchBracketDepth -= 1
            elif tokenIsCloseBracket(t.text):
                searchBracketDepth += 1
            if searchBracketDepth == 0:
                break
            i -= 1
        if i <= 0:
            return False
        beforeBeforeMinus = tokens[i - 1]
    else:
        beforeBeforeMinus = tokens[-3]

    if tokenIsOpenBracket(beforeBeforeMinus.text) \
            or tokenIsNewline(beforeBeforeMinus.text):
        # this is a subtraction command
        return False

    return True
