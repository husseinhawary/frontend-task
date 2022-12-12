import axios from "axios"
import API_URLS from "./apiUrls"

export const userLoginAPI = (data) => {
    return axios({
        method: "POST",
        url: API_URLS.userLogin(),
        data,
    })
}