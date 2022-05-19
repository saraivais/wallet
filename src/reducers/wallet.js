// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES,
  GET_CURRENCIES,
  SAVE_EXPENSES,
  // CALCULATE_EXPENSES,
  REMOVE_EXPENSE,
} from '../actions';
// import expenseCalculator from '../helpers/ExpenseCalculator';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case REQUEST_CURRENCIES:
    return state;
  case SAVE_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  // case CALCULATE_EXPENSES:
  //   return { ...state, total: expenseCalculator(state.expenses) };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
