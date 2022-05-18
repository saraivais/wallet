import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginMail: '',
      loginPassword: '',
      isButtonDisabled: true,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      () => ({ [name]: value }),
      () => this.validateInputs(),
    );
  }

  // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

  validateInputs = () => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPasswordLength = 6;

    const { loginMail, loginPassword } = this.state;

    const isValid = (emailFormat.test(loginMail)
      && loginPassword.length >= minPasswordLength);

    this.setState({
      isButtonDisabled: !isValid,
    });
  }

  render() {
    const { loginMail, loginPassword, isButtonDisabled } = this.state;
    return (
      <>
        <div>Login!</div>
        <label htmlFor="loginMail">
          E-mail:
          <input
            type="email"
            name="loginMail"
            data-testid="email-input"
            value={ loginMail }
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="loginPassword">
          Senha:
          <input
            type="password"
            name="loginPassword"
            data-testid="password-input"
            value={ loginPassword }
            onChange={ this.handleInputChange }
          />
        </label>
        <button type="button" disabled={ isButtonDisabled }>Entrar</button>
      </>
    );
  }
}

export default Login;
