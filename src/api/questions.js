import { Axios } from '../axios';

const postTestQuestions = async (testId) => {
  try {
    const { data } = await Axios.post(`/create/testquestions?testId=${testId}`);
    return { status: 200, data };
  } catch (error) {
    return { status: 200, ...error };
  }
};

export { postTestQuestions };
