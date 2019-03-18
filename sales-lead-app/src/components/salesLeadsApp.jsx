import React, { Component } from "react";
import JobCardList from "./jobCardList";

class SalesLeadsApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app-sales-leads" className="container">
        <div className="row">
          <div className="col-md-12">
            <JobCardList />
          </div>
        </div>
      </div>
    );
  }
}

export default SalesLeadsApp;
