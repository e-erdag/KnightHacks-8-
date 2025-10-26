import React from "react"
import clickSoundFile from "../assets/sounds/clickSound.mp3"; 

//call api
//return id question incorrect cards correct cards
//Change codingProblem text to question
//for cards we want an array with incorrect and correct cards randomized then add the text to seperate cards
function SubmitButton({codeAreaCards, correctOrder, onNextQuestion, refreshSidebar}) {

    const onSubmit = async () => {
        const clickSound = new Audio(clickSoundFile);
        clickSound.play();
        const userIds = codeAreaCards.map(card => card.id);

        const isCorrect =
        userIds.length === correctOrder.length &&
        userIds.every((id, index) => id === correctOrder[index]);

        if (isCorrect) {

            try {
                const response = await fetch("http://localhost:3000/add_trophies", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ trophies_to_add: 30 }) // you can customize amount
                });

                const result = await response.json();
                console.log("Trophy added:", result);
            } catch (err) {
                console.error("Failed to add trophy:", err);
            }
        alert("Correct! Loading next question...");

        refreshSidebar();
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