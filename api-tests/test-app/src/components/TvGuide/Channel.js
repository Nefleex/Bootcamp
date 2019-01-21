import React, { Component } from "react";
import Program from "./Program";
import "./Channel.css";

export default class Channel extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      showExpired: false,
      allShows: "",
      freshShows: []
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ showExpired: props.isToggled });
  }

  componentWillMount() {
    const url = `${this.props.url}${process.env.REACT_APP_API_KEY}`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    // Excluding past broadcasts.
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(contents =>
        this.setState({ allShows: contents.data, isLoaded: true })
      )
      .then(() => {
        this.state.allShows.map(item =>
          Date.parse(item.endTime) > Date.parse(new Date())
            ? this.setState({
                freshShows: this.state.freshShows.concat(item)
              })
            : null
        );
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="channel-main">
        <h1 className="channel-title">
          <div className="title-icon">{this.props.titleIcon}</div>

          {this.props.title}
        </h1>
        <div className="channel-content">
          <div>
            {!this.state.isLoaded ? <div>Loading</div> : <div>Loaded</div>}{" "}
          </div>
          <div>
            {this.state.isLoaded && this.state.showExpired
              ? this.state.allShows.map((item, index) => (
                  <Program key={index} channelData={item} />
                ))
              : null}
          </div>

          {this.state.isLoaded && !this.state.showExpired
            ? this.state.freshShows.map((item, index) => (
                <Program key={index} channelData={item} />
              ))
            : null}
        </div>
      </div>
    );
  }
}
