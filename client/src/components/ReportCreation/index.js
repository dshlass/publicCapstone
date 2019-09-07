import React from "react";
import { Provider } from "react-redux";
import store from "../ReportForm/store";
import ReportForm from "../ReportForm/ReportForm";
import axios from "axios";
import Navigation from "../Navigation";
import EmailSent from '../EmailSent'
import Warning from '../Warning'
import LoaderReportView from '../Loader/LoaderReportView'


class ReportCreation extends React.Component {
  
  modal = React.createRef()
  warning = React.createRef()
  
  state = {
    isLoaded: false,
    classToggle: false,
    warningToggle: false,
  };

  toggleClassName= () => {
    if (!this.state.classToggle) { 
      this.setState({classToggle: !this.state.classToggle})
      window.scrollTo(0, (this.modal.current.offsetTop - 400))
    } else 
    this.setState({classToggle: !this.state.classToggle})
  }

    toggleWarning= () => {
    if (!this.state.warningToggle) { 
      this.setState({warningToggle: !this.state.warningToggle})
      window.scrollTo(0, (this.warning.current.offsetTop - 400))
    } else 
    this.setState({warningToggle: !this.state.warningToggle})
  }


  goBack = (event) => {
    event.preventDefault()
    setTimeout(() =>(window.location = `/${this.props.match.params.year}/${this.props.match.params.projectId}`),500)
  }

  createReport = values => {
    if (!values.picture) {
      this.toggleWarning()
    } else {
      let formData = new FormData();

      for (let picture of values.picture) {
        formData.append("picture[]", picture[0]);
      }

      axios
        .post(`${this.props.processUrl}photoupload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          const { weather, date, reportNumber, time } = this.state;
          let body = {
            date,
            reportNumber,
            time,
            weather,
            ...values,
            photos: res.data
          };

          let toSend = JSON.stringify(body);
          axios({
            method: "post",
            url: `${this.props.processUrl}${this.props.match.params.year}/${this.props.match.params.projectId}`,
            headers: {
              "content-type": "application/json"
            },
            data: toSend
          })
            .then(value => console.log(value.data))
            .then(
              this.toggleClassName()
            )
            .catch(error => console.log("Error: ", error));
        });
    }
  };

  /**
   * Gets the project information and then passes it to a weather API to generate the current weather at that location.
   * information is displayed at the top of the report.
   */
  componentDidMount() {
    axios
      .get(
        `${this.props.processUrl}${this.props.match.params.year}/${this.props.match.params.projectId}/add`
      )
      .then(projectInfo => {
        const {
          projectNumber,
          location,
          contractors,
          projectName,
          reportNumber
        } = projectInfo.data;

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${projectInfo.location},ca&units=metric&APPID=899ed4da807b68a6031ba3bf3a5ba719`
          )
          .then(weather => {
            const { data } = weather;
            let currentWeather = `${data.main.temp}°C with ${data.weather[0].description}`;

            let today = new Date();

            let dd = String(today.getDate());
            let mm = String(today.getMonth() + 1);
            let yyyy = today.getFullYear();
            let date = `${mm}/${dd}/${yyyy}`;

            let min = String(today.getMinutes()).padStart(2, "0");
            let hour = String(today.getHours());
            let displayHour = hour > 12 ? hour - 12 : hour;
            let ampm = hour >= 12 ? "pm" : "am";
            let time = `${displayHour}:${min}${ampm}`;

            this.setState({
              projectNumber,
              location,
              contractors,
              projectName,
              weather: currentWeather,
              reportNumber,
              time,
              date,
              isLoaded: true
            });
          });
      });
  }

  render() {
    const { match } = this.props;
    const {
      projectNumber,
      location,
      contractors,
      projectName,
      isLoaded,
      weather,
      reportNumber,
      time,
      date
    } = this.state;

    if (!sessionStorage.getItem("login")) {
      window.location = "/";
    } else if (!isLoaded) {
      return <LoaderReportView loaderTitle={'Loading...'}  match={match}/>;
    }
    return (
      <div className='modal__reference'>
        <Navigation
          title={projectName}
          match={match}
          linkTo={`/${match.params.year}/${projectNumber}`}
        />
        <Provider store={store}>
          <ReportForm
            weather={weather}
            projectNumber={projectNumber}
            contractors={contractors}
            location={location}
            reportNumber={reportNumber}
            time={time}
            date={date}
            projectName={projectName}
            onSubmit={values => this.createReport(values)}
          />
        </Provider>
        <EmailSent target={this.modal} toggle={this.state.classToggle} goBack={this.goBack}/>
        <Warning target={this.warning} toggle={this.state.warningToggle} closeWarning={this.toggleWarning}/>
      </div>
    );
  }
}

export default ReportCreation;
