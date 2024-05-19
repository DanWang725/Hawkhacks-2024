import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Typography,
  } from '@mui/material';

import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

const title = 'Midterm Preperation Exam';
const university = 'University of Guelph';
const date = '01/01/2024';
const testScore = '95%';
const courseCode = 'CIS2750';
const unitAmount = '4';
const questionAmount = '5';



const TestCard = ({test = {}, openTestFunc})  => {

    const { 
        courseCode,
        name,
        date,
        university,
        units,
        questionAmount,
    } = test;

    const dateString = `${dateFormat(date, 'DDD, mmm dd')}`;

    return (
        <Card
            sx={{
                height: 200,
                width: 500,
                maxHeight: 175,
                border: '1px solid lightgray',
                boxShadow: 3,
                borderRadius: 3,
            }}
        >

            <CardActionArea
                onClick = {() => {
                    openTestFunc(test)
                }}
            >

            
            <CardHeader
                title = {name}
                titleTypographyProps={{marginTop: 0, marginBottom: 0.75,
                                       marginLeft: 0,
                }}
                subheader = {university + ' - ' + dateString}
                subheaderTypographyProps={{color: '#FFFFFF', fontSize: 14,
                                           fontWeight: 100,
                }}
                fontSize={16}
                color= '#FFFFFF'
                sx= {{
                    backgroundColor: '#72C4FF',
                    height:65,
                    color: '#FFFFFF',
                }}
            > 
            </CardHeader>

            <CardContent
                sx ={{
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
                        variant = "body1"
                        fontSize = {14}
                        color = "#72C4FF"
                        sx = {{
                            marginTop: -1.6,
                            marginLeft: 1,
                        }}
                    > {'Previous Results: ' + testScore}</Typography>

                    <Typography
                        variant = 'body2'
                        fontSize = {30}
                        color = "#72C4FF"
                        sx = {{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: -3.0,


                        }}
                    >
                        {'U: ' + (units).length}
                    </Typography>

                    <Typography
                        variant = "body1"
                        fontSize = {30}

                        color = "#72C4FF"
                        sx = {{ 
                            marginTop: 2,
                            marginLeft: 1,
                            fontWeight: 550,
                        }}

                    > {courseCode + 'hi'}
                    </Typography>
                    
                </Box>
            </CardContent>
            </CardActionArea>
        </Card>

    );
}

TestCard.PropTypes = {
    test: PropTypes.exact({
        courseCode: PropTypes.string,
        name: PropTypes.string,
        date: PropTypes.date,
        university: PropTypes.string,
        units: PropTypes.string,
        questionAmount: PropTypes.number,
    }),
    openTestFunc: PropTypes.func,
};


export default TestCard;