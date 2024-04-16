# Unary Expression
Unary expressions consist of one numeric or boolean operand together with a unary operator. There are two unary operators, one for numeric unary expressions and the other for boolean unary expressions.

## Numeric Unary Expression
Numeric unary expression is used to convert a positive number to a negative number using the minus `-` operator. The operand can either be a plain numeric literal or an identifier holding a numeric value.

```
const value = 12.6;
const neg_basic = -12.6;
const neg_ident = -value;
```

## Boolean Unary Expression
Boolean unary expression is used to negate a boolean value using the emphasis `!` operator. The operand can either be a plain boolean literal (`true` or `false`) or an identifier holding a boolean value.

```
const value = false;
const neg_basic = !false;
const neg_ident = !value;
```