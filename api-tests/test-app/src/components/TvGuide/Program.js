import React, { Component } from "react";
import moment from "moment";
import "./Program.css";

export default class Program extends Component {
  constructor(props) {
    super();
    this.state = {
      programData: "",
      detailsToggled: false
    };
  }

  componentWillMount() {
    this.setState({ programData: this.props.channelData });
  }

  toggleProgramDetails = () => {
    console.log(this.state.programData);
    this.setState({ detailsToggled: !this.state.detailsToggled });
  };

  render() {
    return (
      <React.Fragment>
        <div className="main" onClick={this.toggleProgramDetails}>
          <div>
            {moment(Date.parse(this.state.programData.startTime)).format(
              "HH.mm"
            )}
          </div>
          <div>
            {this.state.programData.content.title.fi ||
              this.state.programData.content.title.sv}
            <br />
          </div>
        </div>
        <div className="details">
          {this.state.detailsToggled
            ? this.state.programData.content.description.fi ||
              this.state.programData.content.description.sv
            : null}
        </div>
      </React.Fragment>
    );
  }
}
