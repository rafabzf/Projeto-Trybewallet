import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';

const lengthPassword = 6;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };
  }

  validationLogin = () => {
    const { email, password } = this.state;
    const checkLengthPassword = password.length >= lengthPassword;
    const checkEmail = email.includes('.com') && email.includes('@');

    if (checkLengthPassword === true && checkEmail === true) {
      this.setState({ disabledButton: false });
    } else this.setState({ disabledButton: true });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validationLogin();
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(userAction(this.state));
    history.push('/carteira');
  };

  render() {
    const { password, email, disabledButton } = this.state;

    return (
      <div>
        <form>
          <h3>Faça seu login:</h3>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
            minLength={ 6 }
          />
          <button
            type="submit"
            onClick={ this.handleClick }
            onChange={ this.handleChange }
            disabled={ disabledButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Login);
