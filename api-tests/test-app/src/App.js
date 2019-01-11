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
    const url = `https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena \
    &mediaobject=video&limit=100&${privateApiKey}`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyurl + url) // work around for CORS problem.
      .then(response => response.json())
      .then(contents => this.setState({ apiData: contents, isLoaded: true }))
      .then(() => console.log(this.state.apiData))
      .catch(err =>
        console.log(
          "Can’t access " + url + " response. Blocked by browser?.\n" + err
        )
      );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">TV-Guide App</header>
        <hr />
        {this.state.isLoaded ? (
          this.state.apiData.data.map((item, index) => (
            <div key={index}>
              {new Date(item.startTime).getHours() +
                2 +
                "." +
                new Date(item.startTime).getMinutes()}
              {" " + (item.content.title.fi || item.content.title.sv)} <hr />
            </div>
          ))
        ) : (
          <div>Awaiting API end point...</div>
        )}
      </div>
    );
  }
}

export default App;
