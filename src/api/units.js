import { Axios } from '../axios';

const postUnit = async (unitName, unitSummary, testId) => {
  const dataPayload = {
    name: unitName,
    summary: unitSummary,
    testId: testId,
  };
  try {
    const { data } = await Axios.post('/units', dataPayload);
    return { status: 200, data };
  } catch (error) {
    return { status: 200, ...error };
  }
};
export { postUnit };
