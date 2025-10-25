function CodeCard({ code }) {
    return (
        <div className="code-card" draggable="true">
            <pre className="code-card-content">
                {code} {/* This allows for our code in the code cards to be dynamic and and we can the ai generated code into here */}
                Hello
            </pre>
        </div>
    )
}

export default CodeCard