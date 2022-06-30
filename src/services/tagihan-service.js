import axios from "axios";
import authHeader from "./auth-header";

class TagihanService {
    // getAllTagihan() {
    //     return axios.get("http://localhost:8080/tagihan");
    // }
    async getAllTagihan() {
        try {
            let response = await axios.get("admin/list-tagihan", { headers: await authHeader() });
            return response.data.data
        } catch (err) {
            console.log(err)
        }
    }
    async getTagihanById(id) {
        try {
            const response = await axios.get(`admin/detail-tagihan/${id}`, { headers: await authHeader() });
            console.log(response.data.data)
            return response.data.data
        } catch (err) {
            console.log(err)
        }
        // return axios.get("http://localhost:8080/tagihan/" + id);
    }
    async createTagihan(tagihan) {
        try {
            console.log(tagihan)
            const response = await axios.post("admin/create-tagihan", {
                id_murid: tagihan.id_murid,
                total_bill: tagihan.tagihan,
                dp: tagihan.dp,
            },
                { headers: await authHeader() });
            console.log(response.data)
            return response.data
        } catch (err) {
            console.log(err)
        }
        // return axios.post("", tagihan);
    }
    // updateTagihan(id, tagihan) {
    //     return axios.put("http://localhost:8080/tagihan/" + id, tagihan);
    // }
    // deleteTagihan(id) {
    //     return axios.delete("http://localhost:8080/tagihan/" + id);
    // }
}

export default new TagihanService()