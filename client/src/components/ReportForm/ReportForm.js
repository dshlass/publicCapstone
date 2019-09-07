import React from "react";
import { FieldArray, reduxForm } from "redux-form";
import Section from "./Section";
import SectionNotes from "./SectionNotes";
import SectionPhotos from "./SectionPhotos";

class FieldArraysForm extends React.Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      projectNumber,
      location,
      contractors,
      reportNumber,
      weather,
      time,
      date,
      projectName
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className='main-wrapper'>
        <h1>Site Visit Report #{reportNumber}</h1>
        <table className="report__table">
          <tbody>
            <tr>
              <td className="report__label">Project:</td>
              <td className='report__label-info'>{projectName}</td>
            </tr>
            <tr>
              <td className="report__label">Location:</td>
              <td className='report__label-info'>{location}</td>
            </tr>
            <tr>
              <td className="report__label">Date:</td>
              <td className='report__label-info'>{date}</td>
            </tr>
            <tr>
              <td className="report__label">Time:</td>
              <td className='report__label-info'>{time}</td>
            </tr>
            <tr>
              <td className="report__label">Weather:</td>
              <td className='report__label-info'>{weather}</td>
            </tr>
            <tr>
              <td className="report__label">File Number:</td>
              <td className='report__label-info'>{projectNumber}</td>
            </tr>
            <tr>
              <td className="report__label">Contractors:</td>
              <td className='report__label-info'>{contractors.join(", ")}</td>
            </tr>
          </tbody>
        </table>

        <div className="input__section">
          <h2>Purpose of Review</h2>
          <FieldArray name="purposeOfReview" component={SectionNotes} />
        </div>

        <div className="input__section">
          <h2>Deficiencies Noted</h2>
          <FieldArray name="deficienciesNoted" component={SectionNotes} />
        </div>

        <div className="input__section">
          <h2>Work Underway/Completed</h2>
          <FieldArray name="workCompleted" component={Section} />
        </div>

        <div className="input__section">
          <h2>Miscellaneous Notes</h2>
          <FieldArray name="miscellaneousNotes" component={SectionNotes} />
        </div>
        <div className="input__section">
          <h2>Photos</h2>
          <FieldArray name="picture" component={SectionPhotos} />
        </div>

         <section className="report__signature">
          <p className="report__label-info signature-title">Should you have any questions, please contact the undersigned.</p>
          <p className="report__label-info signature-built-by">Site Assistant Built By:</p>
          <p className="report__label-info signature-text">Dale Shlass, EIT</p>
          <p className="report__label-info signature-text">Web Developer</p> 
          <p className='report__link signature-text' href='tel:+14169187713'>416-918-7713</p> 
          <p className='report__link signature-text' href='mailto:dale@shlass.com'>dale@shlass.com</p>
          </section>

        <div className='input__submit-wrapper'>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            className='input__clear'
          >
            Clear Report
          </button>
          <button className='input__submit' type="submit" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "fieldArrays" // a unique identifier for this form
})(FieldArraysForm);
