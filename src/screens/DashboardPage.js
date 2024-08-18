import QuizCard from '../components/QuizCard';
import CardRow from '../components/CardRow';
import { retrieveTestCardInfo } from '../api/tests';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const SkeletonTests = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
    </>
  );
};

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
      <div className="w-full flex flex-col text-black">
        <div className="mt-24 mx-12 lg:mx-28">
          <h1 className="text-3xl font-bold mb-4">Your Tests</h1>
          <CardRow cardWidth={400}>
            {tests.length ? (
              tests.map((test) => (
                <QuizCard
                  test={test}
                  key={test.id}
                  openTestFunc={() => navigate(`/test/${test.id}`)}
                />
              ))
            ) : (
              <SkeletonTests />
            )}
          </CardRow>
        </div>
        <div className="mt-16 mx-12 lg:mx-28">
          <h1 className="text-3xl font-bold mb-4">Trending</h1>
          <CardRow cardWidth={400}>
            {tests.length ? (
              tests.map((test) => (
                <QuizCard
                  test={test}
                  key={test.id}
                  openTestFunc={() => navigate(`/test/${test.id}`)}
                />
              ))
            ) : (
              <SkeletonTests />
            )}
          </CardRow>
        </div>
        <div className="my-16 mx-12 lg:mx-28">
          <h1 className="text-3xl font-bold mb-4">Top Quizzes For You</h1>
          <CardRow cardWidth={400}>
            {tests.length ? (
              tests.map((test) => (
                <QuizCard
                  test={test}
                  key={test.id}
                  openTestFunc={() => navigate(`/test/${test.id}`)}
                />
              ))
            ) : (
              <SkeletonTests />
            )}
          </CardRow>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
