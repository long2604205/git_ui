// src/data/datasample.js
export const originalCode = `function hello(name) {
  console.log("Hello, " + name + "!");
}

for (let i = 0; i < 5; i++) {
  hello("User " + i);
}

function sum(a, b) {
  return a + b;
}

console.log("Sum: ", sum(10, 20));
`;

export const modifiedCode = `function hello(name) {
  console.log("Hi, " + name + "!");
}

for (let i = 1; i <= 5; i++) {
  hello("Visitor " + i);
}

function sum(a, b, c = 0) {
  return a + b + c;
}

console.log("Total: ", sum(10, 20, 30));
`;
