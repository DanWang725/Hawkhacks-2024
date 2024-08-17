import { Axios } from '../axios';

const postCourse = async ({ name, code, desc, university }) => {
  try {
    const dataPayload = {
      name,
      code,
      desc,
      university,
    };
    const { data } = await Axios.post(`/courses`, dataPayload);
    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};
export { postCourse };
