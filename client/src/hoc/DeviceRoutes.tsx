import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { DeviceLayout } from '../layout/device-layout';
import SampleDeviceLayout from '../layout/device';

const DeviceRoutes = () => {
    const { isLoggedIn } = useAuth()
    return <SampleDeviceLayout>{isLoggedIn() ? <Outlet /> : <Navigate to='/login' />}</SampleDeviceLayout>
}

export default DeviceRoutes