import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <main>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </main>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};
