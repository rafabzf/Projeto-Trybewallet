import { INF0_EXPENSE,
  RECEIVE_CURRENCY_FAILURE,
  RECEIVE_CURRENCY_SUCCESS,
  REQUEST_CURRENCY,
  UP_WALLET,
  EDIT_FORM,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
    };

  case INF0_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case UP_WALLET:
    return {
      ...state,
      expenses: action.payload,
    };

  case EDIT_FORM:
    return {
      ...state,
      editor: !state.editor,
      idToEdit: action?.id || 0,
    };

  case RECEIVE_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
      exchangeRates: action.currencies,
    };

  case RECEIVE_CURRENCY_FAILURE:
    return {
      ...state,
      error: action.payload,
    };

  default: return state;
  }
};

export default wallet;
