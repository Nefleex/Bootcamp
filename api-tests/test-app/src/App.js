import React, { Component } from "react";
import Channel from "./components/Channel";
import "./App.css";
import moment from "moment";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      showExpired: false,
      apiData: "",
      yle1data: "",
      yle2data: ""
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

    const yle1Url = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1 \
    &starttime=${now}&${process.env.REACT_APP_API_KEY}`;
    //
    // const urlForAllChannels = `https://external.api.yle.fi/v1/programs/services.json?type=tvchannel&${
    //   this.state.privateApiKey
    // }`
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyurl + yle1Url)
      .then(response => response.json())
      .then(contents => this.setState({ yle1data: contents, isLoaded: true }))
      // .then(() => console.log(this.state.yle1data))
      .catch(err => console.log(err));

    // fetch(proxyurl + urlForAllChannels)
    //   .then(response => response.json())
    //   .then(contents =>
    //     contents.data.map(el => {
    //       console.log(el);
    //     })
    //   )
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <button className="expired-shows" onClick={this.toggleShows}>
          Show Expired
        </button>
        <input type="checkbox" name="show-expired" value="" />
        <hr />
        <div className="channels">
          {/* <Channel
            title={"YLE1 ALL"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1 \
              &starttime=${now}&limit=5&`}
          /> */}
          <Channel
            title={"YLE1"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1&`}
            isToggled={this.state.showExpired}
          />

          <Channel
            title={"YLE2"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2&`}
            isToggled={this.state.showExpired}
          />
          <Channel
            title={"YLE AREENA"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena&`}
            isToggled={this.state.showExpired}
          />
          <Channel
            title={"YLE TEEMA"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-teema-fem&`}
            isToggled={this.state.showExpired}
          />
        </div>
      </div>
    );
  }
}

export default App;
