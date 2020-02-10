//libs
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//components
import auth from "./services/authService";
import Dashboard from "./components/dashboard";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/protectedRoute";
import RegisterForm from "./components/registerForm";
//css
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            {/* <ProtectedRoute *use protedted route when login is in place*/}
            <Route
              path="/dashboard"
              //using render property instead of component property is the only way
              //to pass aditional info, in this case the user obj to the component in a route
              render={props => <Dashboard {...props} user={this.state.user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/dashboard" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
