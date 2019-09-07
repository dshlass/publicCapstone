import React from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Population from "../Population";
import Loader from "../Loader/Loader";
import Login from "../Login/Login";

class Year extends React.Component {
  username = React.createRef();
  password = React.createRef();

  state = {
    isLoaded: false,
    wrongPassword: false
  };

  slideOutInput = {
    color: "red",
    animation: "slideOutInput 1s linear"
  };

  defaultStyle() {
    this.setState({ wrongPassword: false });
    this.username.current.value = "";
    this.password.current.value = "";
  }

  logOut = event => {
    event.preventDefault();
    sessionStorage.removeItem("login");
    window.location = "/";
  };

  verifyLogin = event => {
    event.preventDefault();

    const formData = {
      username: this.username.current.value,
      password: this.password.current.value
    };

    axios
      .post(`${this.props.processUrl}`, formData, {
        headers: {
          "content-type": "application/json"
        }
      })
      .then(res => {
        if (res.data.login === true) {
          this.setState({ login: res.data.login });
          sessionStorage.setItem("login", res.data.login);
        } else {
          this.setState({ login: false, wrongPassword: true });

          window.setTimeout(() => this.defaultStyle(), 1000);
        }
      });
  };

  getYears = () => {
    axios
      .get(this.props.processUrl)
      .then(response => {
        const { data } = response;
        this.setState({ projectYears: data, isLoaded: true });
      })
      .catch(error => {
        this.setState({ isLoaded: true });
        console.log(error);
      });
  };

  componentDidMount() {
    this.getYears();
    let test = sessionStorage.getItem("login");
    if (test) {
      this.setState({ login: true });
    }
  }

  render() {
    const { projectYears, isLoaded, login, wrongPassword } = this.state;
    const { match } = this.props;

    if (!login) {
      return (
        <Login
          slideOutInput={wrongPassword ? this.slideOutInput : null}
          verifyLogin={this.verifyLogin}
          username={this.username}
          password={this.password}
        />
      );
    }
    if (!isLoaded) {
      return <Loader loaderTitle={"Overview"} match={match} />;
    }
    if (!projectYears.toString()) {
      let date = new Date();
      setTimeout(() => (window.location = `/${date.getFullYear()}/add`), 2000);
    }
    return (
      <>
        <Navigation title={"Overview"} match={match} logOut={this.logOut} />
        {!projectYears.toString() ? (
          <h1 className="loader__title-sub">
            Redirecting you to the project creation page...
          </h1>
        ) : (
          <>
            <div className="population__header">
              <p className="population__label">Year</p>
              <p className="population__label">Projects</p>
            </div>
            {projectYears.map((project, index) => (
              <Population
                key={new Date() + index}
                year={project.year}
                title={"Number of Projects"}
                number={project.numProjects}
                linkTo={`/${project.year}`}
              />
            ))}
          </>
        )}
      </>
    );
  }
}

export default Year;
