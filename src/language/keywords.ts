
export const keywords = {
    keywords: new RegExp(`\\b(?:${[
        "agent",
        "property",
        "const", "otherwise",
        "define"
    ].join('|')})\\b`, 'g'),
    conditions: new RegExp(`\\b(?:${[
        "if",
        "then",
        "else"
    ].join('|')})\\b`, 'g'),
    functions: new RegExp(`\\b(?:${[
        "sum",
        "width",
        "height",
        "min",
        "max",
        "agents",
        "empty",
        "pi",
        "prob",
        "count",
        "filter",
        "step",
        "random",
        "choice",
        "sqrt",
        "abs",
        "floor",
        "ceil",
        "round",
        "sin",
        "cos",
        "tan",
        "atan",
        "index",
        "dist"
    ].join('|')})\\b`, 'g'),
    booleans: new RegExp(`\\b(?:${[
        "true",
        "false"
    ].join('|')})\\b`, 'g'),
    logical: new RegExp(`\\b(?:${[
        "and",
        "or"
    ].join('|')})\\b`, 'g'),
    numbers: /-?\d+(\.\d+)?/g,
    operators: /\+|\-|\*|\/|\%|\<|\<\=|\>|\>\=|\=|\=\=|\=\>/g
};