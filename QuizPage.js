import React, { useState } from "react";

function QuizPage() {

  const quiz = JSON.parse(
    localStorage.getItem("quiz")
  );

  const [score, setScore] =
    useState(0);

  const [selected, setSelected] =
    useState({});

  const checkAnswer = (
    qIndex,
    option,
    correct
  ) => {

    if (selected[qIndex]) return;

    setSelected({
      ...selected,
      [qIndex]: option,
    });

    if (option === correct) {

      setScore((prev) => prev + 1);

    }
  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Quiz</h1>

      {quiz?.map((q, i) => (

        <div
          key={i}
          className="card"
        >

          <h3>{q.question}</h3>

          {q.options.map(
            (opt, idx) => (

              <button
                key={idx}
                onClick={() =>
                  checkAnswer(
                    i,
                    opt,
                    q.answer
                  )
                }
              >
                {opt}
              </button>

            )
          )}

        </div>

      ))}

      <h2>
        Score: {score} / {quiz?.length}
      </h2>

    </div>
  );
}

export default QuizPage;