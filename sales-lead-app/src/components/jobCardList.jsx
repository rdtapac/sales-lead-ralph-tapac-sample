import React, { Component } from "react";
import axios from "axios";
import JobCardComponent from "./jobCardComponent";

import Menu from "./menu";

class JobCardList extends Component {
  state = {
    filter: "new",
    jobsList: [],
    endpoint: "http://192.168.99.100:5000/api/"
  };

  constructor() {
    super();
    this.handleJobsList = this.handleJobsList.bind(this);
    this.handleGenerateCardItems = this.handleGenerateCardItems.bind(this);
    this.handleJobResponse = this.handleJobResponse.bind(this);
  }

  handleJobsList(filter) {
    var target_endpoint = this.state.endpoint + "jobs/" + filter;
    axios.get(target_endpoint).then(res => {
      var jobListUpdatedVals = [];
      if (res.data.message == "success") {
        jobListUpdatedVals = res.data.result;
      }
      this.setState({ jobsList: jobListUpdatedVals, filter: filter });
    });
  }

  onUpdateCardsList() {
    //create ajax request (base call on filter state?)
    console.log("update cards list");
    // this.setState( cardList: data with removed id fromm cardsList)
  }

  handleJobResponse(job_id, job_response) {
    // alert(job_id);
    // alert(job_response);
    var target_endpoint = this.state.endpoint + "job/" + job_id;
    const postParam = {
      status: job_response
    };

    axios.put(target_endpoint, { postParam }).then(res => {
      alert("job has been updated");
      // var jobListUpdatedVals = [];
      // if (res.data.message == "success") {
      //   jobListUpdatedVals = res.data.result;
      // }
      // this.setState({ jobsList: jobListUpdatedVals, filter: filter });
    });
  }

  handleGenerateCardItems() {
    if (this.state.jobsList.length == 0) {
      return (
        <div>
          There are no jobs listed yet. Click the Invite or Accepted links from
          the menu above if the page is loaded first time.
        </div>
      );
    }

    return this.state.jobsList.map((jobsElem, index) => {
      var generateCardId = "div-job-card-" + index;
      return (
        <JobCardComponent
          key={generateCardId}
          job_id={jobsElem.job_id}
          card_elem={jobsElem}
          onUpdateCardsList={this.onUpdateCardsList}
          onJobResponse={this.handleJobResponse}
        />
      );
    });
  }

  render() {
    //this.getUsers();

    return (
      <div className="container">
        <div className="col-md-12">
          <Menu onHandleJobsList={this.handleJobsList} />
        </div>
        <div className="row col-md-12">
          <div id="div-card-list">{this.handleGenerateCardItems()}</div>
        </div>
      </div>
    );
  }
}

export default JobCardList;
