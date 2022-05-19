import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <header>
        <div>
          <p>
            Email:
            <span data-testid="email-field">{ userMail }</span>
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              { this.expenseCalculator(allExpenses) || 0 }
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
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
