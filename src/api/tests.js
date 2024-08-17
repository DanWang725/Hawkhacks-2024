import toast from 'react-hot-toast';
import { Axios } from '../axios';
import { postCourse } from './course';
import { postUnit } from './units';
import { postTestQuestions } from './questions';

const completePostTestProcess = async ({
  testName,
  courseName,
  courseCode,
  university,
  unitNames,
  unitContents,
}) => {
  try {
    // add the course to the database if it does not already exist
    const respCourse = await postCourse({
      name: courseName,
      code: courseCode,
      desc: '',
      university: university,
    }).catch(console.error);

    // TODO: change '1' to the actual userId
    // creates the actual row in the test db table
    const respTest = await postTest(testName, 1, respCourse.data.id).catch(
      console.error,
    );

    // adds all of the units to the database
    const unitPromises = unitNames.map((unitName, i) =>
      postUnit(unitName, unitContents[i], respTest.data.id).catch(
        console.error,
      ),
    );
    await Promise.all(unitPromises);

    toast(
      'Successfully uploaded all documents! Please wait for the test to generate!',
    );

    // this is when ChatGPT actually makes the questions
    // all of the units must be added to the database before this step
    await postTestQuestions(respTest.data.id).catch(
      toast.error('Something went wrong while generating the test!'),
    );

    return { status: 200, ...respTest.data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

const retrieveTestCardInfo = async (testId = null) => {
  try {
    const { data } = await Axios.get(`/testcardinfo`, { testId });
    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

const retrieveTests = async (userId = null, testId = null) => {
  try {
    const params = { ...(userId && { userId }), ...(testId && { testId }) };
    const { data } = await Axios.get('/tests', params);
    console.log('/tests data: ', data);

    return { status: 200, data };
  } catch (error) {
    return { status: 200, ...error };
  }
};

const retrieveByTestId = async (testId) => {
  try {
    const { data } = await Axios.get(`/tests`, { params: { testId } });
    return { status: 200, data };
  } catch (error) {
    return { status: 200, ...error };
  }
};

const postTest = async (name, userId, courseId, desc = '') => {
  try {
    const dataPayload = {
      name: name,
      desc: desc,
      courseId: courseId,
      authorId: userId,
    };
    const { data } = await Axios.post('/tests', dataPayload, {
      timeout: 120000, // wait up to 2 minutes
    });
    return { status: 200, data };
  } catch (error) {
    return { status: 400, ...error };
  }
};

export {
  retrieveTestCardInfo,
  retrieveTests,
  postTest,
  completePostTestProcess,
  retrieveByTestId,
};
