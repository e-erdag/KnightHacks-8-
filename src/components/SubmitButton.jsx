import React from "react"
//call api
//return id question incorrect cards correct cards
//Change codingProblem text to question
//for cards we want an array with incorrect and correct cards randomized then add the text to seperate cards
function SubmitButton() {

    function onSubmit() {
        alert("clicked")

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