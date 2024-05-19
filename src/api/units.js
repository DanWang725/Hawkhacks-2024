import { Axios } from '../axios';

const postUnit = async (unitName, noteContent, userId, courseId) => {
  const dataPayload = {
    content: noteContent,
    id: userId,
    courseId: courseId,
    name: unitName,
  };
  try {
    const { data } = await Axios.post('/unit', dataPayload);
    return { status: 200, data };
  } catch (error) {
    return { status: 200, ...error };
  }
};
export { postUnit };
