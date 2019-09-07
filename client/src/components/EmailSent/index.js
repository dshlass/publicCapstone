import React from "react";
// import React, {useState} from "react";
import logo from '../../assets/sentemail.png'


const EmailSent = ({toggle, goBack, target}) => {

  return(
    <div className={(toggle) ? 'modal__show' : 'modal__hidden'} >
      <div className='modal__inner' ref={target}>
          <img className='modal__image' src={logo} alt='test'/>
        <div className='modal__text-container'>
          <p className='modal__text'>Email Sent</p>
        </div>
        <button className='modal__submit' onClick={(event) => goBack(event)}>Done</button>
      </div>
    </div>
  )
}

export default EmailSent;