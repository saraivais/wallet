import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCurrencyFromAPI } from '../actions';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  // using componentDidMount to check the api return~
  // async componentDidMount() {
  //   const apiresult = await fetch('https://economia.awesomeapi.com.br/json/all');
  //   const apiData = await apiresult.json();
  //   console.log(apiData);
  // }

  componentDidMount() {
    const { saveCurrenciesToGlobalState } = this.props;
    saveCurrenciesToGlobalState();
  }

  render() {
    return (
      <>
        <Header />
        <ExpenseForm />
        <div>TrybeWallet</div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrenciesToGlobalState: () => dispatch(getCurrencyFromAPI()),
});

Wallet.propTypes = {
  saveCurrenciesToGlobalState: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);

// export default Wallet;
