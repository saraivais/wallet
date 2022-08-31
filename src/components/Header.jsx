import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import coins from '../icons/coin-stack-money-svgrepo-com.svg';
import '../style/Header.css';

class Header extends React.Component {
  expenseCalculator(expenseArray) {
    const spentForEachExpense = expenseArray
      .map(({ value, currency, exchangeRates }) => exchangeRates[currency].ask * value);
    const totalSpent = spentForEachExpense.reduce((acc, curr) => acc + curr, 0);

    return Number(totalSpent.toFixed(2));
  }

  render() {
    const { userMail, allExpenses } = this.props;
    return (
      <header className="wallet-header">
        <p className="user-email">
          Email:
          <span className="email">{ userMail }</span>
        </p>
        <div className="header-title">
          <img className="titleicon" src={ coins } alt="coins-icon" />
          <h1 className="title">Wallet</h1>
        </div>
        <p className="total-expense">
          Despesa Total:
          <span className="amount">
            { this.expenseCalculator(allExpenses) || 0 }
          </span>
          <span className="amount">BRL</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userMail: state.user.email,
  allExpenses: state.wallet.expenses,
});

Header.propTypes = {
  userMail: propTypes.string.isRequired,
  allExpenses: propTypes.arrayOf(propTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
