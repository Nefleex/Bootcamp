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
  // Store jwt and use it to auth

  toggleShows = () => {
    const btn = document.querySelector(".expired-shows");
    this.setState({ showExpired: !this.state.showExpired }, () => {
      this.state.showExpired === false
        ? (btn.textContent = "Show Expired")
        : (btn.textContent = "Hide Expired");
    });
  };

  componentDidMount() {
    const testUrl = `http://localhost:3000/api/shows?${this.formatTime(
      this.state.minDate,
      this.state.maxDate
    )}&channel=yle-tv1`;
    console.log(testUrl);

    // const urlForAllChannels = `https://external.api.yle.fi/v1/programs/services.json?type=tvchannel&$
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    // fetch(proxyurl + yle1Url)
    //   .then(response => response.json())
    //   .then(contents => this.setState({ yle1data: contents, isLoaded: true }))
    //   .then(() => console.log(this.state.yle1data))
    //   .catch(err => console.log(err));
  }
  switchDate = e => {
    if (e.target.name === "previous") {
      this.setState({
        minDate: this.state.minDate - 1,
        maxDate: this.state.maxDate - 1
      });
    } else if (e.target.name === "next") {
      this.setState({
        maxDate: this.state.maxDate + 1,
        minDate: this.state.minDate + 1
      });
    }
  };

  formatTime = (offset1, offset2) => {
    let t1 = new Date();
    let t2 = new Date();
    t1 = moment(t1);
    t2 = moment(t2);
    t1 = t1.add(offset1, "d").format("YYYY-MM-DD");
    t2 = t2.add(offset2, "d").format("YYYY-MM-DD");
    return `startDate=${t1}&endDate=${t2}`;
  };

  Btn = () => {
    if (this.state.minDate === 0) {
      return (
        <button className="expired-shows" onClick={this.toggleShows}>
          Show Expired{" "}
        </button>
      );
    }
  };

  // `https://external.api.yle.fi/v1/programs/schedules.json?${process.env.REACT_APP_API_KEY}&service=yle-tv1&starttime=2019-01-23T12%3A00%3A00.000%2B0200&endtime=2019-01-23T14%3A00%3A00.000%2B0200`

  render() {
    const yle1url = `http://localhost:3000/api/shows?${this.formatTime(
      0,
      7
    )}&channel=yle-tv1`;
    const yle2url = `http://localhost:3000/api/shows?${this.formatTime(
      0,
      7
    )}&channel=yle-tv2`;
    const yleTeemaUrl = `http://localhost:3000/api/shows?${this.formatTime(
      0,
      7
    )}&channel=yle-teema-fem`;
    const yleAreenaUrl = `http://localhost:3000/api/shows?${this.formatTime(
      0,
      7
    )}&channel=yle-areena`;

    return (
      <div className="body">
        <Banner />
        <button
          onClick={() => {
            this.props.history.push("/");
            localStorage.clear();
            sessionStorage.clear();
          }}
        >
          Logout
        </button>
        {this.Btn()}
        <input type="checkbox" name="show-expired" value="" />
        <hr />
        <PreviousButton
          minDate={this.state.minDate}
          switchDate={this.switchDate}
        />
        <NextButton minDate={this.state.minDate} switchDate={this.switchDate} />
        <div>
          {this.state.minDate} : {this.state.maxDate}
        </div>
        <hr />
        <div className="channels-main">
          <TestChannel
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Yle 1"}
            url={yle1url}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />

          <TestChannel
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Yle 2"}
            url={yle2url}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />

          <TestChannel
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Areena"}
            url={yleAreenaUrl}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />
          <TestChannel
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Teema"}
            url={yleTeemaUrl}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

function NextButton(props) {
  return props.minDate <= 5 ? (
    <button name="next" onClick={props.switchDate}>
      {" "}
      Next
    </button>
  ) : null;
}

function PreviousButton(props) {
  return props.minDate > 0 ? (
    <button name="previous" onClick={props.switchDate}>
      {" "}
      Previous
    </button>
  ) : null;
}

function ToggleExpiredButton(props) {
  let d = new Date();
  d = moment(d).format("YYYYDDMMHHMMSS");

  // return props.minDate > 0 ? (
  //   <button name="previous" onClick={props.switchDate}>
  //     {" "}
  //     Previous
  //   </button>
  // ) : null;
}

export default TvGuide;
