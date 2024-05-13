import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provides/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const UseAxiosSecure = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    axiosSecure.interceptors.response.use(
        res => {
            return res
        }, async error => {
            console.log('error from axiosSecure', error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                await logOut()
                navigate('/login')
            }
            return Promise.reject(error)
        }
    )
    return axiosSecure
};

export default UseAxiosSecure;