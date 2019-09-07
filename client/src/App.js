import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Year from './components/Year'
import Projects from './components/Projects'
import Reports from './components/Reports'
import ReportCreation from './components/ReportCreation'
import ProjectCreation from './components/ProjectCreation/ProjectCreation'
import ReportView from './components/ReportView/ReportView'

class App extends React.Component {

  processUrl = '/api/'
  //  process.env.PRODUCTION_URL = '/' 

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/:year/:projectId/add' exact render={(props) => <ReportCreation match={props.match} processUrl={this.processUrl} />}/>
          <Route path='/:year/:projectId/:reportId' render={(props) => <ReportView match={props.match} processUrl={this.processUrl} />}/>
          <Route path='/:year/add' exact render={(props) => <ProjectCreation match={props.match} processUrl={this.processUrl} />}/>
          <Route path='/:year/:projectId' render={(props) => <Reports match={props.match} processUrl={this.processUrl} />}/>
          <Route path='/:year' render={(props) => <Projects match={props.match} processUrl={this.processUrl} />}/>
          <Route path='/' render={(props) => <Year match={props.match} processUrl={this.processUrl} />}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
