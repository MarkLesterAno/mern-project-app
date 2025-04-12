import { Component } from "react";
import "@mantine/core/styles.css";
import SampleContents from "./views/sample-contents";
import ProtectedRoutes from "./hoc/ProtectedRoute";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

import axios from "axios";
import { AppShell, rem } from "@mantine/core";
import lazyLoader from "./hoc/LazyLoader";
import DeviceRoutes from "./hoc/DeviceRoutes";
import PublicRoute from "./hoc/PublicRoutes";


const Login = lazyLoader(() => import('./views/auth/login'));
const SignUp = lazyLoader(() => import('./views/auth/signup'));
const ResetPassword = lazyLoader(() => import('./views/auth/reset-password'));
const Users = lazyLoader(() => import('./views/users'));
const Groups = lazyLoader(() => import('./views/groups'));
const Permissions = lazyLoader(() => import('./views/permissions'));

interface IAppState {
  error: any;
}
class App extends Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null
    };

    axios.interceptors.response.use(
      response => response,
      error => {
        this.setState({ error: this.handleError(error) });
      }
    );
  }



  handleError(error: any) {
    let error_message: string
    // Determine error and return appropriate message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401 && error.response.data.message === "jwt expired") {
        error_message = 'Session expired. Please log in again.';
      } else if (error.response.status === 404) {
        error_message = error.response.data.message;
      } else if (error.response.status >= 400 && error.response.status < 500) {
        error_message = error.response.data.message;
      } else if (error.response.status >= 500) {
        error_message = 'Server error. Please try again later.';
      } else {
        error_message = `Request failed with status ${error.response.status}`;
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      if (error.message === 'Network Error') {
        error_message = 'Network error. Please check your internet connection.';
      } else {
        error_message = 'Error setting up request.';
      }
    }
    notifications.show({
      id: 'server-errors',
      title: error_message,
      message: error.message,
      icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
      color: "red"

    })
    return error_message
  }

  render() {
    return (
      <AppShell>
        <AuthProvider>
          <Router>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/auth/signup/:token" element={<SignUp />} />
                <Route path="/auth/reset-password/" element={<ResetPassword />} />
                <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
              </Route>
              <Route element={<ProtectedRoutes />} >
                <Route path="/" element={<SampleContents />} />
                <Route path="/dashboard" element={<SampleContents />} />
                <Route path="/users" element={<Users />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/permissions" element={<Permissions />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </AppShell>
    );
  }
}

export default App;
