import React, { Component } from "react";
import Channel from "./components/Channel";
import "./App.css";

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
  // TO-DO: Hide apikey from source files
  componentDidMount() {
    const yle1Url = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1 \
    &limit=20&${this.state.privateApiKey}`;
    const yle2Url = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2 \
    &limit=20&${this.state.privateApiKey}`;
    const areenaUrl = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena \
    &mediaobject=video&limit=20&${this.state.privateApiKey}`;
    const urlForAllChannels = `https://external.api.yle.fi/v1/programs/services.json?type=tvchannel&${
      this.state.privateApiKey
    }`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyurl + areenaUrl) // work around for CORS problem.
      .then(response => response.json())
      .then(contents => this.setState({ apiData: contents }))
      .then(() => console.log(this.state.apiData))
      .catch(err =>
        console.log(
          "Can’t access " +
            areenaUrl +
            " response. Blocked by browser?.\n" +
            err
        )
      );

    fetch(proxyurl + yle1Url)
      .then(response => response.json())
      .then(contents => this.setState({ yle1data: contents, isLoaded: true }))
      .then(() => console.log(this.state.yle2data))
      .catch(err => console.log(err));

    fetch(proxyurl + urlForAllChannels)
      .then(response => response.json())
      .then(contents =>
        contents.data.map(el => {
          console.log(el);
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        {
          <Channel
            title={"YLE2"}
            url={
              "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2&limit=5&"
            }
          />
        }
        <Channel
          title={"YLE1"}
          url={
            "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1 \
            &limit=5&"
          }
        />
        <Channel
          title={"YLE AREENA"}
          url={
            "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena \
            &limit=5&"
          }
        />
        <Channel
          title={"YLE TEEMA"}
          url={
            "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-teema-fem \
            &limit=5&"
          }
        />
      </div>
    );
  }
}

export default App;
