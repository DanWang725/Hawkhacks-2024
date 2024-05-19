import { useParams } from 'react-router-dom';
import { retrieveByTestId } from '../api/tests';
import { useEffect, useState } from 'react';

const QuizPage = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  useEffect(() => {
    retrieveByTestId(id).then((res) => {
      if (res.status === 200) {
        setTestData({ ...res.data.test, questions: res.data.questions });
      }
    });
  }, [id]);

  useEffect(() => {
    console.log(testData);
  }, [testData]);
  return testData ? (
    <div>
      <>
        <h1>{testData.name}</h1>
        <h2>{testData.courseName}</h2>
        <h3>{testData.courseCode}</h3>
        <h4>{testData.university}</h4>
        <h5>{testData.unitName}</h5>
        <h6>{testData.unitContent}</h6>
      </>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};
export default QuizPage;
