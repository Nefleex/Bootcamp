import React, { Component, Fragment } from "react";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  withStyles
} from "@material-ui/core";
import StatusDisplayer from "./StatusDisplayer";
import { Link } from "react-router-dom";
import "./RegisterForm.css";
import { faFileExcel, faAlignCenter } from "@fortawesome/free-solid-svg-icons";
const styles = theme => ({
  root: {
    display: "flex",
    width: 500,
    alignItems: "center",
    justifyContent: "center",
    border: "black 1px solid"
  },
  FormControl: {}
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
        <Fragment>
          <form className={classes.root}>
            <FormControl className={classes.FormControl} fullWidth="true">
              <Typography variant="h4">REGISTER</Typography>
              <TextField
                name="email"
                value={this.state.email}
                placeholder="Email"
                onChange={this.onChange}
                type="text"
                required="true"
              />
              <TextField
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.onChange}
                type="password"
                required="true"
              />

              <Button onClick={this.submit}>Click</Button>
              <StatusDisplayer text={this.state.responseText} />
              <Link to={"/"}>To Login</Link>
            </FormControl>
          </form>
        </Fragment>
      );
    }
  }
);
