import axios from "axios";
import authHeader from "./auth-header";

class TagihanService {
    // getAllTagihan() {
    //     return axios.get("http://localhost:8080/tagihan");
    // }
    // getTagihanById(id) {
    //     return axios.get("http://localhost:8080/tagihan/" + id);
    // }
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