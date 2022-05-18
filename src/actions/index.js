// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const CALCULATE_EXPENSES = 'CALCULATE_EXPENSES';

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
    // console.log(apiData);
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

const calculateExpenses = () => ({ type: CALCULATE_EXPENSES });

// thunk thingy to get currency objects~
export function getCurrencyListFromAPI(formObject, id) {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const apiReturn = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiData = await apiReturn.json();
    dispatch(saveExpenses(formObject, id, apiData));
    dispatch(calculateExpenses());
  };
}
