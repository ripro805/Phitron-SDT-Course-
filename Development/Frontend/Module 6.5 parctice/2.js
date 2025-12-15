const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter a number: ", function (num) {
  num = parseInt(num);

  if (num % 2 === 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }

  rl.close();
});
5