import React, { Component } from "react";
import moment from "moment";
import Programs from "./Programs";

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
      .then(x => console.log(x))
      .catch(err => console.log(err));

    // fetch(proxyurl + "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1 \
    // &" ).then(response => response.json).then(contents => this.setState({}))
  }

  render() {
    return (
      <div>
        <button className="button" onClick={this.testerFn}>
          Click me
        </button>
        <h1>{this.props.title}</h1>
        <div>
          {!this.state.isLoaded ? <div>Loading</div> : <div>Loaded</div>}{" "}
        </div>
        <div>
          {this.state.isLoaded && this.state.showExpired
            ? this.state.allShows.map((item, index) => (
                <div key={index}>
                  <div>{moment(Date.parse(item.startTime)).format("HHMM")}</div>
                  {item.content.title.fi || item.content.title.sv}
                  <hr />
                </div>
              ))
            : null}
        </div>
        {
          /////////////////////////
        }

        {this.state.isLoaded && !this.state.showExpired
          ? this.state.freshShows.map((item, index) => (
              <div key={index}>
                {" "}
                <div>{moment(Date.parse(item.startTime)).format("HHMM")}</div>
                {item.content.title.fi || item.content.title.sv}
                <hr />
              </div>
            ))
          : null}
      </div>
    );
  }
}
