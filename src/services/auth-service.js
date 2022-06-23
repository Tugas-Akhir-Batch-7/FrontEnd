import axios from 'axios'

class AuthService {
    async login(credential) {
        try {
            const response = await axios.post('/login', credential)
            // this.setToken(response.data.access_token)
            // console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
        // const response = await axios.post('/login', credential)
        // return response.data
        // console.log(response.data)
    }
}

export default new AuthService()