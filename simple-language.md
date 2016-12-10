# Basic types and commands for a language definition

## Types
- Anything: accepts anything, accepted by anything
- Nothing: accepts nothing but itself, accepted by nothing but itself
- Number
- Text: string
- Condition

## Commands
- `not [Condition]`: Condition
- `if [Condition] then [command] {otherwise [command]}`: Nothing
- `while [Condition] do [command]`: Nothing
- `until [Condition] do [command]`: Nothing
- `repeat [command] for [Number] times`: Nothing
- `wait [Number] seconds`: Nothing
- `set [var] to [Anything]`: Nothing
- `variable [var]`: Anything

### Infix commands
- `+`, `-`, `*`, `/`
- `and`, `or`
- `is {not}`, `=`, `<>`
- `<`, `>`, `<=`, `>=`
- `[command] then [command]`
