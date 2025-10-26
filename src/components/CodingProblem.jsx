function CodingProblem({question}) {
    if (!question) return null;
    return (
        <div className="code-problem">
            <div className="code-problem-content">
                <p>{question.question}</p>
            </div>
        </div>
    )
}
export default CodingProblem