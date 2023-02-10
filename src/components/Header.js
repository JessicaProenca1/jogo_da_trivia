import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    placar: 0,
  };

  render() {
    const nome = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const hashGerada = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hashGerada}`;
    const { placar } = this.state;
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
          { ` Placar: ${placar}`}
        </span>
      </header>
    );
  }
}
export default Header;
