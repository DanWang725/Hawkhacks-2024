import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material';

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
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
          }}
        >
          <div className="w-full">
            <div className="w-full flex flex-row">
              <p className="w-full text-primary text-md font-semibold">
                {'Previous Results: ' + testScore}
              </p>
              <p className="w-full text-primary text-md font-semibold text-right">
                {units + ' Units'}
              </p>
            </div>
            <p className="w-full text-primary text-lg font-bold pt-6">
              {courseCode}
            </p>
          </div>
          {/* <Box
            sx={{
              width: '100%',
            }}
          >
            <Typography
              variant="body1"
              fontSize={14}
              color={primaryCardColour}
              sx={{
                display: 'flex',
                marginLeft: 1,
              }}
            >
              {'Previous Results: ' + testScore}
            </Typography>

            <Typography
              variant="body1"
              fontSize={14}
              color={primaryCardColour}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: 1,
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
          </Box> */}
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
