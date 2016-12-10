# Compiled form of scripts
Scripts "compile" into a JSON file.

Structure of this file:
- `Expression`: Object; either a Literal, a Multiline, or a Command
    - If the expression is a Literal:
        - `literalText`: String
    - If the expression is a Multiline:
        - `Lines`: Array of Expressions (recursive)
    - If the expression is a Command:
        - `keyword`: String
        - `PrecedingExpression`: Expression (recursive); optional
        - `Arguments`: Array of objects; arguments and their values
            - `id`: String
            - `Expression`: Expression (recursive)
        - `optionalPhraseKeywords`: Array of strings; the optional phrases that were used in the command.

