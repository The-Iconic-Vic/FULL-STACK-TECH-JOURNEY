# 📘 JavaScript Basics Reference

## Adding JavaScript to HTML

### External (Recommended)
```html
<script src="script.js"></script>
Internal
html
<script>
    // JavaScript code
</script>
Inline (Avoid)
html
<button onclick="alert('Hi')">Click</button>
Comments
javascript
// Single line comment

/*
   Multi-line
   comment
*/
Variables
Keyword	Mutable	Scope	Use Case
const	No	Block	Values that don't change
let	Yes	Block	Values that change
var	Yes	Function	Avoid - outdated
javascript
const birthYear = 1995;  // Cannot reassign
let age = 30;            // Can reassign
age = 31;                // OK

var old = "avoid this";  // Don't use
Rules:

Use const by default

Use let only when you need to reassign

Never use var

Data Types
Primitive Types
Type	Description	Example
String	Text	"Hello", 'World', `Hi`
Number	Integer or decimal	42, 3.14, -10
Boolean	True or false	true, false
Null	Intentional empty	null
Undefined	Not assigned	let x;
Symbol	Unique identifier	Symbol('id')
javascript
let name = "Victor";        // String
let age = 25;               // Number
let isStudent = true;       // Boolean
let car = null;             // Null
let job;                    // Undefined
Checking Type
javascript
typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof null        // "object" (JavaScript quirk)
typeof undefined   // "undefined"
Template Literals
Use backticks ` and ${} for string interpolation.

javascript
const name = "Victor";
const age = 25;

// Old way (concatenation)
const old = "My name is " + name + " and I am " + age;

// New way (template literals)
const newWay = `My name is ${name} and I am ${age}`;

// Multi-line strings
const multiline = `
    This is line 1
    This is line 2
    This is line 3
`;

// Expressions inside ${}
const result = `2 + 2 = ${2 + 2}`;  // "2 + 2 = 4"
Operators
Arithmetic Operators
Operator	Name	Example	Result
+	Addition	5 + 3	8
-	Subtraction	5 - 3	2
*	Multiplication	5 * 3	15
/	Division	15 / 3	5
%	Modulus (remainder)	7 % 3	1
**	Exponentiation	2 ** 3	8
javascript
let sum = 10 + 5;        // 15
let diff = 10 - 5;       // 5
let product = 10 * 5;    // 50
let quotient = 10 / 5;   // 2
let remainder = 10 % 3;  // 1
let power = 2 ** 4;      // 16
Assignment Operators
Operator	Example	Equivalent
=	x = 5	x = 5
+=	x += 3	x = x + 3
-=	x -= 3	x = x - 3
*=	x *= 3	x = x * 3
/=	x /= 3	x = x / 3
%=	x %= 3	x = x % 3
javascript
let count = 5;
count += 2;   // count = 7
count -= 1;   // count = 6
count *= 2;   // count = 12
count /= 3;   // count = 4
Comparison Operators
Operator	Description	Example	Result
===	Strict equality	5 === 5	true
!==	Strict inequality	5 !== "5"	true
==	Loose equality	5 == "5"	true
!=	Loose inequality	5 != "6"	true
>	Greater than	5 > 3	true
<	Less than	5 < 3	false
>=	Greater than or equal	5 >= 5	true
<=	Less than or equal	5 <= 4	false
Logical Operators
Operator	Name	Example	Result
&&	AND	true && false	false
||	OR	true || false	true
!	NOT	!true	false
Type Coercion
JavaScript automatically converts types in certain situations.

javascript
// String concatenation with +
"5" + 3      // "53" (number becomes string)
5 + "3"      // "53"
"Hello" + 5  // "Hello5"

// Other operators trigger numeric conversion
"5" - 3      // 2 (string becomes number)
"5" * "2"    // 10
"10" / "2"   // 5

// Boolean coercion
Boolean(0)        // false
Boolean(1)        // true
Boolean("")       // false
Boolean("hello")  // true
Boolean(null)     // false
Boolean(undefined)// false
Explicit Type Conversion
javascript
// To Number
Number("123")     // 123
Number("12.5")    // 12.5
Number("abc")     // NaN
parseInt("123px") // 123
parseFloat("12.5")// 12.5
+ "123"           // 123 (unary plus)

// To String
String(123)       // "123"
(123).toString()  // "123"
123 + ""          // "123"

// To Boolean
Boolean(1)        // true
Boolean(0)        // false
!!"hello"         // true
String Methods
javascript
let str = "Hello World";

str.length;           // 11
str[0];               // "H"
str.charAt(0);        // "H"
str.toUpperCase();    // "HELLO WORLD"
str.toLowerCase();    // "hello world"
str.indexOf("World"); // 6
str.includes("Hello");// true
str.slice(0, 5);      // "Hello"
str.replace("World", "JavaScript"); // "Hello JavaScript"
str.split(" ");       // ["Hello", "World"]
str.trim();           // Removes whitespace
Number Methods
javascript
let num = 123.456;

num.toFixed(2);       // "123.46"
num.toPrecision(4);   // "123.5"
Number.isInteger(123); // true
Number.isNaN(NaN);    // true
parseInt("123px");    // 123
parseFloat("12.5px"); // 12.5
Type Coercion Reference
Operation	Result
"5" + 3	"53"
"5" - 3	2
"5" * "2"	10
"hello" + 5	"hello5"
"hello" - 5	NaN
true + true	2
true + false	1
false + false	0
null + 5	5
undefined + 5	NaN