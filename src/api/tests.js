import { Axios } from '../axios';
import { postCourse } from './course';
import { postUnit } from './units';
const completePostTestProcess = async ({
  testName,
  courseName,
  courseCode,
  university,
  unitName,
  unitContent,
}) => {
  try {
    const respCourse = await postCourse({
      name: courseName,
      code: courseCode,
      desc: '',
      university,
    });
    if (respCourse.status !== 200) {
      return { status: 400, ...respCourse };
    }
    console.log('stage1', unitName, unitContent, respCourse);
    for (let i = 0; i < unitName.length; i++) {
      await postUnit(unitName[i], unitContent[i], 1, respCourse.data.id);
    }

    console.log('stage2');
    await postTest(testName, 1, respCourse.data.id);
  } catch (error) {
    return { status: 400, ...error };
  }
};
const retrieveTests = async (userId = null, testId = null) => {
  try {
    const params = { ...(userId && { userId }), ...(testId && { testId }) };
    const { data } = await Axios.get('/tests', params);
    console.log(data);
    return { status: 200, data };
  } catch (error) {
    return { status: 200, ...error };
  }
};

const postTest = async (name, userId, courseId) => {
  try {
    const dataPayload = {
      name,
      courseId,
      id: userId,
    };
    const { data } = await Axios.post('/tests', dataPayload);
    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

export { retrieveTests, postTest, completePostTestProcess };
