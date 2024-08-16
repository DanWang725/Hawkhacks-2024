import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import propTypes from 'prop-types';
import dateFormat from 'dateformat';

const TestCard = ({ test = {}, openTestFunc }) => {
  const { courseCode, date, university, units } = test;
  let { name } = test;
  const testScore = 'N/A';

  if (name.length > 24) {
    name = name.substring(0, 22) + '...';
  }

  const dateString = `${dateFormat(date, 'DDD, mmm dd')}`;
  const primaryCardColour = '#72C4FF';

  return (
    <Card
      sx={{
        height: 170,
        width: 350,
        minWidth: 350,
        minHeight: 170,
        border: '1px solid lightgray',
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <CardActionArea
        onClick={() => {
          openTestFunc(test);
        }}
      >
        <CardHeader
          title={name}
          titleTypographyProps={{
            marginTop: 0,
            marginBottom: 0.75,
            marginLeft: 0,
          }}
          subheader={university + ' - ' + dateString}
          subheaderTypographyProps={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 100,
          }}
          fontSize={14}
          color="#FFFFFF"
          sx={{
            backgroundColor: primaryCardColour,
            height: 65,
            color: '#FFFFFF',
          }}
        ></CardHeader>

        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            paddingLeft: 0,
          }}
        >
          <Box
            sx={{
              width: '100%',
              margin: 0,
              paddingRight: 0,
              paddingLeft: 1,
            }}
          >
            <Typography
              variant="body1"
              fontSize={14}
              color={primaryCardColour}
              sx={{
                marginTop: -1.6,
                marginLeft: 1,
              }}
            >
              {' '}
              {'Previous Results: ' + testScore}
            </Typography>

            <Typography
              variant="body2"
              fontSize={30}
              color={primaryCardColour}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: -3.0,
              }}
            >
              {units + ' Units'}
            </Typography>

            <Typography
              variant="body1"
              fontSize={22}
              color={primaryCardColour}
              sx={{
                marginTop: 2,
                marginLeft: 1,
                fontWeight: 550,
              }}
            >
              {' '}
              {courseCode}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

TestCard.propTypes = {
  id: propTypes.number,
  name: propTypes.string,
  date: propTypes.instanceOf(Date),
  courseName: propTypes.string,
  courseCode: propTypes.string,
  university: propTypes.string,
  units: propTypes.number,
  questionAmount: propTypes.number,
  authorName: propTypes.string,
  openTestFunc: propTypes.func,
};

export default TestCard;
