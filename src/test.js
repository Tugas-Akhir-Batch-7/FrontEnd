//rock paper scissors game javascript
var playerChoice = prompt("Rock, Paper, or Scissors?");
var computerChoice = Math.random();
if (computerChoice < 0.34) {
    computerChoice = "rock";
} else if(computerChoice <= 0.67) {
    computerChoice = "paper";
} else {
    computerChoice = "scissors";
} console.log("Computer: " + computerChoice);
var compare = function(choice1, choice2) {
    if (choice1 === choice2) {
        return "The result is a tie!";
    } else if (choice1 === "rock") {
        if (choice2 === "scissors") {
            return "rock wins";
        } else {
            return "paper wins";
        }
    } else if (choice1 === "paper") {
        if (choice2 === "rock") {
            return "paper wins";
        } else {
            return "scissors wins";
        }
    } else if (choice1 === "scissors") {
        if (choice2 === "paper") {
            return "scissors wins";
        } else {
            return "rock wins";
        }
    }
}
console.log(compare(playerChoice, computerChoice));
console.log(compare(computerChoice, playerChoice));
console.log(compare(playerChoice, playerChoice));
console.log(compare(computerChoice, computerChoice));
console.log(compare("rock", "paper"));
console.log(compare("rock", "scissors"));
console.log(compare("paper", "rock"));
console.log(compare("paper", "scissors"));
console.log(compare("scissors", "paper"));
console.log(compare("scissors", "rock"));
console.log(compare("rock", "rock"));
console.log(compare("paper", "paper"));
console.log(compare("scissors", "scissors"));
console.log(compare("rock", "scissors"));
console.log