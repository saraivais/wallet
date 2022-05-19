import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyListFromAPI } from '../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      valueSpent: '',
      expenseDescription: '',
      currencyUsed: 'USD',
      paymentMethod: 'Dinheiro',
      expenseTag: '',
    };
  }

  handleInputChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  resetForms = () => {
    this.setState({
      valueSpent: '',
      expenseDescription: '',
      currencyUsed: 'USD',
      paymentMethod: 'Dinheiro',
      expenseTag: 'Alimentação',
    });
  }

  render() {
    const { currencyList, nextId, saveThisExpense } = this.props;
    const {
      valueSpent,
      expenseDescription,
      currencyUsed,
      paymentMethod,
      expenseTag,
    } = this.state;

    return (
      <form>

        <label htmlFor="valueSpent">
          Valor:
          <input
            id="valueSpent"
            type="number"
            data-testid="value-input"
            value={ valueSpent }
            onChange={ this.handleInputChange }
          />
        </label>

        <label htmlFor="expenseDescription">
          Descrição:
          <input
            id="expenseDescription"
            type="text"
            data-testid="description-input"
            value={ expenseDescription }
            onChange={ this.handleInputChange }
          />
        </label>

        <label htmlFor="currencyUsed">
          Moeda
          <select
            id="currencyUsed"
            value={ currencyUsed }
            onChange={ this.handleInputChange }
          >
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
          <select
            id="paymentMethod"
            data-testid="method-input"
            value={ paymentMethod }
            onChange={ this.handleInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="expenseTag">
          <select
            id="expenseTag"
            data-testid="tag-input"
            value={ expenseTag }
            onChange={ this.handleInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ () => {
            saveThisExpense({
              value: valueSpent,
              description: expenseDescription,
              currency: currencyUsed,
              method: paymentMethod,
              tag: expenseTag,
            }, nextId);
            this.resetForms();
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  nextId: state.wallet.expenses.length,
});

const mapDispatchToProps = (dispatch) => ({
  saveThisExpense: (formObject, id) => dispatch(getCurrencyListFromAPI(formObject, id)),
});

ExpenseForm.propTypes = {
  currencyList: propTypes.arrayOf(propTypes.string).isRequired,
  nextId: propTypes.number.isRequired,
  saveThisExpense: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
