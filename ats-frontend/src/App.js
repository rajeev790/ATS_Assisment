import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import JobState from './context/job/JobState';
import ApplicationState from './context/application/ApplicationState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CoordinatorDashboard from './components/dashboard/CoordinatorDashboard';
import RecruiterDashboard from './components/dashboard/RecruiterDashboard';
import EmployerDashboard from './components/dashboard/EmployerDashboard';
import CandidateDashboard from './components/dashboard/CandidateDashboard';
import AuthContext from './context/auth/authContext';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthState>
      <JobState>
        <ApplicationState>
          <Router>
            <div className='App'>
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute
                  exact
                  path='/coordinator'
                  component={CoordinatorDashboard}
                />
                <PrivateRoute
                  exact
                  path='/recruiter'
                  component={RecruiterDashboard}
                />
                <PrivateRoute
                  exact
                  path='/employer'
                  component={EmployerDashboard}
                />
                <PrivateRoute
                  exact
                  path='/candidate'
                  component={CandidateDashboard}
                />
              </Switch>
            </div>
          </Router>
        </ApplicationState>
      </JobState>
    </AuthState>
  );
};

export default App;