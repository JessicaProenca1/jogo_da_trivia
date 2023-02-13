import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const nome = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const hashGerada = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hashGerada}`;
    const { score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ url }
          alt="Foto de Perfil"
        />
        <span data-testid="header-player-name">
          { nome }
        </span>
        <span data-testid="header-score">
          { ` Placar: ${score}`}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
