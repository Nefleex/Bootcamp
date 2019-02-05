import React, { Component } from "react";
import {
  Button,
  MuiThemeProvider,
  TextField,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Home.css";
import auth from "../../Auth/Auth";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = () => {
    const data = { email: this.state.email, password: this.state.password };
    const json = JSON.stringify(data);
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("token", data.token);
        console.log(data);
      })
      .then(() => {
        auth.login(() => {
          this.props.history.push("/tvguide");
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Typography variant="h4">Login</Typography>
          <TextField
            name="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.onChange}
            type="text"
          />
          <TextField
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.onChange}
            type="password"
          />

          <Button onClick={this.submit}>Click</Button>
          <Link to={"/register"}>To Register</Link>
        </MuiThemeProvider>
      </div>
    );
  }
}
