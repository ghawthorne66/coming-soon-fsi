import React, {Component} from 'react';
import Countdown from "./Countdown"
import Subscribe from "./Subscribe"
import Logo from "./Logo"
import Title from "./Title"
import Description from "./Description"
import Links from "./Links"

import logo from "../images/gear.svg"
import check from "../images/check-mark.svg"
import exclamation from "../images/exclamation.svg"
import xmark from "../images/x-mark.svg"
import facebook from "../images/fbookicon.svg"
import instagram from "../images/instaicon.svg"
import youtube from "../images/youtubeicon.svg"
import twitter from "../images/twittericon.svg"

import '../styles/ComingSoon.css';

class ComingSoon extends Component {
  state = {
    countdown: {
      countdownDate: "2020-12-30 00:00:00"
    },
    logo: {
      alt: "Spinning Gear",
      src: logo,
      spinSpeed: "slow"
    },
    title: {
      text: "Coming Soon!"
    },
    description: {
      text: "The platform will be up and running shortly. Please subscribe to our newsletter below to receive updates when new course material is available."
    },
    subscribe: {
      placeholder: "Enter Email Address",
      buttonText: "Submit"
    },
    links: [
      {
        url: "https://www.facebook.com",
        logo: facebook,
        text: "Join"
      },
      {
        url: "https://www.instagram.com",
        logo: instagram,
        text: "Follow"
      },
      {
        url: "https://www.youtube.com",
        logo: youtube,
        text: "Watch"
      },
      {
        url: "https://www.twitter.com",
        logo: twitter,
        text: "Tweet"
      }
    ],
    notification: {
      src: "",
      alt: "",
      message: "",
      level: "",
      visible: false

    }
  }

  configureNotification = level => {
    const notification = { ...this.state.notification };
    notification.level = level;
    if (level === "success") {
      notification.src = check;
      notification.alt = "Check Mark";
      notification.message = `Thank you for subscribing to our mailing list.
                        You will be receiving a welcome email shortly.`;
    } else if (level === "warning") {
      notification.src = exclamation;
      notification.alt = "Exclamation Point";
      notification.message = `The email you entered is already on our mailing list.
                        Thank you for joining the community.`;
    } else {
      notification.src = xmark;
      notification.alt = "X Mark";
      notification.message = `There was an issue with your email submission.
                        Please check your email and try again.`;
    }
    this.setState({ notification });
  };

  showNotification = () => {
    const notification = { ...this.state.notification };
    notification.visible = true;
    this.setState({ notification }, () => {
      setTimeout(() => {
        notification.visible = false;
        this.setState({ notification });
      }, 3000);
    });
  };

  changeLogoSpeed = () => {
    const logo = { ...this.state.logo };
    logo.spinSpeed = "fast";
    this.setState({ logo }, () => {
      setTimeout(() => {
        logo.spinSpeed = "slow";
        this.setState({ logo });
      }, 1000);
    });
  };

  render() {
    const {
      countdown,
      logo,
      title,
      description,
      subscribe,
      links,
      notification
    } = this.state;
  return (
    <div className="background">
      <Countdown countdownDate={countdown.countdownDate} />
      <Logo
        alt={logo.alt}
        src={logo.src}
        spinSpeed={logo.spinSpeed}/>
      <Title text={title.text} />
      <Description
        text={description.text}
        src={notification.src}
        alt={notification.alt}
        message={notification.message}
        level={notification.level}
        visible={notification.visible}
      />
      <Subscribe
        placeholder={subscribe.placeholder}
        buttonText={subscribe.buttonText}
        changeLogoSpeed={this.changeLogoSpeed}
        configureNotification={this.configureNotification}
        showNotification={this.showNotification}
      />
      <Links links={links}/>
    </div>
  )};
}

export default ComingSoon;
