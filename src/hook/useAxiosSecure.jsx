import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provides/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})
const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    axiosSecure.interceptors.response.use(
        res => {
            return res
        }, async error => {
            console.log('error from axiosSecure', error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                console.log(error.response);
                await logOut()
                navigate('/login')
            }
            return Promise.reject(error)
        }
    )
    return axiosSecure
};

export default useAxiosSecure;