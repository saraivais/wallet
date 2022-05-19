// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const CALCULATE_EXPENSES = 'CALCULATE_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_MODE_ON = 'EDIT_MODE_ON';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const saveEmail = (emailAdress) => ({ type: SAVE_EMAIL, payload: emailAdress });

export const requestCurrencies = () => ({ type: REQUEST_CURRENCIES });

export const getCurrencies = (currencyArray) => ({
  type: GET_CURRENCIES, payload: currencyArray });

// thunk thingy~ get currencies from API~
export function getCurrencyFromAPI() {
  return async (dispatch) => {
    dispatch(requestCurrencies());

    const apiReturn = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiData = await apiReturn.json();
    const allCurrArray = Object.keys(apiData);
    const filteredCurrencies = allCurrArray.filter((currencies) => currencies !== 'USDT');

    dispatch(getCurrencies(filteredCurrencies));
  };
}

const saveExpenses = (formObject, id, exchangeRates) => ({
  type: SAVE_EXPENSES,
  payload: {
    id,
    ...formObject,
    exchangeRates,
  },
});

// thunk thingy to get currency objects~
export function getCurrencyListFromAPI(formObject, id) {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const apiReturn = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiData = await apiReturn.json();
    dispatch(saveExpenses(formObject, id, apiData));
  };
}

export const removeExpense = (expenseToDeleteID) => (
  { type: REMOVE_EXPENSE, payload: expenseToDeleteID });

export const switchEditMode = (idToEdit) => ({ type: EDIT_MODE_ON, payload: idToEdit });

export const updateExpenses = (newExpenseArray) => (
  { type: UPDATE_EXPENSES, payload: newExpenseArray });

export function updateEditChanges(oldExpensesArray, idToEdit, newValueObjects) {
  return (dispatch) => {
    const objectToBeChanged = oldExpensesArray[idToEdit];
    const newObject = {
      id: idToEdit,
      ...newValueObjects,
      exchangeRates: objectToBeChanged.exchangeRates };
    const newExpenses = oldExpensesArray
      .map((expenseObj) => (expenseObj.id === idToEdit ? newObject : expenseObj));
    dispatch(updateExpenses(newExpenses));
  };
}
