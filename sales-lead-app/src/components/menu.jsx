import React, { Component } from "react";
import axios from "axios";
import JobCardComponent from "./jobCardComponent";

class Menu extends Component {
  state = {
    endpoint: "http://192.168.99.100:5000/"
  };

  constructor(props) {
    super(props);
    this.state = props;
    // this.state.endpoint = "http://192.168.99.100:5000/";
    this.handleGetInvites = this.handleGetInvites.bind(this);
  }

  handleGetInvites() {
    axios
      .get(this.state.endpoint + "api/jobs")
      .then(response => {
        var jobsList = response.data.result;
        var jobId = null;
        // console.log(jobsList);
        for (jobId in jobsList) {
          console.log(jobsList[jobId]);
        }
      })
      .catch(error => {
        console.log("error");
      });
  }

  render() {
    return (
      <div className="container">
        <ul className="nav nav-pills nav-justified m-4" role="tablist">
          <li className="active">
            <a
              id="menu-invited-tab"
              href="#"
              onClick={() => this.props.onHandleJobsList("new")}
            >
              Invited
            </a>
          </li>
          <li className="nav-item">
            <a
              id="menu-accepted-tab"
              href="#"
              onClick={() => this.props.onHandleJobsList("accepted")}
            >
              Accepted
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
