//https://quiz-app-react-firebase-dd6e8-default-rtdb.firebaseio.com/

import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "./MyContext";

const QuizCreation = () => {
  const [questionData, setQuestionData] = useState({
    Question: "",
    ansOne: "",
    ansTwo: "",
    ansThree: "",
    ansFour: "",
    Correct: ""
  });

  const [dummy, setDummy] = useState({ question: "", options: [], answer: "" });

  let name, value;
  const postQuestionData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setQuestionData({ ...questionData, [name]: value });
    console.log(questionData);
    // setDummy({
    //   ...questionData,
    //   question: Question,
    //   options: [ansOne, ansTwo, ansThree, ansFour],
    //   answer: Correct
    // });
  };

  // connect with firebase
  const submitData = async (event) => {
    event.preventDefault();
    const {
      Question,
      ansOne,
      ansTwo,
      ansThree,
      ansFour,
      Correct
    } = questionData;

    if (Question && ansOne && ansTwo && ansThree && ansFour && Correct) {
      const res = fetch(
        "https://quiz-react-app-d1244-default-rtdb.firebaseio.com/QuestionsData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            question: Question,
            options: [ansOne, ansTwo, ansThree, ansFour],
            answer: parseInt(Correct, 10)
          })
        }
      );

      if (res) {
        setQuestionData({
          Question: "",
          ansOne: "",
          ansTwo: "",
          ansThree: "",
          ansFour: "",
          Correct: ""
        });
        alert("Data Stored");
      } else {
        alert("plz fill the data");
      }
    } else {
      alert("plz fill all the data");
    }
  };

  return (
    <>
      <section className="contactus-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="contact-leftside col-12">
                  <h1 className="main-heading fw-bold">
                    Add Questions <br /> for Quiz.
                  </h1>
                  {/* <p className="main-hero-para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt eaque alias similique.
                  </p> */}
                </div>

                {/* Quiz Creation form  */}
                <div className="contact-rightside col-12">
                  <form method="POST">
                    <div className="row">
                      <div className="col-12 contact-input-feild">
                        <input
                          type="text"
                          name="Question"
                          id=""
                          className="form-control"
                          placeholder="Question here"
                          value={questionData.Question}
                          onChange={postQuestionData}
                        />
                      </div>
                      <div className="col-12 contact-input-feild">
                        <input
                          type="text"
                          name="ansOne"
                          id=""
                          className="form-control"
                          placeholder="Ans Option No. 1"
                          value={questionData.ansOne}
                          onChange={postQuestionData}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 contact-input-feild">
                        <input
                          type="text"
                          name="ansTwo"
                          id=""
                          className="form-control"
                          placeholder="Ans Option No. 2 "
                          value={questionData.ansTwo}
                          onChange={postQuestionData}
                        />
                      </div>
                      <div className="col-12 contact-input-feild">
                        <input
                          type="text"
                          name="ansThree"
                          id=""
                          className="form-control"
                          placeholder="Ans Option No. 3"
                          value={questionData.ansThree}
                          onChange={postQuestionData}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 contact-input-feild">
                        <input
                          type="text"
                          name="ansFour"
                          id=""
                          className="form-control"
                          placeholder="Ans Option No. 4"
                          value={questionData.ansFour}
                          onChange={postQuestionData}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 ">
                        <input
                          type="text"
                          name="Correct"
                          id=""
                          className="form-control"
                          placeholder="Correct Option Number"
                          value={questionData.Correct}
                          onChange={postQuestionData}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-outline-primary w-100 my-4"
                      onClick={submitData}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizCreation;
