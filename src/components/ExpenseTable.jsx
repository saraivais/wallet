import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, switchEditMode } from '../actions';
import '../style/ExpenseTable.css';

class ExpenseTable extends React.Component {
  render() {
    const { allExpenses, deleteThisExpense, turnEditModeOn } = this.props;
    return (
      <table className="expense-table">
        <tbody>
          <tr className="description-row">
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
              <tr className="expense-row" key={ id }>
                <td>{ description }</td>
                <td className="greenish">{ tag }</td>
                <td>{ method }</td>
                <td className="greenish">{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name.split('/')[0]}</td>
                <td className="greenish">
                  { Number(exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
                <td className="greenish">Real</td>
                <td className="button-container">
                  <button
                    className="edit-exclude-btn"
                    type="button"
                    onClick={ () => turnEditModeOn(id) }
                  >
                    Editar
                  </button>
                  <button
                    className="edit-exclude-btn"
                    type="button"
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
  (idToDelete) => dispatch(removeExpense(idToDelete)),
  turnEditModeOn: (id) => dispatch(switchEditMode(id)),
});

ExpenseTable.propTypes = {
  allExpenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  deleteThisExpense: propTypes.func.isRequired,
  turnEditModeOn: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
