# Story
Story is a scripting language designed to require no programming experience to use. Right now this repository just has a description of the language, but eventually the interpreter and editor will be written in JavaScript and be able to be run in a web browser. This is a work in progress.

## Design

Story is designed to combine the best aspects of visual and traditional text-based programming languages for beginners. Visual programming languages (like Scratch or App Inventor) are easy to learn and use with no experience required, and most importantly they are discoverable - the editor usually comes with a palette of all the commands you can use, and those commands visually show how they connect together. Text languages are much more efficient to work with (having to click and drag blocks around gets old quickly), but they aren't nearly as discoverable as visual languages, they require learning a special syntax, and it's much easier to make simple mistakes.

Story will be a text based language designed to keep the discoverability of visual programming languages, using a special JavaScript editor. Wherever you place your cursor, the editor will show you what commands or expressions you can insert at that place, with a set of buttons for those phrases. You can construct programs by clicking the buttons to assemble phrases, or you can type them yourself. When you add a command, its arguments are represented by blanks to fill in, and putting your cursor on those blanks will show buttons for expressions that could be used in that place. The syntax is designed to be as simple as possible. See the `syntax.md` file for more info on the syntax.

The commands availible in the language will be defined in a JSON file that can be extended. See the `language-definition.md` file for more info on that, and see `simple-language.md` for a base set of commands for a language.

The editor will compile scripts to a JSON file - it will be up to developers to write interpreters for the compiled scripts. See `compiled.md` for a description of the format.

