import React from "react";

class ProjectInfo extends React.Component {
  render() {
    const { input, type } = this.props;
    return (
        <input className="input__text--project-info" required {...input} type={type} />
    );
  }
}

export default ProjectInfo;
