import {
  AppBar, Button, Divider, Paper, Toolbar, Typography,
} from '@material-ui/core';
// eslint-disable-next-line no-use-before-define
import React from 'react';
import './App.css';
// eslint-disable-next-line import/no-unresolved
import { questions } from './questions';


function App() {

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [userAnswer, setUserAnswer] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState(false);
  const [showNextButton, setShowNextButton] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [wrongCount, setWrongCount] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const question = questions[questionIndex];
  

  const selectAnswer = (bool: boolean) => {
    setUserAnswer(bool);
    let answer = true;
    try {
      answer = window.eval(question.code) === true
    } catch {
      answer = false
    }
    setCorrectAnswer(answer);
    if (answer === bool) {
      setCorrectCount(correctCount + 1)
    } else {
      setWrongCount(wrongCount + 1)
    }
    setShowNextButton(true)
  }

  const onNextClick = () => {
    setShowNextButton(false);
    if (questionIndex === questions.length - 1) {
      setDone(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  if (done) {
    return <div style={{margin: 30}}>{`Done! ${correctCount} Correct, ${wrongCount} Wrong`}</div>
  }

  return (
    <div style={{
      display: 'grid',
      gridAutoRows: 'min-content auto',
      gridAutoColumns: '100%',
    }}
    >
        <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            JS Exam
          </Typography>
          <Typography variant="h6">
            {`${correctCount} Correct, ${wrongCount} Wrong`}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ overflow: 'auto' }}>
        <Typography style={{margin: 15}}>
          Expressions are passed into window.eval() using your browser. Try to guess if they return true. Some expressions may throw an error - these do not return true.
        </Typography>
        <Paper style={{margin: 15, padding: 15}} elevation={5}>
          <Typography variant="h4">{`Question ${questionIndex + 1} / ${questions.length}`}</Typography>
          <Divider />
          <textarea 
            style={{margin: 15}} 
            value={question.code} 
            rows={question.code.split('\n').length} 
            cols={Math.max(...question.code.split('\n').map(s => s.length))}
          />
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            {
              showNextButton 
              ? <>
              <Button variant="outlined" onClick={() => onNextClick()}>Next</Button>
              <Typography style={{margin: 5, color: userAnswer === correctAnswer ? 'green' : 'red', fontWeight: 600}}>{`${userAnswer === correctAnswer ? 'Correct!' : 'Incorrect!'} The expression returns ${correctAnswer ? 'true' : 'something else'}`}</Typography>
              </>
              : <>
                <Button onClick={() => selectAnswer(true)}>true</Button>
                <Button onClick={() => selectAnswer(false)}>not true</Button>
              </>
            }

          </div>
        </Paper>
      </div>
    </div>
  );
}

export default App;
