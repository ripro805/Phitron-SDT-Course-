var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];

let bigName = friends[0];

for (let i = 1; i < friends.length; i++) {
    if (friends[i].length > bigName.length) {
        bigName = friends[i];
    }
}

console.log("Biggest name:", bigName);
