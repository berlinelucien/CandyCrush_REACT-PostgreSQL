/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Scoreboard from "./Scoreboard";
import { useState } from "react";
import blank from "../images/blank.png";
import blueCandy from "../images/blue-candy.png";
import orangeCandy from "../images/orange-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import yellowCandy from "../images/yellow-candy.png";
import greenCandy from "../images/green-candy.png";
import "../index.css";

// make board 8x8
// candy color [array of all the colors]
const width = 8;
const candyColors = [
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy,
];

const CrushBoard = () => {
  // set color arrangement, passing random colorArrangement into currentColor
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  // set the score
  const [scoreDisplay, setScoreDisplay] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      //do not count blank as matches , do not add to score
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        //if we get a match, set the score
        // use a callback function
        //whatever the score add 4 points
        //example of callback function passing data scope of parent to child
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        //if we get a match, set the score
        // use a callback function
        //whatever the score add 4 points
        //example of callback function passing data scope of parent to child
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  // check for columns of three
  const checkForColumnOf_Three = () => {
    // stop looping at index 47
    for (let i = 0; i <= 47; i++) {
      // start at index 0, 0 + width = 8, 0 + width * 2 = 16
      // as we loop this will increase
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      // each number (square) we pass into currentColorArrange if currentColor is equal to decidedColor
      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        //if we get a match, set the score
        // use a callback function
        //whatever the score add 3 points
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;
      // do not check the not valid array, just continue
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        //if we get a match, set the score
        // use a callback function
        //whatever the score add 3 points
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  // move us down into the board
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      // generate new candies if the first row is empty
      // if its a blank generate a random color
      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }
      // squares are moving up to replinsh
      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };
  console.log("scoreDisplay here", scoreDisplay);

  // drag and drop functions
  // dov ref: https://www.w3schools.com/jsref/event_ondrag.asp
  // doc ref: https://www.w3schools.com/jsref/event_ondragend.asp
  // drag start picks up the id of the square
  const dragStart = (e) => {
    console.log("start drag");
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    console.log("drag drop");
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    // save the square id that being dragged...paresInt to get the number and not a string
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    console.log("squareBeingDraggedId", squareBeingDraggedId);

    // save the square id that being replaced to var called squareBeingReplacedId
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    console.log("squareBeingReplacedId", squareBeingReplacedId);

    // switch out the color
    // switch get current color arrangement and get the number which is the squareReplacedId and set it to the being dragged color by grabbing the src color/(background color) instead of id
    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    // valid moves is either one up, one down, one left, one right
    // create array for valid move
    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    // valid move condition: the array if it include square being replaced id
    // then its a valid move
    // ex: squareid (38) - 8(width) = 30 === valid move
    const validMove = validMoves.includes(squareBeingReplacedId);

    //checking should return true == saving the boolean
    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOf_Three();
    const isARowOfThree = checkForRowOfThree();

    // if the squared being replacedid exist and is a valid move and if either
    // is a row of three or row of four or col.four or col of three
    // if all that is true then everything is good, drop the candy
    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      //set board to null to start over
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      //else change it back not valid
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  // create the board with the colors
  const createBoard = () => {
    // random color of 0-5
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      // math.floor round to the nearest integer to get whole number
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      // push random color inside the random color arrangement above
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
    //console.log(currentColorArrangement);
  };
  // after the render i want to pull in the function (side effect)
  // i want createboard to be called once
  useEffect(() => {
    createBoard();
  }, []);
  //console.log(currentColorArrangement)

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOf_Three();
      checkForRowOfThree();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOf_Three,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div className="crush-main">
      <div className="game">
        {/* map out each candy color that exist in array */}
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      {/** scoreboard component  */}
      <Scoreboard score={scoreDisplay} />
    </div>
  );
};

export default CrushBoard;
