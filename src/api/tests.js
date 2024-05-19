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
    unitName.map((unit, index) =>
      postUnit(unit, unitContent[index], 1, respCourse.data.id),
    );

    Promise.all(unitName).then(() => {
      postTest(testName, 1, respCourse.data.id);
    });
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
    const { data } = await Axios.ost('/tests', dataPayload);
    return { status: 200, data };
  } catch (error) {
    return { status: 200, ...error };
  }
};

export { retrieveTests, postTest, completePostTestProcess };
