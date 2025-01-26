import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure'

const useMyAgreement = (userEmail) => {
  const axiosSecure = useAxiosSecure(); // Axios instance with secure headers

  // Fetch agreement data using TanStack Query
  const { data: agreements = [], isLoading, error } = useQuery({
    queryKey: ['agreement', userEmail], // Unique key with dependency on userEmail
    queryFn: async () => {
      const response = await axiosSecure.get('/agreement', {
        params: { userEmail }, // Pass user email as query parameter
      });
      return response.data; // Return the fetched data
    },
    enabled: !!userEmail, // Ensure the query runs only when userEmail is available
  });

  return { agreements, isLoading, error };
};

export default useMyAgreement;
