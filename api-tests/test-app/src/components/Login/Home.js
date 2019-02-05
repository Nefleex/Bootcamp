import React, { Component, Fragment } from "react";
import {
  Button,
  TextField,
  withStyles,
  FormControl,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Home.css";

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
          this.props.history.push("/tvguide");
        })
        .catch(err => console.log(err));
    };

    render() {
      const { classes } = this.props;
      return (
        <Fragment>
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
              <Link to={"/tvguide"}>
                <Typography variant="overline">To TvGuide</Typography>
              </Link>
            </FormControl>
          </form>
        </Fragment>
      );
    }
  }
);
