import axios from "axios"
import authHeader from "./auth-header";

class PembayaranService {
    // getPembayaran() {
    //     return axios.get("http://localhost:8080/pembayaran")
    // }

    async getPembayaranByTagihanId(id) {
        try {
            const response = await axios.get(`admin/list-pembayaran?id_tagihan=${id}`, { headers: await authHeader() });
            // console.log(response.data.data)
            return response.data.data
        } catch (err) {
            console.log(err)
        }
        // return axios.get("http://localhost:8080/pembayaran/" + id)
    }

    // addPembayaran(pembayaran) {
    //     return axios.post("http://localhost:8080/pembayaran", pembayaran)
    // }

    // updatePembayaran(pembayaran) {
    //     return axios.put("http://localhost:8080/pembayaran/" + pembayaran.id, pembayaran)
    // }

    // deletePembayaran(id) {
    //     return axios.delete("http://localhost:8080/pembayaran/" + id)
    // }
}

export default new PembayaranService()