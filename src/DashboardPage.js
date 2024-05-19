import { box, Typography, Button, Card } from '@mui/material';

import { retrieveTests } from '../../Hawkhacks-2024/src/api/tests';
import Navbar from './navbar';
import { useEffect, useState } from 'react';
import TestCard from './card';

const DashboardPage = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    retrieveTests(1).then(({ data }) => {
      const parsedTests = data.tests?.map((test) => {
        const date = new Date(parseInt(test.date, 10));
        console.log(date);
        return { ...test, date: date };
      });
      setTests(parsedTests);
    });
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={() => retrieveTests(1)}>
        {tests.map((test, index) => (
          <TestCard test={test} key={index} />
        ))}
        Testing API Route
      </Button>
    </div>
  );
};

export default DashboardPage;
