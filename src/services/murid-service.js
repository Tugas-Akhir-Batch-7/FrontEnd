import axios from 'axios'
import authHeader from './auth-header'

class MuridService {
    // async getMurid() {
    //     try {
    //         const response = await axios.get('murid/list',
    //             { headers: authHeader() })
    //         // console.log(response.data)
    //         return response.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    async getMuridByStatus(status) {
        try {
            // console.log(await authHeader())
            const response = await axios.get(`admin/murid?status=${status}`,
                { headers: await authHeader() })
            // console.log(response.data)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default new MuridService()