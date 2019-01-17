import React, { Component } from "react";
import moment from "moment";

export default class Program extends Component {
  constructor(props) {
    super();
    this.state = {
      shows: ""
    };
  }

  componentWillReceiveProps() {
    this.setState({ shows: this.props.channelData });
  }

  // componentWillMount() {
  //   this.setState({ shows: this.props.channelData });
  // }
  render() {
    return (
      <div>
        <div>
          {/* {this.state.shows.map((item, index) => (
            <React.Fragment key={index}>
              <div>{moment(Date.parse(item.startTime)).format("HHMM")} </div>
              <div key={index}>
                {item.content.title.fi || item.content.title.sv}
                <hr />
              </div>
            </React.Fragment>
          ))} */}
        </div>
      </div>
    );
  }
}
