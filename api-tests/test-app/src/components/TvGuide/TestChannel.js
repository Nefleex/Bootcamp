import React, { Component } from "react";
import Program from "./Program";
import moment from "moment";
import "./Channel.css";

export default class TestChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showExpired: false,
      allShows: "",
      url: this.props.url,
      loadError: "",
      dateRange: [0, 1],
      currentDayShows: []
    };

    Date.prototype.addDays = function(days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
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

  formatTimev2 = (offset1, offset2) => {
    let t = new Date();
    let t1 = new Date();
    t = moment(t);
    t1 = moment(t1);
    if (offset1 >= -1) {
      return `starttime=${t.format("YYYY")}-${t.format("MM")}-${t
        .add(`${offset1}`, "d")
        .format("DD")}T06%3A00%3A00.000%2B0200&endtime=${t.format(
        "YYYY"
      )}-${t.format("MM")}-${t1
        .add(`${offset2}`, "d")
        .format("DD")}T06%3A00%3A00.000%2B0200&`;
    } else {
    }
  };

  componentWillReceiveProps(props, nextProps) {
    this.setState({
      showExpired: props.isToggled,
      dateRange: [props.startDate, props.endDate]
    });
    if (nextProps.url !== this.props.url) {
      this.setState({ dateRange: [props.startDate, props.endDate] });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchData();
      this.setState({
        dateRange: [this.props.startDate, this.props.endDate]
      });
    }
  }

  parseCurrentDayShows = (offset1, offset2) => {
    console.log("Mapping");
    let d1 = new Date();
    let d = new Date();
    d1 = moment(d1)
      .add(offset2, "d")
      .format("YYYYDDMM");
    d = moment(d)
      .add(offset1, "d")
      .format("YYYYDDMM");
    d1 = `${d1}060000`;
    d = `${d}060000`;
    if (this.state.currentDayShows !== [])
      this.setState({ currentDayShows: [] });
    this.state.allShows.map(item => {
      let time = moment(item.startTime).format("YYYYDDMMHHMMSS");

      if (time >= d && time <= d1) {
        this.setState({
          currentDayShows: [...this.state.currentDayShows, item]
        });
      }
    });
  };

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
      .then(() =>
        this.parseCurrentDayShows(
          this.state.dateRange[0],
          this.state.dateRange[1]
        )
      )
      .catch(err => console.log(err));

    //   .then(() => {
    //     this.state.allShows.map(item =>
    //       Date.parse(item.endTime) > Date.parse(new Date())
    //         ? this.setState({
    //             freshShows: [...this.state.freshShows, item]
    //           })
    //         : null
    //     );
    //   })
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
                this.state.currentDayShows.map((item, index) => (
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
