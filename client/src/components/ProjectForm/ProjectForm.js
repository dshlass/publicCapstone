import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import ProjectInfo from "./ProjectInfo";
import SectionNotes from "./SectionNotes";
import SectionEmails from "./SectionEmails";
import Navigation from "../Navigation";

class ProjectForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting, match } = this.props;

    return (
      <>
        <Navigation
          title={"New Project"}
          match={match}
          linkTo={`/${match.params.year}`}
        />
      <div className='main-wrapper'>
        <form onSubmit={handleSubmit}>
          <div className="input__section">
            <h2>Project Name</h2>
            <Field name="projectName" component={ProjectInfo} />
          </div>

          <div className="input__section">
            <h2>Location</h2>
            <Field name="location" component={ProjectInfo} />
          </div>

          <div className="input__section">
            <h2>Contractors</h2>
            <FieldArray name="contractors" component={SectionNotes} />
          </div>
          <div className="input__section">
            <h2>Recipients</h2>
            <FieldArray name="recipients" component={SectionEmails} />
          </div>

          <div className='input__submit-wrapper'>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            className='input__clear'
          >
            Clear Project
          </button>
          <button className='input__submit' type="submit" disabled={submitting}>
            Submit
          </button>
          </div>
        </form>
      </div>
      </>
    );
  }
}

export default reduxForm({
  form: "projectForm" // a unique identifier for this form
})(ProjectForm);
