import React from "react";
import { Field, FieldArray } from "redux-form";
import TextField from "./TextField";
import SectionNotes from "./SectionNotes";
import Add from "../../assets/Icons/SVG/addbutton.png";
import Remove from "../../assets/Icons/SVG/removebutton.png";

class Section extends React.Component {

  //inline style to separate section title from the section notes
  subtitle = {
    fontWeight: '600',
    textTransform: 'capitalize'
  }

  render() {
    const { fields } = this.props;
    return (
      <>
      <ol>
        {fields.map((section, index) => (
          <div key={index}>
            <div className="input__field-wrapper--form">
              <Field
                name={`${section}.title`}
                type="text"
                component={TextField}
                add={this.subtitle}
              />
              <button
                type="button"
                title="Remove section"
                onClick={() => fields.remove(index)}
                className="input__button-field"
              >
                <img src={Remove} alt="Remove" className="input__remove" />
              </button>
            </div>
            <FieldArray name={`${section}.notes`} component={SectionNotes} />
          </div>
        ))}
      </ol>
              <div className="input__button-wrapper--completed">
          <button
            type="button"
            className="input__button"
            onClick={() => fields.push()}
          >
            <img src={Add} alt="Add" className="input__add" />
          </button>
          <p>Add Section Title</p>
        </div>
        </>
    );
  }
}

export default Section;
