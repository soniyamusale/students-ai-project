import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import Dashboard from "./pages/Dashboard";

import NotesPage from "./pages/NotesPage";

import QuizPage from "./pages/QuizPage";

import FlashcardsPage from "./pages/FlashcardsPage";

import SavedPage from "./pages/SavedPage";

function App() {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            isLoggedIn
              ? <Dashboard />
              : <Navigate to="/" />
          }
        />

        {/* NOTES */}

        <Route
          path="/notes"
          element={<NotesPage />}
        />

        {/* QUIZ */}

        <Route
          path="/quiz"
          element={<QuizPage />}
        />

        {/* FLASHCARDS */}

        <Route
          path="/flashcards"
          element={<FlashcardsPage />}
        />

        {/* SAVED DATA */}

        <Route
          path="/saved"
          element={<SavedPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;