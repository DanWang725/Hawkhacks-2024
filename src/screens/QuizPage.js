import { useParams } from 'react-router-dom';
import { retrieveByTestId } from '../api/tests';
import { useEffect, useState } from 'react';
import TestPage from '../testPage';

const QuizPage = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  useEffect(() => {
    retrieveByTestId(id)
      .then((res) => {
        if (res.status === 200) {
          setTestData({
            ...res.data,
            questions: res.data.questions,
          });
        }
      })
      .catch(console.error);
  }, [id]);

  // useEffect(() => {
  //   console.log(testData);
  // }, [testData]);
  return testData ? (
    <div>
      <TestPage
        questionBank={testData.questions}
        testName={testData.name}
      ></TestPage>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};
export default QuizPage;
