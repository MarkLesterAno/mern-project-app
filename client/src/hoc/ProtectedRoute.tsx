import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { LayoutView } from '../layout';

const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth()
    return <LayoutView>{isLoggedIn() ? <Outlet /> : <Navigate to='/login' />}</LayoutView>
}

export default ProtectedRoutes