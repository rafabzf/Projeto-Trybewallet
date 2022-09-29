import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    console.log(expenses);
    const expensesAsk = expenses.map((expense) => parseFloat(expense
      .value * expense.exchangeRates[expense.currency].ask))
      .reduce((curr, acc) => acc + curr, 0).toFixed(2);

    return (
      <div>
        <h2>Cabeçalho</h2>
        <p data-testid="email-field">
          Email:
          {' '}
          { user.email }
        </p>
        <p data-testid="total-field">
          { expensesAsk }
        </p>
        <p data-testid="header-currency-field">
          Moeda:
          BRL
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  user: state.user,
});

export default connect(mapStateToProps)(Header);
