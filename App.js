import axios from "axios";
import React from "react";

const App = () => {
  const [chosenLevel, setChosenLevel] = React.useState(null);
  const [words, setwords] = React.useState(null);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [clicked, setclicked] = React.useState([]);
  const [score, setScore] = React.useState(0);


  

  const getRandomWords = () => {
    const options = {
      method: "GET",
      url: "https://twinword-word-association-quiz.p.rapidapi.com/type1/",
      params: { level: chosenLevel, area: "sat" },
      headers: {
        "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
        "x-rapidapi-key": "845a54e67fmsh5c80c0d916a38b3p1e74a4jsnf855d7694be6",
      },
    };




    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setwords(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };




  console.log(words && words.quizList);




  React.useEffect(() => {
    if (chosenLevel) getRandomWords();
  }, [chosenLevel]);




  const checkAnswer = (option, optionIndex, correctAnswer) => {
    console.log(optionIndex, correctAnswer);
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option]);
      setScore((score) => score + 1);
    } else {
      setScore((score) => score - 1);
    }
    setclicked([...clicked, option]);
  };



  console.log("correctAnswers", correctAnswers);
  console.log("clicked", clicked);




  return (
    <div className="App">
      {!chosenLevel && (
        <div className="level-selector">
          <h1>Word Association Game</h1>
          <p>Select Your Level to start</p>
          <select
            name="levels"
            id="levels"
            value={chosenLevel}
            onChange={(e) => setChosenLevel(e.target.value)}
          >
            <option value={''}>select a level</option>
            <option value="1">level 1</option>
            <option value="2">level 2</option>
            <option value="3">level 3</option>
          </select>
        </div>
      )}

      {chosenLevel && words && (
        <div className="question-area">
          <h1>Welcome to Level: {chosenLevel} </h1>
          <h3>Your score is: {score}</h3>

          {words.quizlist.map((question, _questionIndex) => (
            <div key={_questionIndex} className="question-box">
              {question.quiz.map((tip, _index) => (
                <p key={_index}>{tip}</p>
              ))}
              <div className="question-buttons">
                {question.option.map((option, optionIndex) => (
                  <div key={optionIndex} className="quetion-button">
                    <button
                      disabled={clicked.includes(option)}
                      onClick={() =>
                        checkAnswer(option, optionIndex + 1, question.correct)
                      }
                    >
                      {option}
                    </button>
                    {correctAnswers.includes(option) && <p>Correct!</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
