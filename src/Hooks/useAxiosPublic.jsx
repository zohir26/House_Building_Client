import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://building-management-server-umber.vercel.app',
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
    // headers: {
    //     'Content-Type': 'application/json',
    // },
  });

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;