import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "../Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  // ================= TEXT STATE =================

  const [text, setText] = useState(
    localStorage.getItem("lectureText") || ""
  );

  // ================= FILE UPLOAD =================

  const handleFileUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      if (response.data.text) {

        setText(response.data.text);

        // SAVE LECTURE TEXT

        localStorage.setItem(
          "lectureText",
          response.data.text
        );

        alert("File Uploaded Successfully");

      } else {

        alert("No text found");

      }

    } catch (error) {

      alert("Upload Failed");

    }
  };

  // ================= GENERATE NOTES =================

const generateNotes = () => {

  if (!text) {

    alert("Enter text first");

    return;

  }

  // SAVE ORIGINAL LECTURE

  localStorage.setItem(
    "lectureText",
    text
  );

  // ================= CLEAN TEXT =================

  const cleanText = text

    // REMOVE LINE BREAKS

    .replace(/\n/g, " ")

    // REMOVE EXTRA SPACES

    .replace(/\s+/g, " ")

    // REMOVE SPECIAL SYMBOLS

    .replace(/[*#]/g, "")

    .trim();

  // ================= SPLIT INTO SENTENCES =================

  const sentences = cleanText
    .split(".")
    .filter(
      (sentence) =>
        sentence.trim() !== ""
    );

  // ================= SUMMARY =================

  const summary = sentences
    .slice(0, 3)
    .join(". ") + ".";

  // ================= BULLET POINTS =================

  const bulletPoints = sentences
    .slice(0, 6)
    .map(
      (sentence) =>
        `• ${sentence.trim()}`
    )
    .join("\n");

  // ================= FINAL NOTES FORMAT =================

  const finalNotes =

    "Notes:\n\n" +

    summary +

    "\n\nKey points:\n\n" +

    bulletPoints;

  // ================= SAVE NOTES =================

  localStorage.setItem(
    "notes",
    finalNotes
  );

  // ================= SUCCESS MESSAGE =================

  alert(
    "Notes Generated Successfully"
  );

  // ================= OPEN NOTES PAGE =================

  navigate("/notes");
};
  // ================= GENERATE QUIZ =================

  const generateQuiz = () => {

    const notes =
      localStorage.getItem("notes");

    if (!notes) {

      alert("Generate notes first");

      return;

    }

    const sentences = notes
      .split(".")
      .filter((s) => s.length > 20);

    const mcqs = sentences
      .slice(0, 5)
      .map((sentence) => {

        const words = sentence.split(" ");

        const answer =
          words.find((w) => w.length > 5) ||
          words[0];

        const question = sentence.replace(
          answer,
          "_____"
        );

        const options = [
          answer,
          "Computer",
          "Software",
          "Network",
        ].sort(() => Math.random() - 0.5);

        return {
          question,
          options,
          answer,
        };
      });

    localStorage.setItem(
      "quiz",
      JSON.stringify(mcqs)
    );

    navigate("/quiz");
  };

  // ================= GENERATE FLASHCARDS =================

  const generateFlashcards = () => {

    const notes =
      localStorage.getItem("notes");

    if (!notes) {

      alert("Generate notes first");

      return;

    }

    const sentences = notes
      .split(".")
      .filter((s) => s.length > 15);

    const cards = sentences
      .slice(0, 5)
      .map((sentence) => {

        const words =
          sentence.trim().split(" ");

        const keyword =
          words.find((w) => w.length > 6) ||
          words[0];

        return {
          question: `Explain: ${keyword}`,
          answer: sentence,
        };
      });

    localStorage.setItem(
      "flashcards",
      JSON.stringify(cards)
    );

    navigate("/flashcards");
  };

  // ================= MICROPHONE =================

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech recognition not supported");

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      const updatedText =
        text + " " + transcript;

      setText(updatedText);

      localStorage.setItem(
        "lectureText",
        updatedText
      );
    };
  };

  // ================= TEACH ME =================

  const teachMe = () => {

    const notes =
      localStorage.getItem("notes");

    if (!notes) {

      alert("Generate notes first");

      return;

    }

    const speech =
      new SpeechSynthesisUtterance(notes);

    speech.lang = "en-US";

    speech.rate = 1;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);
  };

  // ================= SAVE DATA =================

  const saveData = async () => {

    try {

      await axios.post(
        "http://localhost:5000/save",
        {
          lectureText:
            localStorage.getItem(
              "lectureText"
            ),

          notes:
            localStorage.getItem("notes"),

          quiz: JSON.parse(
            localStorage.getItem("quiz")
          ),

          flashcards: JSON.parse(
            localStorage.getItem(
              "flashcards"
            )
          ),
        }
      );

      alert("Saved Successfully");

    } catch (err) {

      alert("Save Failed");

    }
  };

  // ================= LOGOUT =================

 const logout = () => {

  localStorage.clear();

  navigate("/");
};

  return (

    <div className="dashboard-container">

      {/* HEADER */}

      <div className="top-bar">

        <h1>
          AI Learning And Memory Tool
        </h1>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* TEXT AREA */}

      <textarea
        rows="8"
        value={text}
        onChange={(e) => {

          setText(e.target.value);

          localStorage.setItem(
            "lectureText",
            e.target.value
          );
        }}
        placeholder="Paste lecture notes or use microphone..."
        className="textarea"
      />

      <br /><br />

      {/* FILE UPLOAD */}

      <input
        type="file"
        onChange={handleFileUpload}
      />

      <br /><br />

      {/* BUTTONS */}

      <div className="button-group">

        <button onClick={generateNotes}>
          Generate Notes
        </button>

        <button onClick={generateQuiz}>
          Generate Quiz
        </button>

        <button
          onClick={generateFlashcards}
        >
          Flashcards
        </button>

        <button onClick={startListening}>
          🎤 Microphone
        </button>

        <button onClick={teachMe}>
          🔊 Teach Me
        </button>

        <button onClick={saveData}>
          💾 Save
        </button>

        <button
          onClick={() =>
            navigate("/saved")
          }
        >
          📂 View Saved Data
        </button>

      </div>

    </div>
  );
}

export default Dashboard;