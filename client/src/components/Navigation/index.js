import React from "react";
import { Link } from "react-router-dom";
import Back from "../../assets/Icons/SVG/chevron.png";

class Navigation extends React.Component {

  //function on logout to remove the session storage that will log you out
  viewController = props => {
    if (props.match.url === "/") {
      return (
        <Link className="navigation__menu" to={'/'} onClick={props.logOut}>
          <img className="navigation__back-icon" src={Back} alt="back button" />
        </Link>
      );
    } else {
      return (
        <Link to={this.props.linkTo} className="navigation__menu">
          <img className="navigation__back-icon" src={Back} alt="back button" />
        </Link>   
      );
    }
  };
  
  toggleLabel(input) {
  if (!input) return 'Project Name'
    else return 'Project Number'
  }

  render() {

  return (
    <nav className="navigation">
      {this.viewController(this.props)}  
      {(this.props.match.url === '/2019') ? 
      <>
        <p className="navigation__title">{this.props.title}</p>
        <div className='navigation__flex'>
        <button className='navigation__toggle' onClick={this.props.onToggle}><p>Toggle</p> { this.toggleLabel(this.props.toggle)}</button>
        </div>
      </> : <p className="navigation__title">{this.props.title}</p>}  
    </nav>
    );
  }
}

export default Navigation;
