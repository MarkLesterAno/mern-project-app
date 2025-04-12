import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { LayoutView } from '../layout';

const ProtectedRoutes = () => {
    const { isLoggedIn, user } = useAuth()

    return <LayoutView user={user}>{isLoggedIn ? <Outlet /> : <Navigate to='/login' />}</LayoutView>
}

export default ProtectedRoutes