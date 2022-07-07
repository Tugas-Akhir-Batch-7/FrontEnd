import axios from 'axios'
import authHeader from './auth-header'


class AuthService {
    async login(credential) {
        try {
            const response = await axios.post('/login', credential)
            // this.setToken(response.data.access_token)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
        // const response = await axios.post('/login', credential)
        // return response.data
        // console.log(response.data)
    }

    async registerOtp(form) {
        try {
            const response = await axios.post('/registerOtp', {
                email: form.email,
            }, {
                headers: await authHeader()
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async register(form) {
        try {
            const response = await axios.post('/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    async updateProfile(form) {
        try {
            const response = await axios.post('/user/profile', form, {
                headers: await authHeader()
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async getProfile () {
        try {
            const response = await axios.get('/user/profile', {
                headers: await authHeader()
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default new AuthService()