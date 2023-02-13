import PropTypes from 'prop-types';
import React, { Component } from 'react';
import requestApiToGame from '../api/apiRequestToGame';
import Header from '../components/Header';
import './Game.css';

export default class Game extends Component {
  state = {
    dataResults: [],
    apiResponse: false,
    correct: '',
    wrong: '',
    isDisable: false,
    isAnswered: false,
    questionNumber: 0,
  };

  componentDidMount() {
    this.gameStart();
  }

  setTimeout = () => {
    const time = 30000;
    setTimeout(this.setTimer, time);
  };

  setTimer = () => {
    this.setState({
      isDisable: true,
      isAnswered: true,
    });
  };

  stopTimer = () => { clearTimeout(this.setTimeout); };

  gameStart = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const data = await requestApiToGame(token);
    const codeErrorNumber = 3;
    if (data.response_code === codeErrorNumber) {
      history.push('/');
      localStorage.removeItem('token');
    }
    this.setState({
      dataResults: data.results,
      apiResponse: true,
    });
  };

  handleClick = () => {
    this.setState({
      correct: 'correct-answer',
      wrong: 'wrong-answer',
    });
    this.stopTimer();
    this.setState({
      isDisable: true,
      isAnswered: true,
    });
  };

  getTimeLeft = () => {
  };

  handleAddScore = () => {
    this.handleClick();
    this.getTimeLeft();
  };

  handleNext = () => {
    const { questionNumber } = this.state;
    this.setState({
      isDisable: false,
      isAnswered: false,
      questionNumber: questionNumber + 1,
      correct: '',
      wrong: '',
    });
  };

  setFinalState = () => {
    this.setState({
      isDisable: false,
      isAnswered: false,
      questionNumber: 0,
      correct: '',
      wrong: '',
    });
  };

  handleNextToFeedback = () => {
    const { history } = this.props;
    this.setFinalState();
    history.push('/feedback');
  };

  render() {
    this.setTimeout();
    const {
      dataResults,
      apiResponse,
      correct,
      wrong,
      isDisable,
      isAnswered,
      questionNumber } = this.state;
    const result = dataResults[questionNumber];
    const magicNumber = 0.5;
    const maxQuestionNumber = 4;
    return (
      <div>
        <div>
          {' '}
          <Header />
          {' '}
        </div>
        {apiResponse
        && (
          <div>
            <h1 data-testid="question-category">
              category:
              {' '}
              {result.category}
            </h1>
            <p data-testid="question-text">{result.question}</p>
            <div data-testid="answer-options">
              {[
                result.correct_answer,
                ...result.incorrect_answers,
              ].sort(() => Math.random() - magicNumber).map((answeer, index) => (
                answeer === result.correct_answer
                  ? (
                    <button
                      type="button"
                      data-testid="correct-answer"
                      key={ index }
                      className={ correct }
                      onClick={ this.handleAddScore }
                      disabled={ isDisable }
                    >
                      {(answeer)}
                    </button>)
                  : (
                    <button
                      type="button"
                      data-testid={ `wrong-answer-${index}` }
                      className={ wrong }
                      key={ index }
                      onClick={ this.handleClick }
                      disabled={ isDisable }
                    >
                      {(answeer)}
                    </button>)
              ))}
            </div>
          </div>)}
        {isAnswered
        && questionNumber < maxQuestionNumber
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleNext }
          >
            Next

          </button>
        )}
        {isAnswered
        && questionNumber === maxQuestionNumber
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleNextToFeedback }
          >
            Next

          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
