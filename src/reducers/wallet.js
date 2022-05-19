// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES,
  GET_CURRENCIES,
  SAVE_EXPENSES,
  REMOVE_EXPENSE,
  EDIT_MODE_ON,
  UPDATE_EXPENSES,
} from '../actions';

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
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_MODE_ON:
    return { ...state, editMode: true, idToEdit: action.payload };
  case UPDATE_EXPENSES:
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
}

export default wallet;
