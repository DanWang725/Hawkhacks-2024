import { Axios } from '../axios';

// TODO: don't send the password in plaintext
const completeNewAccountProcess = async ({ username, email, password }) => {
  const newAccountResponse = await postNewAccount({
    username,
    email,
    password,
  });
  console.log('newAccount: ', newAccountResponse);
  if (newAccountResponse.status !== 200) {
    return {
      status: newAccountResponse.status,
      detail: newAccountResponse.response.data.detail,
    };
  }

  const tokenResponse = await postGenerateToken({ email, password });
  console.log('tokenResponse: ', tokenResponse);
  if (tokenResponse.status !== 200) {
    return {
      status: tokenResponse.status,
      detail: tokenResponse.response.data.detail,
    };
  }

  return tokenResponse;
};

const postNewAccount = async ({ username, email, password }) => {
  try {
    const dataPayload = {
      username,
      email,
      password,
    };
    const { data } = await Axios.post(`/users`, dataPayload);

    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

const postGenerateToken = async ({ email, password }) => {
  try {
    const dataPayload = {
      grant_type: 'password',
      username: email, // yes, this is correct
      password: password,
      scope: null,
      client_id: 'string',
      client_secret: 'string',
    };

    const { data } = await Axios.post(`/users/token`, dataPayload, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

const postLogin = async ({ email, password }) => {
  try {
    const dataPayload = {
      email,
      password,
    };
    const { data } = await Axios.post(`/login`, dataPayload);

    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

const postLogout = async () => {
  try {
    const { data } = await Axios.post(`/logout`);

    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

export { completeNewAccountProcess, postNewAccount, postLogin, postLogout };
