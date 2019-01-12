import React, { Component } from "react";
import Channel from "./components/Channel";
import "./App.css";
import moment from "moment";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      apiData: "",
      yle1data: "",
      yle2data: "",
      privateApiKey: process.env.REACT_APP_API_KEY
    };
  }
  // TO-DO:
  // Button to hide expired programs
  // Styling
  // Fix hard-coded time offset

  componentDidMount() {
    const date = moment(new Date());
    const now = date.format("YYYY-MM-DDTHH:mm:ss.[0200]");
    console.log("Date " + now);

    const yle1Url = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena \
    &mediaobject=video&starttime=${now}&limit=5&${this.state.privateApiKey}`;
    // const yle2Url = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2 \
    // &limit=20&${this.state.privateApiKey}`;
    // const areenaUrl = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena \
    // &mediaobject=video&limit=20&${this.state.privateApiKey}`;
    // const urlForAllChannels = `https://external.api.yle.fi/v1/programs/services.json?type=tvchannel&${
    //   this.state.privateApiKey
    // }`
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    // fetch(proxyurl + areenaUrl) // work around for CORS problem.
    //   .then(response => response.json())
    //   .then(contents => this.setState({ apiData: contents }))
    //   .then(() => console.log(this.state.apiData))
    //   .catch(err =>
    //     console.log(
    //       "Can’t access " +
    //         areenaUrl +
    //         " response. Blocked by browser?.\n" +
    //         err
    //     )
    //   );

    fetch(proxyurl + yle1Url)
      .then(response => response.json())
      .then(contents => this.setState({ yle1data: contents, isLoaded: true }))
      .then(() => console.log(this.state.yle1data))
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
    const date = moment(new Date());
    const now = date.format("YYYY-MM-DDTHH:mm:ss.[0200]");
    return (
      <div className="App">
        {
          <Channel
            title={"YLE1"}
            url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1 \
              &starttime=${now}&limit=5&`}
          />
        }
        <Channel
          title={"YLE2"}
          url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2&starttime=${now}&limit=5&`}
        />
        <Channel
          title={"YLE AREENA"}
          url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena \
            &starttime=${now}&limit=5&`}
        />
        <Channel
          title={"YLE TEEMA"}
          url={`https://external.api.yle.fi/v1/programs/schedules.json?service=yle-teema-fem \
            &starttime=${now}&limit=5&`}
        />
      </div>
    );
  }
}

export default App;
