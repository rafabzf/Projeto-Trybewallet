import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoin, infoExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoin());
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch, exchangeRatesApi, expensesToId } = this.props;
    await dispatch(fetchCoin());
    this.setState({
      exchangeRates: exchangeRatesApi,
      id: expensesToId.length,
    }, () => {
      dispatch(infoExpense(this.state));
      this.setState({
        id: '',
        value: '',
        description: '',
      });
    });
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
            type="button"
            onClick={ this.handleSubmit }
            name="button-add"
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRatesApi: state.wallet.exchangeRates,
  expensesToId: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRatesApi: PropTypes.isRequired,
  expensesToId: PropTypes.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
