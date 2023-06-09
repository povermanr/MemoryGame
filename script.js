const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;


const COLORS = [
  "#f54251",
  "#5c69f2",
  "#78f26d",
  "#faa946",
  "#ac1bf5",
  "#f54251",
  "#5c69f2",
  "#78f26d",
  "#faa946",
  "#ac1bf5"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (noClicking) return;
  if (event.target.classList.contains('flipped')) return;
    
 let clickedCard = event.target;
 clickedCard.style.backgroundColor = clickedCard.classList[0];
  // if (clickedCard === card1 || clickedCard === card2 || clickedCard.classList.contains('flipped') || (card1 && card2)) {
  //   return;
  // }

  if (!card1 || !card2) {
    clickedCard.classList.add('flipped');
    card1 = card1 || clickedCard;
    card2 = clickedCard === card1 ? null : clickedCard;
  }

  if (card1 && card2) {
    noClicking = true;

    let pick1 = card1.className;
    let pick2 = card2.className;

    if (pick1 === pick2) {
      cardsFlipped += 2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;

    } else {
      setTimeout(() => {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }
  if (cardsFlipped === COLORS.length) alert('Game Over!');
  // console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
