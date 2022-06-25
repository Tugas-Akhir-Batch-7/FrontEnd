import axios from 'axios'
import authHeader from './auth-header'


class AdminService {
    // async getGuru() {
    //     try {
    //         const response = await axios.get('admin/list-by-role?role=guru',
    //             { headers: authHeader() })
    //         // console.log(response.data)
    //         return response.data

    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    async getListByRole(role) {
        try {
            console.log(await authHeader())
            const response = await axios.get(`admin/list-by-role?role=${role}`,
                { headers: await authHeader() })
            // console.log(response.data)
            return response.data

        }
        catch (error) {
            console.log(error)
        }
    }
}

export default new AdminService()