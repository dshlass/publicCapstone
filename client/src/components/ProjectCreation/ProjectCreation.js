import React from "react";
import { Provider } from "react-redux";
import store from "../ProjectForm/store";
import ProjectForm from "../ProjectForm/ProjectForm";
import axios from "axios";

class ProjectCreation extends React.Component {
  showResults = values => {
    let body = {
      ...values,
      year: this.props.match.params.year
    };

    let toSend = JSON.stringify(body);

    axios({
      method: "post",
      url: `${this.props.processUrl}${this.props.match.params.year}`,
      headers: {
        "content-type": "application/json"
      },
      data: toSend
    })
      .then(value => console.log(value.data))
      .then(
        setTimeout(
          () => (window.location = `/${this.props.match.params.year}`),
          500
        )
      )
      .catch(error => console.log("Error: ", error));
  };

  render() {
    const { match } = this.props;
    if (!sessionStorage.getItem('login')) {
      window.location = '/';
    } else
    
    return (
      <Provider store={store}>
        <ProjectForm
          match={match}
          onSubmit={values => this.showResults(values)}
        />
      </Provider>
    );
  }
}

export default ProjectCreation;
