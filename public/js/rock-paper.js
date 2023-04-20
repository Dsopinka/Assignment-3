document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', playGame);
});

function playGame(event) {
    const userChoice = event.target.id;
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);

    // Display the results on the HTML page
    document.getElementById('userChoice').innerText = `You: ${userChoice}`;
    document.getElementById('computerChoice').innerText = `Computer: ${computerChoice}`;
    document.getElementById('result').innerText = result;

    // Display the image for the computer's choice
    const choiceImage = document.getElementById(computerChoice + 'Image');
    const choiceImageUrl = choiceImage.href;
    const mainImage = document.getElementById('main_image');
    mainImage.src = choiceImageUrl;
    mainImage.alt = computerChoice;
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'It\'s a tie!';
    }

    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'You lose!';
    }
}
