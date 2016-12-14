# Story

An example Story language, with basic types and commands.

## Types
- `Anything`: accepts anything, accepted by anything
- `Nothing`: accepts nothing but itself, accepted by nothing but itself
- `Number`
- `Text`: string
- `Condition`

## Commands
### Control
- `if [Condition] then [command] {otherwise [command]}`: Nothing
- `while [Condition] do [command]`: Nothing
- `until [Condition] do [command]`: Nothing
- `repeat [command] for [Number] times`: Nothing
- `wait [Number] seconds`: Nothing
- `[command] then [command]`: Nothing
- `[Anything] as text`: Text
- `[Anything] as number`: Number

### Logic
- `not [Condition]`: Condition
- `[Condition] and [Condition]`: Condition
- `[Condition] or [Condition]`: Condition
- `[Anything] = [Anything]`: Condition
- `[Anything] <> [Anything]`: Condition

### Math
- `[Number] + [Number]`: Number
- `[Number] - [Number]`: Number
- `[Number] * [Number]`: Number
- `[Number] / [Number]`: Number
- `[Number] < [Number]`: Condition
- `[Number] > [Number]`: Condition
- `[Number] <= [Number]`: Condition
- `[Number] >= [Number]`: Condition

### Variables
- `set [var] to [Anything]`: Nothing
- `variable [var]`: Anything

