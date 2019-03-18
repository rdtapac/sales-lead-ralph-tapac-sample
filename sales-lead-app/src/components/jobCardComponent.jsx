import React, { Component } from "react";

// id={index}
// contact_name={cardElem.contact_name}
// category={cardElem.category}
// address={cardElem.address}
// created_at={cardElem.created_at}
// desc={cardElem.desc}
// price={cardElem.price}

class JobCardComponent extends Component {
  state = {
    // idx: this.props.job_id
  };

  constructor(props) {
    super();
    this.state = props;
    this.HandleSubmit = this.handleSubmitResponse.bind(this);
  }

  handleSubmitResponse = inlineParams => {
    console.log(inlineParams);
    alert("submit response");
    // this.setState({ card_name: 1 })
  };

  // handleSubmitResponse() {
  //   alert("submit response");
  //   // this.setState({ card_name: 1 })
  // }

  render() {
    return (
      <div>
        <div className="card m-3" id="card-elem-{this.state.card_elem.id}">
          <div className="card-body row">
            <div className="card-title m-3">
              <div className="font-weight-bold mb-md-1">
                {this.state.card_elem.contact_name}
              </div>
              <div>{this.state.card_elem.created_at}</div>
            </div>
            <div className="card-text container m-3">
              <div className="row mb-md-4">
                {this.state.card_elem.address} | {this.state.card_elem.category}{" "}
                | Job ID: {this.state.card_elem.job_id}
              </div>
              <div className="row mb-md-4">{this.state.card_elem.desc}</div>
              <div className="row mb-md-2">
                <div className="card-elem-footer">
                  <a
                    href="#"
                    className="btn btn-primary m-2"
                    onClick={() =>
                      this.props.onJobResponse(this.state.job_id, "accept")
                    }
                  >
                    Accept
                  </a>
                  <a
                    href="#"
                    className="btn btn-danger btn-update"
                    onClick={() =>
                      this.props.onJobResponse(this.state.job_id, "decline")
                    }
                  >
                    Decline
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobCardComponent;
