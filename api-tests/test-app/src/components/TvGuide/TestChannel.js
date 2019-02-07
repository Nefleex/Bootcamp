import React, { Component } from "react";
import Program from "./Program";
import ShowNonExpired from "./ShowNonExpired";
import moment from "moment";
import "./Channel.css";

export default class TestChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showExpired: false,
      url: this.props.url,
      loadError: "",
      dateRange: [0, 1],
      currentDayShows: []
    };
  }

  formatTime = (offset1, offset2) => {
    let t1 = new Date();
    let t2 = new Date();
    t1 = moment(t1);
    t2 = moment(t2);
    t1 = t1.add(offset1, "d").format("YYYY-DD-MM");
    t2 = t2.add(offset2, "d").format("YYYY-DD-MM");
    return `startDate=${t1}&endDate=${t2}`;
  };

  // componentWillReceiveProps(props, nextProps) {
  //   this.setState({
  //     showExpired: props.isToggled,
  //     dateRange: [this.props.startDate, this.props.endDate],
  //     isLoaded: true,
  //     currentDayShows: [...this.props.data]
  //   });
  // }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // this.fetchData();
      this.setState({
        showExpired: this.props.isToggled,
        dateRange: [this.props.startDate, this.props.endDate],
        isLoaded: true,
        currentDayShows: [...this.props.data]
      });
    }
  }

  // parseCurrentDayShows = (offset1, offset2) => {
  //   console.log("Mapping");
  //   let d1 = new Date();
  //   let d = new Date();
  //   d1 = moment(d1)
  //     .add(offset2, "d")
  //     .format("YYYYDDMM");
  //   d = moment(d)
  //     .add(offset1, "d")
  //     .format("YYYYDDMM");
  //   d1 = `${d1}040000`;
  //   d = `${d}060000`;
  //   if (this.state.currentDayShows !== [])
  //     this.setState({ currentDayShows: [] });
  //   this.state.allShows.map(item => {
  //     let time = moment(item.startTime).format("YYYYDDMMHHMMSS");

  //     if (time >= d && time <= d1) {
  //       this.setState({
  //         currentDayShows: [...this.state.currentDayShows, item]
  //       });
  //     }
  //   });
  // };

  // fetchData = () => {
  //   console.log("Fetching");
  //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
  //   this.setState({
  //     url: `${this.props.url}`,
  //     isLoaded: false,
  //     freshShows: []
  //   });
  //   // Excluding past broadcasts.
  //   fetch(this.state.url)
  //     .then(response => response.json())
  //     .then(contents => this.setState({ allShows: contents, isLoaded: true }))
  //     .then(() =>
  //       this.parseCurrentDayShows(
  //         this.state.dateRange[0],
  //         this.state.dateRange[1]
  //       )
  //     )
  //     .catch(err => console.log(err));
  // };

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.url !== prevProps.url) {
  //     this.fetchData(this.props.url);
  //   }
  // }

  componentDidMount() {
    // this.fetchData();
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
              ? // && this.state.showExpired
                this.state.currentDayShows.map((item, index) => (
                  <Program key={index} channelData={item} />
                ))
              : null}
          </div>

          <ShowNonExpired
            isLoaded={this.state.isLoaded}
            showExpired={this.state.showExpired}
            currentDayShows={this.state.currentDayShows}
          />
        </div>
      </div>
    );
  }
}
