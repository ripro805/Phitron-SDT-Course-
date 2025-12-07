function monthlySavings(payments, livingCost) {
    if (!Array.isArray(payments) || typeof livingCost !== "number") {
        return "invalid input";
    }

    let total = 0;

    for (let i = 0; i < payments.length; i++) {
        if (typeof payments[i] !== "number") {
            return "invalid input";
        }

        if (payments[i] >= 3000) {
            let tax = payments[i] * 0.2;
            total += (payments[i] - tax);
        } else {
            total += payments[i];
        }
    }

    let savings = total - livingCost;

    if (savings >= 0) {
        return savings;
    } else {
        return "earn more";
    }
}

console.log(monthlySavings([1000, 2000, 3000], 5400)); 
// Output: 0

console.log(monthlySavings([1000, 2000, 2500], 5000)); 
// Output: 500

console.log(monthlySavings([900, 2700, 3400], 10000)); 
// Output: "earn more"

console.log(monthlySavings(100, [900, 2700, 3400])); 
// Output: "invalid input"
