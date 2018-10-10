import React, { Component } from "react";

import axios from "axios";

class Form extends Component {
  state = {
    sellerId: "YOUR_ID",
    publishableKey: "YOUR_KEY",
    ccNo: "",
    expMonth: "",
    expYear: "",
    cvv: "",

    name: "",
    addrLine1: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    email: "",
    phoneNumber: "",
    response: ""
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = () => {
    this.setState({
      response: ""
    });

    var payWithCard = data => {
      let token = data.response.token.token;
      let address = {
        name: this.state.name,
        addrLine1: this.state.addrLine1,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode,
        country: this.state.country,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber
      };

      let paymentInfo = {
        token,
        address
      };

      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json"
      };

      axios
        .post("http://127.0.0.1:8000/api/payment/pay", paymentInfo, {
          headers: headers
        })
        .then(res => {
          this.setState({
            response: res.data.message
          });
        })
        .catch(err => {
          this.setState({
            response: err.response.data.message
          });
        });
    };

    var error = error => {
      this.setState({
        response: error
      });
    };

    window.TCO.loadPubKey("sandbox", () => {
      window.TCO.requestToken(payWithCard, error, "tcoCCForm");
    });
  };

  render() {
    return (
      <form id="tcoCCForm">
        <input name="sellerId" type="hidden" value={this.state.sellerId} />
        <input
          name="publishableKey"
          type="hidden"
          value={this.state.publishableKey}
        />
        <div>
          <label>
            <span>Card Number</span>
            <input
              id="ccNo"
              type="text"
              value={this.state.ccNo}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Expiration Date (MM/YYYY)</span>
            <input
              id="expMonth"
              type="text"
              size="2"
              value={this.state.expMonth}
              required
              onChange={this.onChange}
            />
          </label>
          <span> / </span>
          <input
            id="expYear"
            type="text"
            size="4"
            value={this.state.expYear}
            required
            onChange={this.onChange}
          />
        </div>

        <div>
          <label>
            <span>CVC</span>
            <input
              id="cvv"
              type="text"
              value={this.state.cvv}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Name</span>
            <input
              id="name"
              type="text"
              value={this.state.name}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Address</span>
            <input
              id="addrLine1"
              type="text"
              value={this.state.addrLine1}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>

        <div>
          <label>
            <span>City</span>
            <input
              id="city"
              type="text"
              value={this.state.city}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>

        <div>
          <label>
            <span>State</span>
            <input
              id="state"
              type="text"
              value={this.state.state}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Zip Code</span>
            <input
              id="zipCode"
              type="text"
              value={this.state.zipCode}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Email</span>
            <input
              id="email"
              type="text"
              value={this.state.email}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Number</span>
            <input
              id="phoneNumber"
              type="text"
              value={this.state.phoneNumber}
              autocomplete="off"
              required
              onChange={this.onChange}
            />
          </label>
        </div>

        <p>{this.state.response}</p>

        <button type="button" onClick={this.onSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
