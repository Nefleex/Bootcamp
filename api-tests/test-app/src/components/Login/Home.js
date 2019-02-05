import React, { Component } from "react";
import {
  Button,
  MuiThemeProvider,
  TextField,
  withStyles,
  FormControl,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Home.css";
import auth from "../../Auth/Auth";

const styles = theme => ({
  FormControl: {
    width: 400
  }
});

export default withStyles(styles)(
  class Home extends Component {
    constructor(props) {
      super(props);
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
      const { classes } = this.props;
      return (
        <div>
          <MuiThemeProvider>
            <form>
              <FormControl className={classes.FormControl}>
                <Typography variant="h4">LOGIN</Typography>
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

                <Button onClick={this.submit}>Submit</Button>
                <Link to={"/register"}>
                  <Typography variant="overline">To Register</Typography>
                </Link>
              </FormControl>
            </form>
          </MuiThemeProvider>
        </div>
      );
    }
  }
);
