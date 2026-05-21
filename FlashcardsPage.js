import React from "react";

function FlashcardsPage() {

  const flashcards = JSON.parse(
    localStorage.getItem(
      "flashcards"
    )
  );

  return (

    <div style={{ padding: "30px" }}>

      <h1>Flashcards</h1>

      {flashcards?.map((card, i) => (

        <div
          key={i}
          className="card"
        >

          <h3>{card.question}</h3>

          <p>{card.answer}</p>

        </div>

      ))}

    </div>
  );
}

export default FlashcardsPage;