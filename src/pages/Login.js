import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requestFromAPI from '../api/apiRequest';
import '../App.css';

class Login extends React.Component {
  state = {
    emailCheck: false,
    nameCheck: false,
  };

  isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  checkEmail = ({ target }) => {
    const { value } = target;
    this.setState({
      email: value,
      emailCheck: this.isValidEmail(value),
    });
  };

  checkName = ({ target }) => {
    const { value = 'a' } = target;
    const minLength = 3;
    this.setState({
      name: value,
      nameCheck: value.length >= minLength,
    });
  };

  handlePlay = async () => {
    const { history } = this.props;
    const data = await requestFromAPI();
    const { name, email } = this.state;
    console.log(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    history.push('/game');
  };

  render() {
    const { emailCheck, nameCheck } = this.state;
    return (
      <section>
        <div>
          <form>
            <label htmlFor="name">
              Nome :
              <input
                id="name"
                data-testid="input-player-name"
                onChange={ this.checkName }
              />
            </label>
            <br />
            <label htmlFor="email">
              Email :
              <input
                id="email"
                type="email"
                data-testid="input-gravatar-email"
                onChange={ this.checkEmail }
              />
            </label>
            <br />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(emailCheck && nameCheck) }
              onClick={ this.handlePlay }
            >
              Play
            </button>
          </form>
        </div>
      </section>
    );
  }
}
Login.propTypes = {
  history: PropTypes.func.isRequired,
};
export default connect()(Login);
