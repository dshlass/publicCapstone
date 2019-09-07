import React from "react";
import Navigation from '../Navigation';

class LoaderReportView extends React.Component {
  render() {
    const {loaderTitle, match } = this.props;

    return (
      <>
        <Navigation
          title={loaderTitle}
          match={match}
          linkTo={`/`}
        />
        <div className='loader__container'>
          <div className="loader">   
          <span className="box"></span>   
            <span className="box"></span>  
              <div className="code"> 
                <span className='emoji' role='img' aria-label='emoji'> &#128196; </span>
              </div>    
              <span className="txt">Building Report...</span>
          </div>
        </div>
          
      </>
    );
  }
}

export default LoaderReportView;