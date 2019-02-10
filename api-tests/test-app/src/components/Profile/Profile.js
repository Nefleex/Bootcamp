import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  withStyles,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
export default withStyles(styles)(
  class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fromDB: {
          ...props.data
        },
        ...props.data,
        disablePostalCode: true
      };
      this.handlePostalCode = this.handlePostalCode.bind(this);
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    handlePostalCode = () => {
      this.setState({ disablePostalCode: !this.state.disablePostalCode });
    };
    PostalField = () => {
      if (this.state.disablePostalCode) {
        return (
          <TextField
            type="text"
            name="postalCode"
            id="postalCode"
            onChange={this.onChange}
            value={this.state.postalCode}
            disabled="true"
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={this.handlePostalCode}>
                  <IconButton aria-label="Toggle edit">
                    <Edit />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        );
      } else {
        return (
          <TextField
            type="text"
            name="postalCode"
            id="postalCode"
            onChange={this.onChange}
            value={this.state.postalCode}
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={this.handlePostalCode}>
                  <IconButton aria-label="Toggle edit">
                    <Edit />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        );
      }
    };
    saveChanges = () => {
      let json = {
        email: this.state.email,
        address: this.state.address,
        city: this.state.city,
        postalCode: this.state.postalCode
      };
      fetch("http://localhost/api/users/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: json
      })
        .then(response => response.json())
        .then(a => console.log(a))
        .catch(err => console.log(err));
    };

    render() {
      const { classes } = this.props;
      return (
        <Fragment>
          <div>
            <Typography variant="subtitle1">Email</Typography>
            <TextField
              type="text"
              name="email"
              id="email"
              onChange={this.onChange}
              value={this.state.email}
              disabled="true"
            />
            <br />
            <Typography variant="subtitle1">Address</Typography>
            <TextField
              type="text"
              name="address"
              id="address"
              onChange={this.onChange}
              value={this.state.address}
            />
            <br />
            <Typography variant="subtitle1">City</Typography>
            <TextField
              type="text"
              name="city"
              id="city"
              onChange={this.onChange}
              value={this.state.city}
            />
            <br />

            <Typography variant="subtitle1">Postal Code</Typography>
            {this.PostalField()}
            {/* <TextField
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={this.onChange}
              value={this.state.edited.postalCode}
              disabled="true"
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.handlePostalCode}>
                    <IconButton aria-label="Toggle edit">
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            /> */}

            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="adornment-email">Email</InputLabel>
              <Input
                name="email"
                id="adornment-email"
                value={this.state.email}
                onChange={this.onChange}
                disabled="true"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle edit">
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          {/* <form>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={this.onChange}
              value={this.state.email}
            />
            <br />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={this.onChange}
              value={this.state.address}
            />
            <br />
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={this.onChange}
              value={this.state.city}
            />
            <br />
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={this.onChange}
              value={this.state.postalCode}
            />
            <br />
          </form> */}
          <button onClick={this.saveChanges}>Save Changes</button>
        </Fragment>
      );
    }
  }
);

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: 320
  },
  FormControl: {
    width: "100%"
  },
  container: {
    width: 300,
    marginTop: 30
  }
});
