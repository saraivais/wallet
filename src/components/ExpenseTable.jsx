import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAndRecalculateTotal } from '../actions';

class ExpenseTable extends React.Component {
  render() {
    const { allExpenses, deleteThisExpense } = this.props;
    // console.log(allExpenses);
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {allExpenses
            .map(({ currency, description, id, method, tag, value, exchangeRates }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name.split('/')[0]}</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteThisExpense(id) }
                  >
                    Excluir

                  </button>
                </td>
              </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteThisExpense:
  (idToDelete) => dispatch(removeExpenseAndRecalculateTotal(idToDelete)),
});

ExpenseTable.propTypes = {
  allExpenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  deleteThisExpense: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
