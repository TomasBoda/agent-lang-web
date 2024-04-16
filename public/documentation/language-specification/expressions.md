# Expressions
The following chapters introduce all expression types supported by AgentLang, from the most basic ones such as binary or relational expressions to more complex, language-specific expressions such as otherwise expressions or set comprehension expressions.

## Binary Expression
Binary expression is the most basic expression in AgentLang. It consists of two numeric operands and one binary operator. The operator can be of type addition, subtraction, multiplication, division or modulo. These expressions can be arbitrarily nested and parenthesised.

```
const add_expr = 2 + 3;
const sub_expr = 6 - 2;
const mul_expr = 12 * 4;
const div_expr = 8 / 3;
const mod_expr = 16 % 6;

const complex_expr = 2 + 3 * 4 - 8 / 14;
const parenth_expr = (2 + 3) * 4 - (12 + 2);
```

Note that implicit conversions with other operand data types are not supported and result in a runtime error.

## Unary Expression
Unary expressions consist of one numeric or boolean operand together with a unary operator. There are two unary operators, one for numeric unary expressions and the other for boolean unary expressions.

### Numeric Unary Expression
Numeric unary expression is used to convert a positive number to a negative number using the minus `-` operator. The operand can either be a plain numeric literal or an identifier holding a numeric value.

```
const value = 12.6;
const neg_basic = -12.6;
const neg_ident = -value;
```

### Boolean Unary Expression
Boolean unary expression is used to negate a boolean value using the emphasis `!` operator. The operand can either be a plain boolean literal (`true` or `false`) or an identifier holding a boolean value.

```
const value = false;
const neg_basic = !false;
const neg_ident = !value;
```

## Logical Expression
Logical expressions are expressions operating on boolean literals and always return a boolean value as the result. They are special types of binary expressions which use the `and` and `or`` operators together with two boolean operands.

```
const bool_value = false;

const log_expr_and = true and bool_value;
const log_expr_or = true or bool_value;
```

## Relational Expression
Relational expressions are special types of binary expressions that operate on either numeric or boolean operands and always return boolean results. They use relational operators, such as `==`, `!=`, `>`, `>=`, `<` and `<=`.

The `==` and `!=` operators can be used with either numbers and booleans, since they check for value equality. The rest of the relational operators operate on numeric values only.

```
const bool_1 = true;
const bool_2 = false;

const bool_expr_1 = bool_1 == bool_2;
const bool_expr_2 = bool_1 != bool_2;

const num_1 = 1.5;
const num_2 = 8.4;

const num_expr_1 = num_1 == num_2;
const num_expr_2 = num_1 != num_2;
const num_expr_3 = num_1 > num_2;
const num_expr_4 = num_1 >= num_2;
const num_expr_5 = num_1 < num_2;
const num_expr_6 = num_1 <= num_2;
```

Note that other types of operands are not supported and result in a runtime error.

## Conditional Expression
Conditional expressions are used to control the flow of property evaluation. They decide between two alternatives based on some condition. The condition is always a boolean expression and the results can be of any type, based on the data type of the given property.

We use the following production rule for defining a conditional expression:

```
conditional_expression:
    | "if" expression "then" expression "else" expression
```

The `if` keyword marks the start of a conditional expression. It is followed by a boolean expression denoting the condition upon which the structure decides. Then comes the `then` keyword followed by an expression representing the value to be evaluated if the condition is met (is `true`). Finally comes the `else` keyword followed by an expression representing the value to be evaluated if the condition is not met (is `false`).

```
define max_speed = 10;

agent person 5 {
    property speed: 5 =
        if abs(speed) >= max_speed then speed
        else speed + random(-1, 1);
}
```

The above example controls the maximum value of `speed` using the `max_speed` global variable. If it overflows, it keeps the `max_speed` value, otherwise it is randomly incremented or decremented.

## Otherwise Expression
The otherwise expression is a language-specific type of expression used to handle issues with Null values. It is a binary expression that uses the `otherwise` operator between the two operands.

The left-hand side of the `otherwise` expression consists of any expression containing a value of type AgentObject. The right-hand side consists of any expression that does not contain a value of type AgentObject. When the `otherwise` expression is being evaluated, AgentLang checks whether the value of type AgentObject on the left-hand side is Null. If not, it evaluates the left-hand side expression. On the other hand, if the value is Null, it instantly switches to the right-hand side of the expression and evaluates it.

Otherwise expressions serve as guards for Null values, for we can only tell if the value of type AgentObject is Null or not Null during runtime.

```
define range = 60;

agent person 120 {
    property x = x + x_move;
    property y = y + y_move;

    property people = agents(person);

    property in_proximity =
        filter(people | p -> dist(p.x, p.y, x, y) <= range);
    property closest =
        min(in_proximity | p -> dist(p.x, p.y, x, y));

    property x_move = (closest.x - x) / 10 otherwise 0;
    property y_move = (closest.y - y) / 10 otherwise 0;
}
```

The above example finds all people in some visual proximity to the current person and selects the closest person from the list. It then calculates the direction in which the current person should move in order to approach the closest person. However, we cannot be certain that we will find any people in the given proximity. If that's the case, the `in_promixity` property will be an empty array and the `closest` property will therefore result in a Null value. That is why we need to use the `otherwise` operator to ensure that if no such person is found, we will use values 0 for `x_move` and `y_move` properties.

## Set Comprehension Expression
While being classified as expression, the set comprehension expression is rather a syntactical structure that an expression. It cannot be used on its own, only as a parameter to set comprehension-specific built-in functions. They are mainly used for traversing arrays of agent instances and manipulating them in some way. Use cases include filtering of agents, summing certain agent properties or finding a specific agent instance based on some condition.

There are several built-in functions that take set comprehension expression as their parameter, some of which are `filter`, `sum`, `min` and `max`.

To define a set comprehension expression, we use the following production rule:

```
set_comprehension_expression:
    | expression "|" identifier "->" expression
```

We start with an expression holding a value of type AgentList, followed by a divider `|`. Then, we declare the set comprehension parameter name, which is any identifier we choose, such as `item` followed again by an arrow `->`. This parameter is used to access each agent instance in the array, one by one. The final part of the set comprehension expression is an expression representing a condition based on which to manipulate the agent instances.

```
define range = 60;

agent person 120 {
    property x = x + random(-1, 1);
    property y = y + random(-1, 1);

    property people = agents(person);
    property in_proximity =
        filter(people | p -> dist(p.x, p.y, x, y) <= range);
}
```

The `filter` function takes a set comprehension expression as a parameter. We use the `p` parameter to access each individual agent instance and their properties. Finally, the right-hand side of the set comprehension expression is used for filtering the agent array based on the proximity of each agent instance to the current agent. The result of `in_proximity` property is a filtered array of agents of type `person`.

[**Next:** Core Library](/documentation/language-specification/core-library)