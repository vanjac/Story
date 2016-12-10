# Language Definition File
The commands and types availible for scripts are defined with a language definition JSON file.

Structure of this file:
- `Types`: Array of objects
    - `name`: String; single word, used internally and in the UI as the name of this type.
    - `color`: String; color that represents this type.
    - `allowedTypeGroup`: The id of a TypeGroup that specifies which Types would be accepted as a value of this type.
- `TypeGroups`: Array of objects
    - `id`: String; internal, used to identify the TypeGroup
    - `expr`: String; expression to define the set of all Types that this TypeGroup accepts. Type or other TypeGroup names can be used, along with the operators `!`, `&`, and `|`. `all` represents all Types.
- `Categories`: Array of objects; Categories are used to group Commands in the UI
    - `name`: String; used in the UI
    - `color`: String; color that represents this Category
- `Commands`: Array of objects
    - `shortDescription`: String
    - `longDescription`: String
    - `category`: String; the name of a category
    - `returnType`: String; name of a type, or "=argId" to have the command return the same type as passed to a certain argument.
    - `BasePhrase`: Object
        - `keyword`: String; can be multiple words
        - `Parts`: Array of objects; each part can be a word or an argument
            - For words only:
                - `text`: String
            - For arguments only:
                - `id`: String; Internal, represents the argument
                - `name`: String; used in UI
                - `type`: String; what type is accepted; empty string to accept any text; "=argId" to require the type to match the value of another argument.
    - `PrecedingArgument`: Object, optional
        - `name`: String
        - `type`: String; see Parts
    - `OptionalPhrases`: Array of objects
        - Each OptionalPhrase has the same properties as in BasePhrase, along with the ones below
        - `shortDescription`: String
        - `longDescription`: String
        - `allowedRule`: String; expression to determine if the optional phrase can be used, based on what optional phrases have been used before it. The keyword of an optional phrase is a boolean that returns if it has been used in the command. The operators `!`, `&`, and `|` can be used.

        
        
