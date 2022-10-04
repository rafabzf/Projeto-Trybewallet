import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editForm, upWallet } from '../redux/actions';

class Table extends Component {
  handleClick = (event) => {
    const { expenses, dispatch } = this.props;
    event.preventDefault();
    const list = expenses.filter((element) => +element.id !== +event.target.id);
    dispatch(upWallet(list));
  };

  handleEdit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(editForm(+e.target.id));
  };

  render() {
    const { expenses } = this.props;

    const tableComponents = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return (
      <div>
        <table>
          <thead>
            <tr>
              {tableComponents.map((component) => (
                <th key={ component }>{ component }</th>))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.method }</td>
                <td>{ expense.tag }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency]
                    .ask).toFixed(2) }
                </td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { parseFloat(expense.value * expense
                    .exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    id={ expense.id }
                    type="submit"
                    onClick={ this.handleClick }
                  >
                    Excluir
                  </button>

                  <button
                    data-testid="edit-btn"
                    id={ expense.id }
                    type="submit"
                    onClick={ this.handleEdit }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape())
    .isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
