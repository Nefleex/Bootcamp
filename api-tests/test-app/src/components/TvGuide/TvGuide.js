import React, { Component, Fragment } from "react";
import Channel from "./Channel";
import Banner from "./Banner";
import Footer from "./Footer";
import TestChannel from "./TestChannel";
import ChannelContainer from "./ChannelContainer";
import "./TvGuide.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFeather,
  faFeatherAlt,
  faCube,
  faCubes
} from "@fortawesome/free-solid-svg-icons";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons/";
import { IconButton, Button } from "@material-ui/core";

export default class TvGuide extends Component {
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

  displayDate = offset => {
    let today = new Date();
    today = moment(today);
    today = today.add(offset, "d").format("DD.MM.YYYY");
    return <p style={{ display: "inline" }}>{today}</p>;
  };

  Btn = () => {
    if (this.state.minDate === 0) {
      return (
        <button
          className="expired-shows util-button"
          onClick={this.toggleShows}
        >
          Show Expired
        </button>
      );
    } else {
      return (
        <button
          className="expired-shows util-button"
          style={{ visibility: "hidden" }}
        >
          Show Expired
        </button>
      );
    }
  };

  logout = () => {
    this.props.history.push("/");
    localStorage.clear();
    sessionStorage.clear();
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
        <div className="header" />
        <hr />
        <div className="date-select-container">
          <div className="date-select-sub">
            <div className="date-select-unit-left">
              <PreviousButton
                minDate={this.state.minDate}
                switchDate={this.switchDate}
              />

              {this.displayDate(this.state.minDate)}
              <NextButton
                minDate={this.state.minDate}
                switchDate={this.switchDate}
              />
            </div>

            <div className="date-select-unit-right">{this.Btn()}</div>
          </div>
          <button className="button-logout" onClick={this.logout}>
            Logout
          </button>
        </div>
        <hr />
        <div className="channels-main">
          <ChannelContainer
            url={yle1url}
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"TEST"}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />

          <ChannelContainer
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Yle 2"}
            url={yle2url}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />

          <ChannelContainer
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Areena"}
            url={yleAreenaUrl}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />
          <ChannelContainer
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
      &gt;
    </button>
  ) : (
    <button disabled>&gt;</button>
  );
}

function PreviousButton(props) {
  return props.minDate > 0 ? (
    <button name="previous" onClick={props.switchDate}>
      &lt;
    </button>
  ) : (
    <button disabled>&lt;</button>
  );
}
