# Basic types and commands for a language definition

## Types
- Anything: accepts anything, accepted by anything
- Nothing: accepts nothing but itself, accepted by nothing but itself
- Number
- Text: string
- Condition

## Commands
- `not [Condition]`
- `if [Condition] then [command] {otherwise [command]}`
- `while [Condition] do [command]`
- `until [Condition] do [command]`
- `repeat [command] for [Number] times`
- `wait [Number seconds`

### Infix commands
- `+`, `-`, `*`, `/`
- `and`, `or`
- `is {not}`, `=`, `<>`
- `<`, `>`, `<=`, `>=`
- `[command] then [command]`
