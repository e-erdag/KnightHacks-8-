import React from "react"
import clickSoundFile from "../assets/sounds/clickSound.mp3"; // adjust path if needed

//call api
//return id question incorrect cards correct cards
//Change codingProblem text to question
//for cards we want an array with incorrect and correct cards randomized then add the text to seperate cards
function SubmitButton() {

    const onSubmit = () => {
        const clickSound = new Audio(clickSoundFile)
        clickSound.play()

    }
    return (
        <div> 
            <button className="submit-button" onClick={onSubmit}>
                Submit
            </button>
        </div>
    )
}

export default SubmitButton