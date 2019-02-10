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
        edited: { ...props.data }
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    handlePostalCode = () => {
      let el = document.querySelector("#postalCode");
      console.log(el);
      el.classList.remove("MuiInputBase-disabled-57");
      el.classList.remove("MuiInput-disabled-44");
      el.removeAttribute("disabled");
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
              value={this.state.edited.email}
              disabled="true"
            />
            <br />
            <Typography variant="subtitle1">Address</Typography>
            <TextField
              type="text"
              name="address"
              id="address"
              onChange={this.onChange}
              value={this.state.edited.address}
            />
            <br />
            <Typography variant="subtitle1">City</Typography>
            <TextField
              type="text"
              name="city"
              id="city"
              onChange={this.onChange}
              value={this.state.edited.city}
            />
            <br />

            <Typography variant="subtitle1">Postal Code</Typography>
            <TextField
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
            />

            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="adornment-email">Email</InputLabel>
              <Input
                name="email"
                id="adornment-email"
                value={this.state.fromDB.email}
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
          <button
            onClick={() => {
              console.log(this.props.data);
            }}
          />
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
