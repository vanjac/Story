# Story Syntax

- Nothing is case sensitive.
- Comments start with a `:` and continue for the rest of the line
- Empty lines are ignored; leading whitespace is ignored
- Invalid characters are: ```! # $ % & ( ) , ; ? @ \ ` { | } ~```

## Type system
All values are strings, however the language has static type checking and strong typing when the script is "compiled". Each expression has a return type that can be easily determined by looking at the expression. And each argument has a type that the expression must be. In the "compiled" form of the script there are no types.

All Types can determine, for any other type, if a value of the other type would be accepted as a value of this type.

## Expressions
A script is an expression, which must have a return type of "Nothing".

When an expression is used as an argument for another expression, if it is not a literal or a single word it MUST be surrounded by brackets ( `[` and `]` ). Brackets are optional around literals and single words. Brackets are not used anywhere else.

Types of expressions:
- Multiline: If the expression takes up multiple lines, each line is evaluated as an expression in sequence. Empty lines are ignored. All but the last expression must have a return type of "Nothing". The return type of the last expression line is used as the return type of the entire expression.
- Literal:
    - Number literal: values like `-1.23` are accepted
    - Text (string) literal: surround strings in single or double quotes.
- Command: A command is a series of phrases, separated by spaces. The first phrase (the Base phrase) is required, and the keyword of the Base phrase is used to identify the command. After that are optional phrases. Optional phrases have a rule in the language definition to determine if they can be used, based on the optional phrases that have been used previously.
    - Phrases: A phrase has a keyword for identification, followed by a series of parts, separated by spaces. The keyword can be multiple words. Each part can be either a word, or a string argument. The argument value is the literal text in brackets - it is not evaluated automatically. However, the argument can still require that the value be an expression of a certain type.
    - A command can optionally require a preceding argument expression, before the command. This could be used for infix operators.
- Blank: A series of underscores (like `____`). A blank can be used in place of any type of expression. These should not appear in a final script (that would produce an error), but they can be used while you are editing a script to let the editor know you will fill in that value later.
