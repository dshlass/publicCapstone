import React from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Population from "../Population";
// import { Link } from "react-router-dom";
import Loader from '../Loader/Loader'
import AddButton from '../AddButton/AddButton'

class Reports extends React.Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    axios
      .get(
        `${this.props.processUrl}${this.props.match.params.year}/${this.props.match.params.projectId}`
      )
      .then(response => {
        const { data } = response;
        this.setState({ reports: data, isLoaded: true });
      })
      .catch(error => {
        this.setState({ isLoaded: true });
        console.log(error);
      });
  }

  render() {
    const { reports, isLoaded } = this.state;
    const { match } = this.props;

    if (!sessionStorage.getItem('login')) {
      window.location = '/';
    }

    else if (!isLoaded) {
      return <Loader loaderTitle={'Reports'} match={match}/>;
    }
    return (
      <>
        <Navigation
          title={"Reports"}
          match={match}
          linkTo={`/${match.params.year}`}
        />

        {!reports.toString() ? (
          <><h1 className='loader__title'>No reports exist</h1><p className='loader__cta'>Create a new report</p></>
        ) : (
          <>
            <div className='population__header'>
              <p className="population__label">Report Number</p>
              <p className="population__label">Date Modified</p>
            </div>
            {reports.map((project, index) => (
            <Population
              key={new Date() + index}
              year={project.reportNumber}
              title={"Date Created"}
              number={project.dateModified}
              linkTo={`/${match.params.year}/${match.params.projectId}/${project.reportNumber}`}
            />
            
          ))}
          </>
        )}
        <AddButton className='creation' link={`/${match.params.year}/${match.params.projectId}/add`}/>
      </>
    );
  }
}

export default Reports;
