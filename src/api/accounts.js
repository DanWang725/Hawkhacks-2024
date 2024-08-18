import { Axios } from '../axios';

// TODO: lmao we are sending passwords in plaintext, someone should fix this ("not it" - Joel)
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

// TODO: lmao we are sending passwords in plaintext, someone should fix this ("not it" - Joel)
const postLogin = async ({ email, password }) => {
  try {
    const dataPayload = {
      email,
      password,
    };
    const { data } = await Axios.post(`/users/login`, dataPayload);

    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

export { postNewAccount, postLogin };
