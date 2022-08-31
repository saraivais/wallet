import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
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
          <span>{ userMail }</span>
        </p>
        <p className="total-expense">
          Despesa Total:
          <span>
            { this.expenseCalculator(allExpenses) || 0 }
          </span>
          <span>BRL</span>
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
