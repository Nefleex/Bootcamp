import React, { Component } from "react";
import { resolve } from "q";

export default class Channel extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      showExpired: false,
      allShows: "",
      privateApiKey: process.env.REACT_APP_API_KEY,
      freshShows: [],
      allData: null
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ showExpired: props.isToggled });
  }

  componentWillMount() {
    const url = `${this.props.url}${this.state.privateApiKey}`;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    // Excluding past broadcasts.
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(contents => this.setState({ allShows: contents, isLoaded: true }))
      .then(() => {
        this.state.allShows.data.map(item =>
          Date.parse(item.endTime) > Date.parse(new Date())
            ? this.setState({
                freshShows: this.state.freshShows.concat(item)
              })
            : null
        );
      })
      .then(x => console.log(x))
      .catch(err => console.log(err));

    // fetch(proxyurl + "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv1 \
    // &" ).then(response => response.json).then(contents => this.setState({}))
  }

  stateTester = () => {
    let { data } = this.state.allShows;
    data.map(item => {
      console.log(item.content.title.fi);
    });
    console.log(data[0].content.title.fi);
    console.log(data[0].endTime);
  };

  //   updateState = (){
  // return new Promise((resolve, reject) => {

  // })
  //   }

  // App() {
  //   return (
  //     <div className="App">
  //       {Object.entries(this.state.allShows).map(item => {
  //         item.map(el => {
  //           return <div>{el.data}</div>;
  //         });
  //       })}
  //     </div>
  //   );
  // }

  render() {
    let content = {};
    let promise = new Promise((res, rej) => {
      resolve(content);
    });
    return (
      <div>
        <button className="button" onClick={this.stateTester}>
          Click me
        </button>
        <h1>{this.props.title}</h1>
        <div>
          {!this.state.isLoaded ? <div>Loading</div> : <div>Loaded</div>}{" "}
        </div>
        <div>
          {this.state.isLoaded && this.state.showExpired
            ? this.state.allShows.data.map((item, index) => (
                <div key={index}>
                  {item.content.title.fi || item.content.title.sv}
                  <hr />
                </div>
              ))
            : null}
        </div>
        {
          /////////////////////////
        }

        {this.state.isLoaded && !this.state.showExpired
          ? this.state.freshShows.map((item, index) => (
              <div key={index}>
                {" "}
                <div>{Date.parse(item.startTime)}</div>
                {item.content.title.fi || item.content.title.sv}
                <hr />
              </div>
            ))
          : null}
      </div>
    );
  }
}
