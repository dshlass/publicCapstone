import React from "react";
import { Field } from "redux-form";
import Add from "../../assets/Icons/SVG/addbutton.png";
import Remove from "../../assets/Icons/SVG/removebutton.png";
import PhotoField from "./PhotoField";

class SectionPhotos extends React.Component {
  render() {
    const { fields } = this.props;
    return (
      <div >
        <div className="input__button-wrapper">
          <button
            type="button"
            className="input__button"
            onClick={() => fields.push()}
          >
            <img src={Add} alt="Add" className="input__add" />
          </button>
          <p>Add Photo</p>
        </div>
        {fields.map((note, index) => (
          <div key={index}>
            <ul className="input__field-wrapper--form">
              <Field name={note} type="file" component={PhotoField} placeholder={'Please upload a photo.'}/>
              <button
                type="button"
                title="Remove Photo"
                onClick={() => fields.remove(index)}
                className="input__button"
              >
                <img src={Remove} alt="Remove" className="input__remove" />
              </button>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default SectionPhotos;
