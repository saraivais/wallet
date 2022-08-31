import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveEmail } from '../actions';
import wallet from '../icons/wallet-svgrepo-com.svg';
import '../style/Login.css';

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
    const { id, value } = target;
    this.setState(
      () => ({ [id]: value }),
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
    const { sendEmail, history } = this.props;
    // console.log(history);
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-display">
            <h1 className="login-title">Boas vindas ao Wallet!</h1>
            <img className="wallet-icon" src={ wallet } alt="wallet-icon" />
          </div>
          <div className="login-form">
            <label className="login-labels" htmlFor="loginMail">
              E-mail
              <input
                className="login-inputs"
                placeholder="exemplo@email.com"
                type="email"
                id="loginMail"
                value={ loginMail }
                onChange={ this.handleInputChange }
              />
            </label>
            <label className="login-labels" htmlFor="loginPassword">
              Senha
              <input
                className="login-inputs"
                type="password"
                id="loginPassword"
                placeholder="********"
                value={ loginPassword }
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              className="login-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ () => {
                sendEmail(loginMail);
                history.push('/carteira');
              } }
            >
              Entrar

            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (emailToSave) => dispatch(saveEmail(emailToSave)),
});

Login.propTypes = {
  sendEmail: propTypes.func.isRequired,
  history: propTypes.shape().isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
