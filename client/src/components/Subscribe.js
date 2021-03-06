import React, { useState } from "react";
import PropTypes from "prop-types";

import "../styles/Subscribe.css";

const Subscribe = ({
  placeholder,
  buttonText,
  configureNotification,
  showNotification,
  changeLogoSpeed
}) => {
  const [state, setState] = useState({
    email: ""
  });

  const handleChange = e => {
    setState({ email: e.target.value.trim() });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (state.email) {
      fetch(`/api/memberAdd?email=${state.email}`)
        .then(res => res.json())
        .then(json => {
          if (json.status === "subscribed") {
            configureNotification("success");
          } else if (json.title === "Member Exists") {
            configureNotification("warning");
          } else {
            configureNotification("danger");
          }
          showNotification();
        })
        .catch(err => {
          console.log("error", err);
        });

      changeLogoSpeed();

      setState({ email: "" });
    }
  };

  return (
    <form className="subscribe" onSubmit={handleSubmit}>
      <input
        className="subscribe-email"
        aria-label="Enter Email Address"
        name="email"
        type="email"
        placeholder={placeholder}
        onChange={handleChange}
        value={state.email}
      />
      <button className="subscribe-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
};

Subscribe.propTypes = {
  placeholder: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  configureNotification: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  changeLogoSpeed: PropTypes.func.isRequired
};

export default Subscribe;
