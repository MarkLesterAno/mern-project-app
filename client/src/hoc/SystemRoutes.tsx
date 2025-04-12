import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { SystemLayoutView } from '../layout/system';

const SystemRoutes = () => {
    const { isLoggedIn } = useAuth()
    return <SystemLayoutView>{isLoggedIn() ? <Outlet /> : <Navigate to='/login' />}</SystemLayoutView>
}

export default SystemRoutes