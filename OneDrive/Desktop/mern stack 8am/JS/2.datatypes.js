//* data types

//! primitive
//* number
let a = 23;
let b = 23.456;

//* string
let c = "c";
let d = "d";

let user = "John";

//? template literal ``
let e = `Result: ${2 + 2}`;
let f = `Hello ${user}`;

console.log(e);
console.log(f);

//* boolean
let g = true;

let h = false;

//* undefined
let i;
console.log(i);

//* null
let j = null;
console.log(j);

//* bigint
console.log(Number.MAX_SAFE_INTEGER);
console.log(9007199254740991 + 1);
console.log(9007199254740991n + 2n);
const k = BigInt(10);
console.log(k);
console.log(10n + 1n);

//* Symbol

const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2);
console.log(id2);

//! non primitive
//* object
//* array
//* function
