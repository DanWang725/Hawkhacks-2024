import {
    Typography,
    Button,
} from '@mui/material';



const HomePage = () => {
    return (
        <div>
            <Typography
                variant="body1"
                fontSize = {100}
                color = "#000000"
                sx = {{
                    textAlign: 'center',
                    marginTop: 25,
                    fontWeight: 100,
                }}
            > Here to Help <font color='#72C4FF'>YOU</font> Study</Typography>


            <Typography
                variant="body1"
                fontSize = {40}
                color = "#E9E2E2"
                sx = {{
                    textAlign: 'center',
                    fontWeight: 50,
                    position: 'absolute',
                    top : 100,
                    left : 50,
                }}
            > {'Micro Computers'}</Typography>

            <Typography
                variant="body1"
                fontSize = {40}
                color = "#E9E2E2"
                sx = {{
                    textAlign: 'center',
                    fontWeight: 50,
                    position: 'absolute',
                    top : 480,
                    left : 140,
                }}
            > {'BioMedical'}</Typography>

            <Typography
                variant="body1"
                fontSize = {40}
                color = "#E9E2E2"
                sx = {{
                    textAlign: 'center',
                    fontWeight: 50,
                    position: 'absolute',
                    top : 210,
                    left : 370,
                }}
            > {'Nutrition'}</Typography>

            <Typography
                variant="body1"
                fontSize = {40}
                color = "#E9E2E2"
                sx = {{
                    textAlign: 'center',
                    fontWeight: 50,
                    position: 'absolute',
                    top : 600,
                    left : 540,
                }}
            > {'Discrete Math'}</Typography>

            <Typography
                variant="body1"
                fontSize = {40}
                color = "#E9E2E2"
                sx = {{
                    textAlign: 'center',
                    fontWeight: 50,
                    position: 'absolute',
                    top : 80,
                    left : 1000,
                }}
            > {'Sociology'}</Typography>

            <Typography
                variant="body1"
                fontSize = {40}
                color = "#E9E2E2"
                sx = {{
                    textAlign: 'center',
                    fontWeight: 50,
                    position: 'absolute',
                    top : 530,
                    left : 940,
                }}
            > {'Computer Science'}</Typography>

            <Typography
                variant="body1"
                fontSize = {40}
                color = "#E9E2E2"
                sx = {{
                    textAlign: 'center',
                    fontWeight: 500,
                    position: 'absolute',
                    top : 180,
                    left : 1200,
                }}
            > {'Geography'}</Typography>
        </div>
    )
}

export default HomePage;