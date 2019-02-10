import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

export default function ProtectedRoute(WrappedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }
    componentDidMount() {
      fetch("http://localhost:3000/api/auth", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("token") ||
            sessionStorage.getItem("token"),
          "x-access-token":
            localStorage.getItem("token") || sessionStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            throw new Error(res.error);
          }
        })
        .catch(err => {
          console.error(err);
          localStorage.clear();
          sessionStorage.clear();
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      if (this.state.loading) {
        return null;
      }
      if (this.state.redirect) {
        return <Redirect to="/" />;
      }
      return (
        <Fragment>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
}
