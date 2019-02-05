import React, { Component } from "react";
import {
  Button,
  MuiThemeProvider,
  TextField,
<<<<<<< HEAD
  Typography
=======
  Typography,
  withStyles
>>>>>>> e4ba289740640c61d726d50151054023a25e1db9
} from "@material-ui/core";
import StatusDisplayer from "./StatusDisplayer";
import { Link } from "react-router-dom";
import "./RegisterForm.css";
const styles = theme => ({
  FormControl: {
    width: 400
  }
});

export default withStyles(styles)(
  class RegisterForm extends Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: "",
        responseText: ""
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    submit = () => {
      const data = { email: this.state.email, password: this.state.password };
      const json = JSON.stringify(data);
      fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: json
      })
        .then(response => response.text())
        .then(text => this.setState({ responseText: text }))
        .catch(err => console.log(err));
    };

    render() {
      const { classes } = this.props;

      return (
        <div>
          <MuiThemeProvider>
            <h4>register</h4>
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
            <StatusDisplayer text={this.state.responseText} />
            <Link to={"/"}>To Login</Link>
          </MuiThemeProvider>
        </div>
      );
    }
  }
);
