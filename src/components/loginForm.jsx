import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    let currentError;
    try {
      const { data } = this.state;
      await auth.loginGraphQL(data.username, data.password);

      if (auth.getCurrentUser() === null)
        currentError = "login failed, please try again";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        currentError = ex.response.data;
    } finally {
      if (currentError) {
        const errors = { ...this.state.errors };
        errors.username = currentError;
        console.log(`login error: ${currentError}`);
        this.setState({ errors });
        return;
      }
      //TODO fix this
      let state;
      const { location } = this.props;
      if (location) state = location.state;
      //fix to use below
      // const { state } = this.props.location;
      //this.props.history.push("/");//this will not reload the navbar after login
      //window.location will realod the app after login and re-render the user in the navbar
      window.location = state ? state.from.pathname : "/dashboard";
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
