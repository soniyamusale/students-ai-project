import React from "react";

function NotesPage() {

  const notes =
    localStorage.getItem("notes");

  return (

    <div style={{ padding: "20px" }}>

      <h1>Generated Notes</h1>

      <div
        className="card"
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.2",
          fontSize: "17px",
          padding: "15px",
        }}
      >

        {notes}

      </div>

    </div>
  );
}

export default NotesPage;