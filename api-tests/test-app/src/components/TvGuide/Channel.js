import React, { Component } from "react";
import Program from "./Program";
import "./Channel.css";

export default class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showExpired: false,
      allShows: "",
      freshShows: [],
      url: this.props.url
    };
  }

  componentWillReceiveProps(props, nextProps) {
    this.setState({ showExpired: props.isToggled });
    if (nextProps.url !== this.props.url) {
      this.setState({ url: props.url });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.url !== nextProps.url) {
  //     return true;
  //   }
  //   if (this.state.url !== nextState.url) {
  //     return true;
  //   }
  // }
  fetchData = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    this.setState({ url: `${this.props.url}${process.env.REACT_APP_API_KEY}` });

    // Excluding past broadcasts.
    fetch(proxyurl + this.state.url + process.env.REACT_APP_API_KEY)
      .then(response => response.json())
      .then(contents =>
        this.setState({ allShows: contents.data, isLoaded: true })
      )
      .then(() => {
        this.state.allShows.map(item =>
          Date.parse(item.endTime) > Date.parse(new Date())
            ? this.setState({
                freshShows: [...this.state.freshShows, item]
              })
            : null
        );
      })
      .catch(err => console.log(err));
  };
  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.url !== prevProps.url) {
  //     this.fetchData(this.props.url);
  //   }
  // }

  componentDidMount() {
    this.fetchData();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.url !== nextProps.url) {
  //     return true;
  //   }
  //   if (this.state.allShows !== nextState.allShows) {
  //     return true;
  //   }
  // }

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
