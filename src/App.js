import React, { useState } from "react";
import { MyContext } from "./components/MyContext";
import Quiz from "./components/Quiz";
import QuizCreation from "./components/QuizCreation";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState();
  const [quizData, setQuizData] = useState([
    {
      question: "",
      options: [],
      answer: ""
    }
  ]);

  return (
    <>
      <MyContext.Provider
        value={{
          question,
          setQuestion,
          answer,
          setAnswer,
          options,
          setOptions,
          questions,
          setQuestions,
          quizData,
          setQuizData
        }}
      >
        <Router>
          <div className="Headers">
            <nav>
              <ul>
                <li>
                  <Link to="/takequiz">Take Quiz</Link>
                </li>
                <li>
                  <Link to="/createquiz">Quiz Creation</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Routes>
            <Route exact path="/takequiz" element={<Quiz />} />
            <Route path="/createquiz" element={<QuizCreation />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </>
  );
}

export default App;
