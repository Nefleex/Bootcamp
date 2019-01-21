import React, { Component } from "react";
import { Button, MuiThemeProvider, TextField } from "@material-ui/core";
import "./Home.css";

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
    fetch("localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json
    })
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <h4>login</h4>
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
        </MuiThemeProvider>
      </div>
    );
  }
}
