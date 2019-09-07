import React from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Population from "../Population";
import Loader from '../Loader/Loader'
import AddButton from '../AddButton/AddButton'

class Projects extends React.Component {
  state = {
    isLoaded: false,
    toggle: false
  };
  
  onToggle = (event) => {
    const {toggle} = this.state
    this.setState({toggle: !toggle})
  };

  componentDidMount() {
    axios
      .get(`${this.props.processUrl}${this.props.match.params.year}`)
      .then(response => {
        const { data } = response;
        this.setState({ projectReports: data, isLoaded: true });
      })
      .catch(error => {
        this.setState({ isLoaded: true });
        console.log(error);
      });
  }

  render() {
    const { projectReports, isLoaded, toggle } = this.state;
    const { match } = this.props;
    
     if (!sessionStorage.getItem('login')) {
      window.location = '/';
    }
    
    else if (!isLoaded) {
      return <Loader loaderTitle={'Projects'} match={match}/>;
    }
    return (
      <>
        <Navigation title={"Projects"} match={match} linkTo={"/"} onToggle={this.onToggle} toggle={toggle}/>
        {!projectReports ? (
          <h1>No projects exist!</h1>
        ) : ( (!toggle) ? (
        <>
          <div className='population__header'>
            <p className="population__label">Project Number</p>
            <p className="population__label">Reports</p>
          </div>
            {projectReports.map((project, index) => (
              <Population
                key={new Date() + index}
                year={project.projectNumber}
                title={"Number of Reports"}
                number={project.numReports}
                linkTo={`/${match.params.year}/${project.projectNumber}`}
              />
            ))}
          </>
          ) : (
            <>
              <div className='population__header'>
                <p className="population__label">Project Name</p>
                <p className="population__label">Reports</p>
              </div>
              {projectReports.map((project, index) => (
                <Population
                  key={new Date() + index}
                  year={project.projectName}
                  title={"Number of Reports"}
                  number={project.numReports}
                  linkTo={`/${match.params.year}/${project.projectNumber}`}
                />
              )) }
              </>
              )
        )}
        <AddButton className='creation' link={`/${match.params.year}/add`}/>
      </>
    );
  }
}

export default Projects;



// const withTernary = ({conditionA, conditionB}) => (
//   (!conditionA)
//     ? valueC
//     : (conditionB)
//     ? valueA
//     : valueB
// );