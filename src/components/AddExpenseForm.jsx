import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyListFromAPI, updateEditChanges } from '../actions';

class AddExpenseForm extends React.Component {
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
    const {
      currencyList,
      nextId,
      saveThisExpense,
      editMode,
      idToEdit,
      allExpenses,
      editChange,
    } = this.props;
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
            data-testid="currency-input"
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
          onClick={
            editMode
              ? () => editChange(allExpenses, idToEdit, { value: valueSpent,
                description: expenseDescription,
                currency: currencyUsed,
                method: paymentMethod,
                tag: expenseTag })
              : (() => {
                saveThisExpense({
                  value: valueSpent,
                  description: expenseDescription,
                  currency: currencyUsed,
                  method: paymentMethod,
                  tag: expenseTag,
                }, nextId);
                this.resetForms();
              })
          }
        >
          { editMode ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  nextId: state.wallet.expenses.length,
  editMode: state.wallet.editMode,
  allExpenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveThisExpense: (formObject, id) => dispatch(getCurrencyListFromAPI(formObject, id)),
  editChange: (oldExpensesArray, idToEdit, newValueObjects) => dispatch(
    updateEditChanges(oldExpensesArray, idToEdit, newValueObjects),
  ),
});

AddExpenseForm.propTypes = {
  currencyList: propTypes.arrayOf(propTypes.string).isRequired,
  nextId: propTypes.number.isRequired,
  saveThisExpense: propTypes.func.isRequired,
  editMode: propTypes.bool,
  idToEdit: propTypes.number,
  allExpenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  editChange: propTypes.func.isRequired,
};

AddExpenseForm.defaultProps = {
  editMode: false,
  idToEdit: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
