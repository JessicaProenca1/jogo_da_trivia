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
  };

  componentDidMount() {
    this.gameStart();
  }

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
    console.log(data.results);
  };

  handleClick = () => {
    this.setState({
      correct: 'correct-answer',
      wrong: 'wrong-answer',
    });
  };

  render() {
    const { dataResults, apiResponse, correct, wrong } = this.state;
    const result = dataResults[0];
    const magicNumber = 0.5;
    if (apiResponse) {
      const answer = [
        result.correct_answer,
        ...result.incorrect_answers,
      ].sort(() => Math.random() - magicNumber);
      console.log(answer);
    }
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
                      onClick={ this.handleClick }
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
                    >
                      {(answeer)}
                    </button>)
              ))}
            </div>
          </div>)}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
