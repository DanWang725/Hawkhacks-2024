import {
    box,
    Typography,
    Button,
} from '@mui/material';

import { retrieveTests } from '../../Hawkhacks-2024/src/api/tests';
import Navbar from './navbar';


const DashboardPage = () => {

    return (
        <div>
            <Navbar/>
            <Button
                variant="contained"
                onClick = {() =>
                    retrieveTests(1)
                }
            > Testing API Route</Button>
        </div>
    )
}

export default DashboardPage;