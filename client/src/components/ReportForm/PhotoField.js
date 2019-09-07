import React, {useState} from "react";

const File_upload = ({ input, type, meta: { touched, error, warning } }) => {
  delete input.value;

  //custom hook to add the image source
  const [image, setImage] = useState(1);
  
  function handleImage(event) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }
  
  return (
    <div className='input__photo-field'>
      <li className="input__input-field">
        <input {...input} type={type} className="input__text-photo"  accept="image/*" required capture="environment" onInput={(event) => handleImage(event)}/>
        <img src={null || image} alt='Please upload...'/>
      </li>
    </div>
  );
};

export default File_upload;