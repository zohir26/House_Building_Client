import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";
const useMember = () => {
    const {user,loading} = useContext(AuthContext)

    const axiosSecure = useAxiosSecure();
    // if (!user?.email) {
    //     console.error('User email is missing');
    //     return false;
    // }
    const {data:isMember,isLoading, error } = useQuery({
        queryKey:[ 'isMember', user?.email],
        enabled: !loading && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`agreements/member/${user.email}`);
                console.log('Response Data:', res.data);
                return res.data?.member;
            } catch (error) {
                console.error('Error fetching member data:', error);
                return false; // Fallback value
            }
        }
    })
        return [isMember,isLoading, error]
};

export default useMember;