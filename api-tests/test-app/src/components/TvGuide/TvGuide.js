import React, { Component } from "react";
import Channel from "./Channel";
import Banner from "./Banner";
import Footer from "./Footer";
import TestChannel from "./TestChannel";
import "./TvGuide.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFeather,
  faFeatherAlt,
  faCube,
  faCubes
} from "@fortawesome/free-solid-svg-icons";

class TvGuide extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      showExpired: false,
      apiData: "",
      yle1data: "",
      yle2data: "",
      minDate: 0,
      maxDate: 1
    };
  }
  // TO-DO:
  // Styling
  // Store tv show data from api to a database to have data on stand-by,
  // fetch from said database instead of public api for faster load times???

  toggleShows = () => {
    const btn = document.querySelector(".expired-shows");
    this.setState({ showExpired: !this.state.showExpired });
    btn.textContent === "Show Expired"
      ? (btn.textContent = "Hide Expired")
      : (btn.textContent = "Show Expired");
  };

  componentDidMount() {
    const date = moment(new Date());
    const now = date.format("YYYY-MM-DDTHH:mm:ss.[0200]");
    console.log("Date " + now);

    let tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    tomorrow = moment(tomorrow);
    tomorrow = tomorrow.format("YYYY-MM-DDTHH:mm:ss.[0200]");

    console.log(tomorrow);

    let t = new Date();
    // console.log(new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59));
    t = moment(t);

    let tomor = t.add(11, "d");
    console.log(tomor.format("YYYY-DD-MM"));

    // const yle1Url = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1 \
    // &starttime=${now}&endTime=${tomorrow}${process.env.REACT_APP_API_KEY}`;
    const yle1Url = `https://external.api.yle.fi/v1/programs/schedules.json?&service=yle-tv1&starttime=${t.format(
      "YYYY"
    )}-${t.format("MM")}-${t
      .add(0, "d")
      .format("DD")}T06%3A00%3A00.000%2B0200&endtime=${t.format(
      "YYYY"
    )}-${t.format("MM")}-${t
      .add(1, "d")
      .format("DD")}T06%3A00%3A00.000%2B0200&${process.env.REACT_APP_API_KEY}`;

    const testUrl = `http://localhost:3000/api/shows?${this.formatTime(
      this.state.minDate,
      this.state.maxDate
    )}&channel=yle-tv1`;
    console.log(testUrl);

    // const urlForAllChannels = `https://external.api.yle.fi/v1/programs/services.json?type=tvchannel&$
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyurl + yle1Url)
      .then(response => response.json())
      .then(contents => this.setState({ yle1data: contents, isLoaded: true }))
      .then(() => console.log(this.state.yle1data))
      .catch(err => console.log(err));
  }
  switchDate = e => {
    if (e.target.name === "previous") {
      this.setState(
        {
          minDate: this.state.minDate - 1,
          maxDate: this.state.maxDate - 1
        },
        function() {
          console.log(this.state.minDate);
          console.log(this.state.maxDate);
        }
      );
    } else if (e.target.name === "next") {
      this.setState(
        {
          maxDate: this.state.maxDate + 1,
          minDate: this.state.minDate + 1
        },
        function() {
          console.log(this.state.minDate);
          console.log(this.state.maxDate);
        }
      );
    }
  };

  formatTime = (offset1, offset2) => {
    let t1 = new Date();
    let t2 = new Date();
    t1 = moment(t1);
    t2 = moment(t2);
    t1 = t1.add(offset1, "d").format("YYYY-DD-MM");
    t2 = t2.add(offset2, "d").format("YYYY-DD-MM");
    return `startDate=${t1}&endDate=${t2}`;
  };

  // `https://external.api.yle.fi/v1/programs/schedules.json?${process.env.REACT_APP_API_KEY}&service=yle-tv1&starttime=2019-01-23T12%3A00%3A00.000%2B0200&endtime=2019-01-23T14%3A00%3A00.000%2B0200`

  render() {
    return (
      <div className="body">
        <Banner />
        <button className="expired-shows" onClick={this.toggleShows}>
          Show Expired
        </button>
        <input type="checkbox" name="show-expired" value="" />
        <hr />
        <button name="previous" onClick={this.switchDate}>
          Previous
        </button>
        <button name="next" onClick={this.switchDate}>
          Next
        </button>
        <div>
          {this.state.minDate} : {this.state.maxDate}
        </div>
        <hr />
        <div className="channels-main">
          <TestChannel
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"TEST 1"}
            url={`http://localhost:3000/api/shows?startDate=2019-02-01&endDate=2019-02-05&channel=yle-tv1`}
            isToggled={this.state.showExpired}
          />

          {/* <Channel
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"CHANNEL 1"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?&service=yle-tv1&${this.formatTime(
              this.state.minDate,
              this.state.maxDate
            )}`}
            isToggled={this.state.showExpired}
          />

          <Channel
            titleIcon={<FontAwesomeIcon icon={faFeatherAlt} />}
            title={"CHANNEL 2"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2&${this.formatTime(
              this.state.minDate,
              this.state.maxDate
            )}`}
            isToggled={this.state.showExpired}
          />

          <Channel
            titleIcon={<FontAwesomeIcon icon={faCubes} />}
            title={"TEEMA FEM"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-teema-fem&${this.formatTime(
              this.state.minDate,
              this.state.maxDate
            )}`}
            isToggled={this.state.showExpired}
          />
          <Channel
            titleIcon={<FontAwesomeIcon icon={faCube} />}
            title={"AREENA"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena&${this.formatTime(
              this.state.minDate,
              this.state.maxDate
            )}`}
            isToggled={this.state.showExpired}
          /> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default TvGuide;
