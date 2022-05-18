import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginMail: '',
      loginPassword: '',
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { loginMail, loginPassword } = this.state;
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

      </>
    );
  }
}

export default Login;
