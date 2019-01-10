import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      apiData: ""
    };
  }

  componentDidMount() {
    const privateApiKey =
      "app_id=503e2195&app_key=b38968680e164a5e8d72f821b94cd9ff";
    const url = `https://external.api.yle.fi/v1/programs/items.json?type=tvprogram&limit=20&${privateApiKey}`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyurl + url) // work around for CORS problem.
      .then(response => response.json())
      //.then(contents => console.log(contents.data))
      .then(contents => this.setState({ apiData: contents, isLoaded: true }))
      .then(x => console.log(this.state.apiData))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">TV-Guide App</header>
        {this.state.isLoaded ? (
          this.state.apiData.data.map((el, index) => (
            <div key={index}>{el.title.fi}</div>
          ))
        ) : (
          <div>Awaiting API end point...</div>
        )}
      </div>
    );
  }
}

export default App;
