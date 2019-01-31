import React, { Component } from "react";
import Program from "./Program";
import "./Channel.css";

export default class TestChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showExpired: false,
      allShows: "",
      freshShows: [],
      url: this.props.url,
      loadError: ""
    };
  }

  componentWillReceiveProps(props, nextProps) {
    this.setState({ showExpired: props.isToggled });
    if (nextProps.url !== this.props.url) {
      // this.setState({ url: props.url });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.fetchData();
    }
  }
  fetchData = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    this.setState({
      url: `${this.props.url}`,
      isLoaded: false,
      freshShows: []
    });
    // Excluding past broadcasts.
    fetch(this.state.url)
      .then(response => response.json())
      .then(contents => this.setState({ allShows: contents, isLoaded: true }))

      //   .then(() => {
      //     this.state.allShows.map(item =>
      //       Date.parse(item.endTime) > Date.parse(new Date())
      //         ? this.setState({
      //             freshShows: [...this.state.freshShows, item]
      //           })
      //         : null
      //     );
      //   })
      .catch(err => console.log(err));
  };

  //   formatTime = (offset1, offset2) => {
  //     let t = new Date();
  //     let t1 = new Date();
  //     t = moment(t);
  //     t1 = moment(t1);
  //     if (offset1 >= -1) {
  //       return `starttime=${t.format("YYYY")}-${t.format("MM")}-${t
  //         .add(`${offset1}`, "d")
  //         .format("DD")}T06%3A00%3A00.000%2B0200&endtime=${t.format(
  //         "YYYY"
  //       )}-${t.format("MM")}-${t1
  //         .add(`${offset2}`, "d")
  //         .format("DD")}T06%3A00%3A00.000%2B0200&`;
  //     }
  //   };

  /* 

  Promise.all([
      fetch(
        `${proxyurl}https://external.api.yle.fi/v1/programs/schedules.json?${
          process.env.REACT_APP_API_KEY
        }&service=yle-tv1&starttime=2019-01-24T12%3A00%3A00.000%2B0200&endtime=2019-01-25T14%3A00%3A00.000%2B0200`
      ),
      fetch(
        `${proxyurl}https://external.api.yle.fi/v1/programs/schedules.json?${
          process.env.REACT_APP_API_KEY
        }&service=yle-tv1&starttime=2019-01-25T12%3A00%3A00.000%2B0200&endtime=2019-01-26T14%3A00%3A00.000%2B0200`
      )
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          allShows: [...this.state.allShows, ...data1.data, ...data2.data],
          isLoaded: true
        })
      )
      // .then(() => {
      //   this.state.allShows.map(item =>
      //     Date.parse(item.endTime) > Date.parse(new Date())
      //       ? this.setState({
      //           freshShows: [...this.state.freshShows, item]
      //         })
      //       : null
      //   );
      // })
      .catch(err => console.log(err));
  };

  */

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
            {this.state.isLoaded
              ? // && this.state.showExpired
                this.state.allShows.map((item, index) => (
                  <Program key={index} channelData={item} />
                ))
              : null}
          </div>

          {/* {this.state.isLoaded && !this.state.showExpired
            ? this.state.freshShows.map((item, index) => (
                <Program key={index} channelData={item} />
              ))
            : null} */}
        </div>
      </div>
    );
  }
}
