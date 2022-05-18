function expenseCalculator(expenseArray) {
  // id, value, descp, method, tag, exchangerates(obj);
  // retorna um número só
  const spentForEachExpense = expenseArray
    .map(({ value, currency, exchangeRates }) => exchangeRates[currency].ask * value);
  const totalSpent = spentForEachExpense.reduce((acc, curr) => acc + curr, 0);
  // console.log(totalSpent);
  return Number(totalSpent.toFixed(2));
}

export default expenseCalculator;
