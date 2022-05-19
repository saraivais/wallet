import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCurrencyFromAPI } from '../actions';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { saveCurrenciesToGlobalState } = this.props;
    saveCurrenciesToGlobalState();
  }

  render() {
    return (
      <>
        <Header />
        <ExpenseForm />
        <ExpenseTable />
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
