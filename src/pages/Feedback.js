import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  acertosJogador = (assertions) => {
    const acertos = 3;
    if (assertions < acertos) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  render() {
    const { score, assertions } = this.props;
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
};

export default connect(mapStateToProps)(Feedback);
