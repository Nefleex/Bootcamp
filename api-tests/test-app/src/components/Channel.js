import React, { Component } from "react";

export default class Channel extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      data: "",
      privateApiKey: process.env.REACT_APP_API_KEY
    };
  }
  componentWillMount() {
    const url = `${this.props.url}${this.state.privateApiKey}`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyurl + url)
      .then(response => response.json())
      .then(contents => this.setState({ data: contents, isLoaded: true }))
      .then(() => console.log(this.state.data))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.state.isLoaded ? (
          this.state.data.data.map((item, index) => (
            <div key={index}>
              {item.content.title.fi || item.content.title.sv}
              <hr />
            </div>
          ))
        ) : (
          <div>Awaiting API end point...</div>
        )}
      </div>
    );
  }
}
