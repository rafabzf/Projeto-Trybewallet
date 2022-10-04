import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editForm, upWallet } from '../redux/actions';

class EditForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],
  };

  componentDidMount() {
    const { idToEdit, expenses } = this.props;
    const filteredObject = expenses.find((element) => idToEdit === element.id);
    this.setState({
      id: filteredObject.id,
      value: filteredObject.value,
      description: filteredObject.description,
      currency: filteredObject.currency,
      method: filteredObject.method,
      tag: filteredObject.tag,
      exchangeRates: filteredObject.exchangeRates,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id, exchangeRates, value, description, currency, method, tag } = this.state;
    const { dispatch, expenses } = this.props;
    const filtered = expenses.filter((element) => id !== element.id);
    dispatch(editForm);
    dispatch(upWallet([{
      id, exchangeRates, value, description, currency, method, tag }, ...filtered]));
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div>
        <h3>
          Preencha os campos a seguir:
        </h3>

        <form>
          <label htmlFor="value">
            Valor da despesa:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>

          <label htmlFor="currency">
            Selecione a moeda:
            <select
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((currencyTwo) => (
                <option key={ currencyTwo }>
                  {currencyTwo}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">
                Alimentação
              </option>
              <option value="Lazer">
                Lazer
              </option>
              <option value="Trabalho">
                Trabalho
              </option>
              <option value="Transporte">
                Transporte
              </option>
              <option value="Saúde">
                Saúde
              </option>
            </select>
          </label>

          <button
            type="submit"
            onClick={ this.handleSubmit }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

EditForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  idToEdit: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(EditForm);
