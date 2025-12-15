const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter year: ", function (year) {
  year = parseInt(year);

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log("Leap Year");
  } else {
    console.log("Not Leap Year");
  }

  rl.close();
});
