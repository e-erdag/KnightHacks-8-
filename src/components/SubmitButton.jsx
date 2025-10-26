import React from "react"
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