import { Axios } from '../axios';

const postCourse = async ({ name, code, desc, university }) => {
  try {
    const dataPayload = {
      name,
      code,
      desc,
      university,
    };
    const { data } = await Axios.post(`/course`, dataPayload);
    return { status: 200, data };
  } catch (error) {
    return { status: 200, ...error };
  }
};
export { postCourse };
