import React from "react";
import axios from "axios";
import Navigation from "../Navigation";
import LoaderReportView from "../Loader/LoaderReportView";

class ReportView extends React.Component {
  state = {
    isLoaded: false
  };

  getReport = () => {
    axios({
      method: "GET",
      url: `${this.props.processUrl}${this.props.match.params.year}/${this.props.match.params.projectId}/${this.props.match.params.reportId}`
    })
      .then(value => {
        const {
          photoSection,
          report,
          year,
          projectNumber,
          location,
          contractors,
          projectName
        } = value.data;

        this.setState({
          photos: photoSection,
          report,
          projectNumber,
          location,
          contractors,
          projectName,
          year,
          isLoaded: true
        });
      })
      .catch(error => console.log("Error: ", error));
  };

  componentDidMount() {
    this.getReport();
  }

  render() {
    const { match } = this.props;
    const {
      report,
      photos,
      projectName,
      year,
      projectNumber,
      location,
      contractors
    } = this.state;

    if (!this.state.isLoaded) {
      return <LoaderReportView loaderTitle={"Loading..."} match={match} />;
    }

    return (
      <>
        <Navigation
          title={projectName}
          match={match}
          linkTo={`/${year}/${projectNumber}`}
        />
        <div className="main-wrapper">
          <section className="report">
            <section className="toEmail">
              <h1 className="report__title">
                Site Visit Report #{match.params.reportId}
              </h1>
              {report.map((field, index) => (
                <div key={index}>
                  <table className="report__table">
                    <tbody>
                      <tr>
                        <td className="report__label">Project:</td>
                        <td className="report__label-info" key={index}>{projectName}</td>
                      </tr>
                      <tr>
                        <td className="report__label">Location:</td>
                        <td key={index} className="report__label-info">{location}</td>
                      </tr>
                      <tr>
                        <td className="report__label">Date:</td>
                        <td key={index}className="report__label-info">{field.date}</td>
                      </tr>
                      <tr>
                        <td className="report__label">Time:</td>
                        <td key={index}className="report__label-info">{field.time}</td>
                      </tr>
                      <tr>
                        <td className="report__label">Weather:</td>
                        <td key={index}className="report__label-info">{field.weather}</td>
                      </tr>
                      <tr>
                        <td className="report__label">File Number:</td>
                        <td key={index}className="report__label-info">{projectNumber}</td>
                      </tr>
                      <tr>
                        <td className="report__label">Contractors:</td>
                        <td key={index}className="report__label-info">{contractors.join(", ")}</td>
                      </tr>
                    </tbody>
                  </table>

                  <section className="report__section">
                    <h2 className="report__subheading">Purpose of Review</h2>
                    <ul>
                      {field.purposeOfReview.toString() ? (
                        field.purposeOfReview.map((note, index) => (
                          <li className='report__filler' key={index}>{note}</li>
                        ))
                      ) : (
                        <li className='report__filler'>None noted.</li>
                      )}
                    </ul>
                  </section>

                  <section className="report__section">
                    <h2 className="report__subheading">Deficiencies Noted</h2>
                    <ul>
                      {field.deficienciesNoted.toString() ? (
                        field.deficienciesNoted.map((note, index) => (
                          <li className='report__filler' key={index}>{note}</li>
                        ))
                      ) : (
                        <li className='report__filler'>None noted.</li>
                      )}
                    </ul>
                  </section>

                  <section className="report__section">
                    <h2 className="report__subheading">
                      Work Underway/Completed
                    </h2>
                    {field.workCompleted.toString() ? (
                      <ol className='report__ul-bold' key={index}>
                        {field.workCompleted.map((section, index) => (
                          <li key={index + 6}>
                            <h3 className='report__section-heading'key={index}>{section.title}</h3>
                            <ul>
                              {section.notes.map((note, index) => (
                                <li className='report__filler report__regular-font' key={index}>{note}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul>
                        <li className='report__filler'>No work in progress at the time of site visit.</li>
                      </ul>
                    )}
                  </section>

                  <section className="report__section">
                    <h2 className="report__subheading">Miscellaneous Notes</h2>
                    <ul>
                      {(field.miscellaneousNotes.toString()) ? (
                        field.miscellaneousNotes.map((note, index) => (
                          <li className='report__filler' key={index}>{note}</li>
                        ))
                      ) : (
                         <li className='report__filler'>None noted.</li>
                      )}
                    </ul>
                  </section>
                </div>
              ))}
            </section>
            <section className="report__section--images">
              <h2 className="report__subheading">Photos</h2>
              <div className="report__image-wrapper">
                {photos.map((field, index) => (
                  <div key={index}>
                    <img
                      className="report__image"
                      key={index}
                      src={`data:image/png;base64,${field}`}
                      alt="site photos"
                    />
                  </div>
                ))}
              </div>
            </section>
            <section className="report__signature">
              <p className="report__label-info signature-title">Should you have any questions, please contact the undersigned.</p>
              <p className="report__label-info signature-built-by">Site Assistant Built By:</p>
              <p className="report__label-info signature-text">Dale Shlass, EIT</p>
              <p className="report__label-info signature-text">Web Developer</p> 
              <a className='report__link signature-text' href='tel:+14169187713'>416-918-7713</a> 
              <a className='report__link signature-text' href='mailto:dale@shlass.com'>dale@shlass.com</a>
            </section>
          </section>
        </div>
      </>
    );
  }
}

export default ReportView;
