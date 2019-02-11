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
import { Edit, Save } from "@material-ui/icons/";
export default withStyles(styles)(
  class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fromDB: {
          ...props.data
        },
        ...props.data,
        disablePostalCode: true,
        disableCity: true,
        disableAddress: true,
        disableEmail: true,
        errorMsg: []
      };
      this.handlePostalCode = this.handlePostalCode.bind(this);
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    handleEmail = () => {
      this.setState({ disableEmail: !this.state.disableEmail });
    };
    handlePostalCode = () => {
      this.setState({ disablePostalCode: !this.state.disablePostalCode });
    };
    handleCity = () => {
      this.setState({ disableCity: !this.state.disableCity });
    };
    handleAddress = () => {
      this.setState({ disableAddress: !this.state.disableAddress });
    };
    // handleEdit = item => {
    //   this.setState({ item: !this.state.item });
    // };

    EmailField = () => {
      if (this.state.disableEmail) {
        return (
          <Fragment>
            <Typography variant="subtitle1">Email</Typography>
            <TextField
              type="text"
              name="email"
              id="email"
              onChange={this.onChange}
              value={this.state.email}
              disabled={"true"}
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.handleEmail}>
                    <IconButton aria-label="Toggle edit">
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Typography variant="subtitle1">Email</Typography>
            <TextField
              type="text"
              name="email"
              id="email"
              onChange={this.onChange}
              value={this.state.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.handleEmail}>
                    <IconButton aria-label="Toggle edit">
                      <Save />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Fragment>
        );
      }
    };
    PostalField = () => {
      if (this.state.disablePostalCode) {
        return (
          <Fragment>
            <Typography variant="subtitle1">Postal Code</Typography>
            <TextField
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={this.onChange}
              value={this.state.postalCode}
              disabled={"true"}
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
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Typography variant="subtitle1">Postal Code</Typography>
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
                      <Save />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Fragment>
        );
      }
    };
    CityField = () => {
      if (this.state.disableCity) {
        return (
          <Fragment>
            <Typography variant="subtitle1">City</Typography>
            <TextField
              type="text"
              name="city"
              id="city"
              onChange={this.onChange}
              value={this.state.city}
              disabled={"true"}
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.handleCity}>
                    <IconButton aria-label="Toggle edit">
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Typography variant="subtitle1">City</Typography>
            <TextField
              type="text"
              name="city"
              id="city"
              onChange={this.onChange}
              value={this.state.city}
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.handleCity}>
                    <IconButton aria-label="Toggle edit">
                      <Save />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Fragment>
        );
      }
    };
    AddressField = () => {
      if (this.state.disableAddress) {
        return (
          <Fragment>
            <Typography variant="subtitle1">Address</Typography>
            <TextField
              type="text"
              name="address"
              id="address"
              onChange={this.onChange}
              value={this.state.address}
              disabled={"true"}
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.handleAddress}>
                    <IconButton aria-label="Toggle edit">
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Typography variant="subtitle1">Address</Typography>
            <TextField
              type="text"
              name="address"
              id="address"
              onChange={this.onChange}
              value={this.state.address}
              InputProps={{
                endAdornment: (
                  <InputAdornment onClick={this.handleAddress}>
                    <IconButton aria-label="Toggle edit">
                      <Save />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Fragment>
        );
      }
    };
    ErrorDisplay = () => {
      if (this.state.errorMsg) {
        return <Fragment>{this.state.errorMsg}</Fragment>;
      } else {
        return <Fragment>No error</Fragment>;
      }
    };
    handleError = () => {
      // switch (this.state.address){
      //   case null: this.setState({errorMsg:"Address cannot be empty"})
      //   case "": this.setState({errorMsg:"Address cannot be empty"})
      //   case 0: this.setState({errorMsg:"Address cannot be empty"})
      //   case undefined: this.setState({errorMsg:"Address cannot be empty"})
      if (!this.state.address)
        this.setState({ errorMsg: ["Address cannot be empty"] });
      if (!this.state.city)
        this.setState({
          errorMsg: [...this.state.errorMsg, "Address cannot be empty"]
        });
      if (!this.state.PostalCode)
        this.setState({
          errorMsg: [...this.state.errorMsg, "Postal Code cannot be empty"]
        });
      else {
        this.setState({
          errorMsg: []
        });
      }
    };
    saveChanges = () => {
      // this.handleError();
      let json = {
        email: this.state.email,
        address: this.state.address,
        city: this.state.city,
        postalCode: this.state.postalCode
      };
      // if (this.state.errorMsg === []) {
      fetch("http://localhost:3000/api/users/save", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("token") ||
            sessionStorage.getItem("token"),
          "x-access-token":
            localStorage.getItem("token") || sessionStorage.getItem("token")
        },
        body: JSON.stringify(json)
      })
        // .then(res => {
        //   if (res.status === 200) {
        //     return res.json();
        //   } else {
        //     throw new Error(res.error);
        //   }
        // })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
          if (res.status === 400) {
            return res.json();
            // this.props.history.push("/");
          } else {
            localStorage.clear();
            sessionStorage.clear();

            this.props.history.push("/");
          }
        })
        .then(data => {
          console.log(data.msg);
          this.setState({ errorMsg: data.msg });
        })
        .catch(err => console.log(err));
      // }
    };

    render() {
      const { classes } = this.props;
      return (
        <Fragment>
          <div>
            {this.AddressField()}
            {this.CityField()}
            {this.PostalField()}
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
          {this.ErrorDisplay()}
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
