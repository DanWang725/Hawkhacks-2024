import { box, Typography, Button, Card, Grid } from '@mui/material';

import TestCard from './card';
import { retrieveTests } from '../../Hawkhacks-2024/src/api/tests';
import Navbar from './navbar';
import { useEffect, useState } from 'react';

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
      <Navbar />
      <Typography
        variant="h1"
        fontSize={100}
        color="#72C4FF"
        sx={{
          marginLeft: 28,
          marginTop: 5,
        }}
      >
        {' '}
        My Tests
      </Typography>
      <Typography
        variant="h2"
        fontSize={100}
        color="#0067B1"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: -15,
          marginRight: 10,
        }}
      >
        Other Tests
      </Typography>

      <Grid
        sx={{
          marginTop: -1,
          marginLeft: 5,
        }}
        container
        rowSpacing={5}
        columnSpacing={-95}
      >
        <Grid item xs={6}>
          <TestCard />
        </Grid>
        <Grid item xs={6}>
          <TestCard />
        </Grid>
        <Grid item xs={6}>
          <TestCard />
        </Grid>
      </Grid>

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
