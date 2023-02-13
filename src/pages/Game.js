import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requestApiToGame from '../api/apiRequestToGame';
import Header from '../components/Header';
import { addScore, sendAssertions } from '../redux/actions/mainAction';
import './Game.css';

class Game extends Component {
  state = {
    dataResults: [],
    apiResponse: false,
    correct: '',
    wrong: '',
    isDisable: false,
    isAnswered: false,
    questionNumber: 0,
    count: 30,
    stop: false,
    score: 0,
    assertions: 0,
  };

  componentDidMount() {
    this.gameStart();
    this.setTimeout();
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { score } = this.state;
    dispatch(addScore(score));
  }

  setTimeout = () => {
    const time = 1000;
    setInterval(this.timer, time);
  };

  stopTimer = () => {
    clearTimeout(this.setTimeout);
    this.setState({
      stop: true,
    });
  };

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
    this.stopTimer();
    this.setState({
      correct: 'correct-answer',
      wrong: 'wrong-answer',
      isDisable: true,
      isAnswered: true,
    });
  };

  timer = () => {
    const { count, stop } = this.state;
    this.setState({
      count: count - 1,
    });
    if (count < 0 || stop) {
      const mil = 1000;
      clearInterval(this.timer, mil);
      this.setState({
        isDisable: true,
        isAnswered: true,
        count,
      });
    }
  };

  handleAddScore = (difficulty) => {
    const { score, count, assertions } = this.state;
    const baseScore = 10;
    const hardScore = 3;
    if (difficulty === 'easy') {
      this.setState({
        score: score + baseScore + (count * 1),
      });
    }
    if (difficulty === 'medium') {
      this.setState({
        score: score + baseScore + (count * 2),
      });
    }
    if (difficulty === 'hard') {
      this.setState({
        score: score + baseScore + (count * hardScore),
      });
    }
    this.handleClick();
    this.setState({
      assertions: assertions + 1,
    });
  };

  handleNext = () => {
    const { questionNumber } = this.state;
    this.setState({
      isDisable: false,
      isAnswered: false,
      questionNumber: questionNumber + 1,
      correct: '',
      wrong: '',
      stop: false,
      count: 30,
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
    const { history, dispatch } = this.props;
    const { assertions } = this.state;
    this.setFinalState();
    dispatch(sendAssertions(assertions));
    history.push('/feedback');
  };

  render() {
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
                      onClick={ () => this.handleAddScore(result.difficulty) }
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
  history: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
