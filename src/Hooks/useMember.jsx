
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useMember = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    if (!user?.email) {
        console.error('User email is missing');
        return false;
    }
    const {data:isMember,isLoading, error } = useQuery({
        queryKey:[user?.email, 'isMember'],
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