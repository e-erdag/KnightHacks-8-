import React from "react"
import clickSoundFile from "../assets/sounds/clickSound.mp3"; 

//call api
//return id question incorrect cards correct cards
//Change codingProblem text to question
//for cards we want an array with incorrect and correct cards randomized then add the text to seperate cards
function SubmitButton({codeAreaCards, correctOrder, onNextQuestion}) {

    const onSubmit = () => {
        const clickSound = new Audio(clickSoundFile);
        clickSound.play();
        const userIds = codeAreaCards.map(card => card.id);

        const isCorrect =
        userIds.length === correctOrder.length &&
        userIds.every((id, index) => id === correctOrder[index]);

        if (isCorrect) {
        alert("Correct! Loading next question...");
        onNextQuestion(); 
        } else {
        alert("Incorrect order. Try again.");
        }
    };

    return (
        <div> 
            <button className="submit-button" onClick={onSubmit}>
                Submit
            </button>
        </div>
    )
}

export default SubmitButton