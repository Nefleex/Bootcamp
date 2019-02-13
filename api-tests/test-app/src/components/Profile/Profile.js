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
  IconButton,
  Button
} from "@material-ui/core";
import { Edit, Save } from "@material-ui/icons/";
import AppBar from "../Home/AppBar";

export default withStyles(styles)(
  class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fromDB: {
          ...props.data
        },
        ...props.data,
        errorMsg: [],
        isEditMode: false
      };
    }

    // OnChangeHandler for inputs, uses elements name to determine which state field to change
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    // handleEdit = item => {
    //   this.setState({ item: !this.state.item });
    // };

    // Input field components, disabled by default, handler functions enable editing.

    UsernameField = () => {
      if (!this.state.isEditMode) {
        return (
          <Fragment>
            <Typography variant="subtitle1">Username</Typography>
            <TextField
              type="text"
              name="userName"
              id="userName"
              onChange={this.onChange}
              value={this.state.userName}
              disabled
            />
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Typography variant="subtitle1">Username</Typography>
            <TextField
              type="text"
              name="userName"
              id="userName"
              onChange={this.onChange}
              value={this.state.userName}
            />
          </Fragment>
        );
      }
    };
    PostalField = () => {
      if (!this.state.isEditMode) {
        return (
          <Fragment>
            <Typography variant="subtitle1">Postal Code</Typography>
            <TextField
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={this.onChange}
              value={this.state.postalCode}
              disabled
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
            />
          </Fragment>
        );
      }
    };
    CityField = () => {
      if (!this.state.isEditMode) {
        return (
          <Fragment>
            <Typography variant="subtitle1">City</Typography>
            <TextField
              type="text"
              name="city"
              id="city"
              onChange={this.onChange}
              value={this.state.city}
              disabled
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
            />
          </Fragment>
        );
      }
    };
    AddressField = () => {
      if (!this.state.isEditMode) {
        return (
          <Fragment>
            <Typography variant="subtitle1">Address</Typography>
            <TextField
              type="text"
              name="address"
              id="address"
              onChange={this.onChange}
              value={this.state.address}
              disabled
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
        postalCode: this.state.postalCode,
        userName: this.state.userName,
        phoneNumber: this.state.phoneNumber
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
      this.setState({ isEditMode: false });
      // }
    };

    setOriginalValues = () => {
      this.setState({ ...this.state.fromDb, isEditMode: false });
    };

    render() {
      const { classes } = this.props;
      return (
        <Fragment>
          <AppBar history={this.props.history} />
          <div>
            <Typography variant="h3">Your Profile</Typography>
            <EmailField
              change={this.onChange}
              email={this.state.email}
              editMode={this.state.isEditMode}
            />
            <UsernameField
              change={this.onChange}
              username={this.state.userName}
              editMode={this.state.isEditMode}
            />
            {this.AddressField()}
            {this.CityField()}
            {this.PostalField()}
          </div>

          <Button variant="contained" onClick={this.saveChanges}>
            <Save />
            Save Changes
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              this.setState({ isEditMode: true });
            }}
          >
            <Edit /> EDIT
          </Button>
          {this.ErrorDisplay()}
          <Link to={"/"}>
            <Typography variant="overline">TO LOGIN</Typography>
          </Link>
          <Link to={"/home"}>
            <Typography variant="overline">TO HOME</Typography>
          </Link>
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

const EmailField = props => {
  if (!props.editMode) {
    return (
      <Fragment>
        <Typography variant="subtitle1">Email</Typography>
        <TextField
          type="text"
          name="email"
          id="email"
          onChange={props.change}
          value={props.email}
          disabled
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
          onChange={props.change}
          value={props.email}
        />
      </Fragment>
    );
  }
};

const UsernameField = props => {
  if (!props.editMode) {
    return (
      <Fragment>
        <Typography variant="subtitle1">Username</Typography>
        <TextField
          type="text"
          name="userName"
          id="userName"
          onChange={props.change}
          value={props.username}
          disabled
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="subtitle1">Username</Typography>
        <TextField
          type="text"
          name="userName"
          id="userName"
          onChange={props.change}
          value={props.username}
        />
      </Fragment>
    );
  }
};
