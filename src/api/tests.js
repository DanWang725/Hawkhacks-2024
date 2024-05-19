import { Axios } from '../axios'

const retrieveTests = async (params) => {
    try {
        const { data } = await Axios.get('/tests', params);
        return { status: 200, data};
    } catch (error) {
        return {status: 200, ...error};
    }
}

