import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  acertosJogador = (assertions) => {
    const acertos = 3;
    if (assertions < acertos) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  render() {
    const { score, assertions, history } = this.props;

    return (
      <div>
        <h1
          data-testid="feedback-text"
        >
          {() => this.acertosJogador(assertions)}
        </h1>
        <h2
          data-testid="feedback-total-score"
        >
          {score}
        </h2>
        <h2
          data-testid="feedback-total-question"
        >
          {assertions}
        </h2>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ history.push('/') }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
