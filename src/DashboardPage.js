import TestCard from './card';
import CardRow from './components/CardRow';
import { retrieveTestCardInfo } from '../../Hawkhacks-2024/src/api/tests';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    retrieveTestCardInfo()
      .then(({ data }) => {
        const parsedTests = data.map((test) => {
          const date = new Date(test.date);
          return { ...test, date: date };
        });
        setTests(parsedTests);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col text-primary">
        <div className="mt-24 mx-12 lg:mx-28">
          <h1 className="text-3xl font-bold">Your Tests</h1>
          <CardRow>
            {tests.map((test) => (
              <TestCard
                test={test}
                key={test.id}
                openTestFunc={() => navigate(`/test/${test.id}`)}
              />
            ))}
          </CardRow>
        </div>
        <div className="mt-16 mx-12 lg:mx-28">
          <h1 className="text-3xl font-bold">Trending</h1>
          <CardRow>
            {tests.map((test) => {
              return (
                <TestCard
                  test={test}
                  key={test.id}
                  openTestFunc={() => navigate(`/test/${test.id}`)}
                />
              );
            })}
          </CardRow>
        </div>
        <div className="mt-16 mx-12 lg:mx-28">
          <h1 className="text-3xl font-bold">Top Quizzes For You</h1>
          <CardRow>
            {tests.map((test) => (
              <TestCard
                test={test}
                key={test.id}
                openTestFunc={() => navigate(`/test/${test.id}`)}
              />
            ))}
          </CardRow>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
