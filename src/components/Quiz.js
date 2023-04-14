import React, { useState, useEffect, useContext } from "react";
// import { QuizData } from "../Data/QuizData";
import { MyContext } from "./MyContext";
import QuizResult from "./QuizResult";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  // const [data, setData] = useState();
  const { questions, setQuestions, quizData, setQuizData } = useContext(
    MyContext
  );

  const fetchData = async () => {
    await fetch(
      "https://quiz-react-app-d1244-default-rtdb.firebaseio.com/QuestionsData.json"
    )
      .then((response) => response.json())
      .then((data) => setQuizData(Object.values(data)));
  };

  useEffect(() => {
    fetchData();
    // QuizData = Object.values(quizData);
    // setData(Object.values(quizData));
    // setQuizData(Object.values(data));

    console.log(quizData);
  }, []);

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };
  const updateScore = () => {
    if (clickedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };
  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };
  return (
    <div>
      <p className="heading-txt">Quiz APP</p>
      <div className="container">
        {showResult ? (
          <QuizResult
            score={score}
            totalScore={quizData.length}
            tryAgain={resetAll}
          />
        ) : (
          <>
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">
                {quizData[currentQuestion].question}
              </span>
            </div>
            <div className="option-container">
              {quizData[currentQuestion].options.map((option, i) => {
                return (
                  <button
                    // className="option-btn"
                    className={`option-btn ${
                      clickedOption === i + 1 ? "checked" : null
                    }`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <input
              type="button"
              value="Next"
              id="next-button"
              onClick={changeQuestion}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
