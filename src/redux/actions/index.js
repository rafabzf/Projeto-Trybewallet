const URL = 'https://economia.awesomeapi.com.br/json/all';
export const INFO_USER = 'INFO_USER';
export const INFO_WALLET = 'INFO_WALLET';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY_SUCCESS = 'RECEIVE_CURRENCY_SUCCESS';
export const RECEIVE_CURRENCY_FAILURE = 'REQUEST_CURRENCY_FAILURE';
export const INF0_EXPENSE = 'INF0_EXPENSE';
export const UP_WALLET = 'UP_WALLET';
export const EDIT_FORM = 'EDIT_FORM';

export function userAction(payload) {
  return {
    type: INFO_USER,
    payload,
  };
}

export function walletAction(payload) {
  return {
    type: INFO_WALLET,
    payload,
  };
}

export const requestApi = () => ({
  type: REQUEST_CURRENCY,
});

export const editForm = (id) => ({
  type: EDIT_FORM,
  id,
});

export const receiveApiSuccess = (payload) => ({
  type: RECEIVE_CURRENCY_SUCCESS,
  currencies: payload,
});

export const receiveApiFailure = (payload) => ({
  type: RECEIVE_CURRENCY_FAILURE,
  payload,
});

export const fetchCoin = () => async (dispatch) => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    delete result.USDT;
    return dispatch(receiveApiSuccess(result));
  } catch (error) {
    dispatch(receiveApiFailure(error));
  }
};

export const upWallet = (payload) => ({
  type: UP_WALLET,
  payload,
});

export const infoExpense = (payload) => ({
  type: INF0_EXPENSE,
  payload,
});

export const fetchAPI = () => () => fetch(URL).then((response) => response.json())
  .then((result) => ({ result }));
