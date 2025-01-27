import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, AuthContext } from '../provider/AuthProvider';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {signOutUser} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `bearer ${token}`
        console.log('req stopped by interceptor', token)
        return config;
      }, function (error) {
        
        return Promise.reject(error);
      });

      // interceptor 401 and 403 status
      axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        console.log('status error in interceptor', error)
        const status =error.response.status;
        // for 401 or 403 logout the user and move to login page.
        if(status === 401 || status === 403){
            signOutUser(auth)
            .then(res =>{
                console.log(res)
            })
            navigate('/login')
        }
        return Promise.reject(error);
      });
    return axiosSecure;
};


export default useAxiosSecure;