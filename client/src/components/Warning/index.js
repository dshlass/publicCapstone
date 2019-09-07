import React from "react";


const Warning = ({toggle, closeWarning, target}) => {

  return(
    <div className={(toggle) ? 'modal__show' : 'modal__hidden'} >
      <div className='modal__inner' ref={target}>
        <div className='modal__text-container'>
          <p className='modal__text'>You must upload at least one photo</p>
        </div>
        <button className='modal__submit' onClick={() => closeWarning()}>Done</button>
      </div>
    </div>
  )
}

export default Warning;