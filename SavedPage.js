import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function SavedPage() {

  const [savedData, setSavedData] =
    useState([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/all"
      );

      setSavedData(res.data);

    } catch (err) {

      alert("Failed to load");

    }
  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Saved Data</h1>

      {savedData.map((item, index) => (

        <div
          key={index}
          className="card"
        >

          <h2>Notes</h2>

          <p>{item.notes}</p>

          <h2>Quiz</h2>

          {item.quiz?.map((q, i) => (

            <p key={i}>
              {q.question}
            </p>

          ))}

          <h2>Flashcards</h2>

          {item.flashcards?.map(
            (f, i) => (

              <p key={i}>
                {f.question}
              </p>

            )
          )}

        </div>

      ))}

    </div>
  );
}

export default SavedPage;