import React, { useContext } from 'react';
import useAdmin from '../Hooks/useAdmin';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../Components/Shared/Loading';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin,  isAdminLoading] = useAdmin();
    
    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }
    if (user && user.email && isAdmin) {
        return children
    }
    return <Navigate to="/login"></Navigate>
};

export default AdminRoute;