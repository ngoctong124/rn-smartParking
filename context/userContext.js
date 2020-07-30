import contextFactory from './contextFactory';

import apiHelper from '../utils/apiHelper';
import { navigate, navigateReplace } from '../utils/navigationRef';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return { ...state, appLoading: true };
    case 'GET_ME':
      console.log('Get me');
      return {
        ...state,
        user: action.payload,
        error: '',
        appLoading: false,
      };
    case 'UPDATE_ME':
      console.log('Update user');
      return { ...state, user: action.payload, appLoading: false };
    case 'GET_MONEYSOURCE':
      console.log('Get moneysource');
      return { ...state, moneysource: action.payload, appLoading: false };
    case 'CREATE_MONEYSOURCE':
      console.log('Create moneysource');
      let moneysource = [...state.moneysource, action.payload];
      return { ...state, moneysource: moneysource, appLoading: false };
    case 'GET_HISTORY':
      console.log('Get history');
      return { ...state, history: action.payload, appLoading: false };
    case 'TOPUP':
      console.log('Topup');
      return { ...state, user: action.payload, appLoading: false };
    case 'WITHDRAW':
      console.log('Withdraw');
      return { ...state, user: action.payload, appLoading: false };
    case 'SET_USER_ERROR':
      return {
        ...state,
        error: action.payload,
        appLoading: false,
      };
    case 'CLEAR_USER_ERROR':
      return { ...state, error: '', appLoading: false };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        error: '',
        appLoading: false,
      };
    default:
      return state;
  }
};

const getMe = (dispatch) => async (userId) => {
  try {
    const { data } = await apiHelper.get(`/users/getuser/${userId}`);

    dispatch({ type: 'GET_ME', payload: data.user });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;

    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const updateMe = (dispatch) => async ({
  userId,
  username,
  position,
  ID,
  email,
}) => {
  try {
    if (!userId || !username || !position || !ID || !email) {
      throw new Error('Please tell us your infomation');
    }
    const { data } = await apiHelper.post(`/users/${userId}/updateuser`, {
      userId,
      username,
      position,
      ID,
      email,
    });

    dispatch({ type: 'UPDATE_ME', payload: data.user });

    navigate('MyInfo');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;

    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const getMoneySource = (dispatch) => async ({ userId }) => {
  try {
    const { data } = await apiHelper.get(`/users/moneysource/${userId}`);

    dispatch({ type: 'GET_MONEYSOURCE', payload: data.moneySource });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;

    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const createMoneySource = (dispatch) => async ({
  userId,
  bank,
  cardnumber,
  validfrom,
}) => {
  try {
    if (!bank || !cardnumber || !validfrom) {
      throw new Error('Please enter all required fields!');
    }
    const { data } = await apiHelper.post(`/users/moneysource/${userId}`, {
      bank,
      cardnumber,
      validfrom,
    });

    dispatch({ type: 'CREATE_MONEYSOURCE', payload: data.moneySource });

    navigateReplace('ActivedPayment');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;

    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const getHistory = (dispatch) => async ({ userId }) => {
  try {
    const { data } = await apiHelper.get(`/users/history/${userId}`);
    console.log(data);
    dispatch({ type: 'GET_HISTORY', payload: data.transaction });
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;

    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const topUp = (dispatch) => async ({ sourceId, amount }) => {
  try {
    if (!amount) {
      throw new Error('Please enter all required fields!');
    }
    const { data } = await apiHelper.post(
      `users/moneysource/topup/${sourceId}`,
      {
        amount,
      }
    );

    dispatch({ type: 'TOPUP', payload: data.user });

    navigateReplace('ActivedPayment');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;

    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const withDraw = (dispatch) => async ({ sourceId, amount }) => {
  try {
    if (!amount) {
      throw new Error('Please enter all required fields!');
    }
    const { data } = await apiHelper.post(
      `users/moneysource/withdraw/${sourceId}`,
      {
        amount,
      }
    );

    dispatch({ type: 'WITHDRAW', payload: data.user });

    navigateReplace('ActivedPayment');
  } catch (error) {
    const payload = error.response
      ? error.response.data.message
      : error.message;

    dispatch({ type: 'SET_USER_ERROR', payload });
  }
};

const clearError = (dispatch) => () => {
  dispatch({ type: 'CLEAR_USER_ERROR' });
};

const clearUser = (dispatch) => async () => {
  dispatch({ type: 'CLEAR_USER' });
};

const setAppLoading = (dispatch) => async () => {
  dispatch({ type: 'SET_APP_LOADING' });
};

export const { Provider, Context } = contextFactory(
  userReducer,
  {
    getMe,
    updateMe,
    getMoneySource,
    createMoneySource,
    getHistory,
    topUp,
    withDraw,
    clearError,
    setAppLoading,
    clearUser,
  },
  {
    user: null,
    moneysource: null,
    history: null,
    error: '',
    appLoading: false,
  }
);