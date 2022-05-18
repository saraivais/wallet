import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseForm extends React.Component {
  render() {
    const { currencyList } = this.props;
    return (
      <form>

        <label htmlFor="valueSpent">
          Valor:
          <input id="valueSpent" type="number" data-testid="value-input" />
        </label>

        <label htmlFor="expenseDescription">
          Descrição:
          <input id="expenseDescription" type="text" data-testid="description-input" />
        </label>

        <label htmlFor="currency">
          Moeda
          <select id="currency">
            {currencyList
              .map((currency, index) => (
                <option
                  key={ index }
                  value={ currency }
                >
                  { currency }

                </option>))}
          </select>
        </label>

        <label htmlFor="paymentMethod">
          <select id="paymentMethod" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="expenseTag">
          <select id="expenseTag" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  currencyList: propTypes.arrayOf(propTypes.string).isRequired,
};

// export default ExpenseForm;
export default connect(mapStateToProps)(ExpenseForm);
