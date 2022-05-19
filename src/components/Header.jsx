import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  expenseCalculator(expenseArray) {
    // id, value, descp, method, tag, exchangerates(obj);
    // retorna um número só
    const spentForEachExpense = expenseArray
      .map(({ value, currency, exchangeRates }) => exchangeRates[currency].ask * value);
    const totalSpent = spentForEachExpense.reduce((acc, curr) => acc + curr, 0);
    // console.log(totalSpent);
    return Number(totalSpent.toFixed(2));
  }

  render() {
    const { userMail, allExpenses } = this.props;
    // console.log(totalSpentSoFar);
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
// change total & currency later maybe?
// remove totalSpentSoFar for the calculations to be made HERE :(

const mapStateToProps = (state) => ({
  userMail: state.user.email,
  // totalSpentSoFar: state.wallet.total,
  allExpenses: state.wallet.expenses,
});

Header.propTypes = {
  userMail: propTypes.string.isRequired,
  allExpenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  // totalSpentSoFar: propTypes.number.isRequired,
};
// export default Header;
export default connect(mapStateToProps)(Header);
