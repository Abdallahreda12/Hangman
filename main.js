//Letters
const Letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(Letters);

//select letters container
let lettersContainer = document.querySelector(".letters");

//generate letters
lettersArray.forEach((letter) => {
  //create span
  let span = document.createElement("span");

  //create letter text node
  let theLetter = document.createTextNode(letter);

  //append letter to span
  span.appendChild(theLetter);

  //append span to letter container
  lettersContainer.appendChild(span);

  //class for span
  span.className = "letter-box";
});

//object of words And categories
const words = {
  "Arab Country": [
    "Oman",
    "Libya",
    "Emirates",
    "Morocco",
    "Sudan",
    "Jordan",
    "Kuwait",
    "Iraq",
    "Bahrain",
    "Algeria",
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Qatar",
  ],
  "Europe Country": [
    "Russia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Ireland",
    "Serbia",
    "Denmark",
    "Portugal",
    "Romania",
    "Poland",
    "Ukraine",
  ],
  Programming: ["Php", "Java", "Javascript", "Mysql", "Python", "Dart"],
  "Inanimate-> generates wind": ["Fan"],
  "Inanimate-> stored": ["warehouse", "Refrigerator"],
  profession: [
    "Judge",
    "Fireman",
    "Artist",
    "Policeman",
    "Worker",
    "Engineer",
    "Doctor",
    "Farmer",
    "Cook",
    "Swimmer",
  ],
  "Yellow Fruit": ["Banana", "Orange", "Lemon", "Mango", "Apple"],
  "Green fruit": ["Watermelon", "Grape", "Kiwi", "Avocado", "Apple"],
  "Red fruit": ["Apple", "Cherries", "Strowberry"],
};

//get random key
let allKeys = Object.keys(words);

let randomNumberOfKey = Math.floor(Math.random() * allKeys.length);
let randomKey = allKeys[randomNumberOfKey];
let valuesOfKey = words[randomKey];
console.log(valuesOfKey);

//get random value
let randomNumberOfValue = Math.floor(Math.random() * valuesOfKey.length);
let valueOfKey = valuesOfKey[randomNumberOfValue];
console.log(valueOfKey);

//set word and category in HTML
let spanOfCategory = document.querySelector(".category span");
let myCategory = document.createTextNode(randomKey);
spanOfCategory.appendChild(myCategory);

//generate guess letters element
let letters_guess = document.querySelector(".letters-guess");
let arrayFromWord = valueOfKey.split("");
arrayFromWord.forEach((letter) => {
  let form = document.createElement("span");
  letters_guess.appendChild(form);
});

//number of wrong
let numWrong = 0;

//select draw
let draw = document.querySelector(".hangman-draw");

//set counter for successful
let counter = 0;

//Handle click on letters
let wordSpan = document.querySelectorAll(".letters-guess span");
document.addEventListener("click", (e) => {
  //set states of letter
  let states = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    //to add letter into span
    let clickedLetter = e.target.textContent;
    let myChosenWord = Array.from(valueOfKey.toLowerCase());

    for (let i = 0; i < arrayFromWord.length; i++) {
      if (clickedLetter === myChosenWord[i]) {
        states = true;
        counter++;
        wordSpan.forEach((span, indexSpan) => {
          if (indexSpan === i) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    }
    console.log(counter);
    //if letter not exist in word
    if (states == false) {
      numWrong++;
      draw.classList.add(`wrong-${numWrong}`);

      // Game Over
      if (numWrong == 8) {
        gameOver();
        document.getElementById("fail").play();
        lettersContainer.classList.add("finished");
        parrent.classList.add("display");
        bottomClose();
        bottomPlayAgain();
      }
    }
    //player is win
    if (myChosenWord.length == counter) {
      win();
      document.getElementById("success").play();
      lettersContainer.classList.add("finished");
      parrent.classList.add("display");
      bottomClose();
      bottomPlayAgain();
    }
  }
});
//create parrent div for popup and bottoms
let parrent = document.createElement("div");
document.body.appendChild(parrent);
parrent.classList.add("parrent");

//game over
function gameOver() {
  let div = document.createElement("div");
  let text = document.createTextNode(`Game Over, The Word is ${valueOfKey}`);
  div.appendChild(text);
  parrent.appendChild(div);
  div.classList.add("popup-fail");
}

//player is win
function win() {
  let div = document.createElement("div");
  let text = document.createTextNode(
    `Congratulations, The Word is ${valueOfKey}`
  );
  div.appendChild(text);
  parrent.appendChild(div);
  div.classList.add("popup-success");
}

//bottom play again
function bottomPlayAgain() {
  let bottom = document.createElement("span");
  let text = document.createTextNode("Play Again");
  bottom.appendChild(text);
  parrent.appendChild(bottom);
  bottom.classList.add("bottomPLayAgain");
  bottom.addEventListener("click", () => {
    location.reload();
  });
}

//bottom close
function bottomClose() {
  let bottom = document.createElement("span");
  let text = document.createTextNode("close");
  bottom.appendChild(text);
  parrent.appendChild(bottom);
  bottom.classList.add("bottomClose");
  bottom.addEventListener("click", () => {
    window.close();
  });
}
