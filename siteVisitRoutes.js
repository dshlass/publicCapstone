const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let Project = require("./projectSchema.model");
let Report = require("./reportSchema.model");
let Photos = require("./reportPhotoSchema.model");
const fs = require("fs");
var multer = require("multer");
const nodemailer = require("nodemailer");

router.post("/api/", (req, res, next) => {
  const data = req.body;
  if (data.username === "User" && data.password === "password") {
    res.json({
      login: true
    });
  } else {
    res.json({
      login: false
    });
  }
});

//Creates filepath and location
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

//MUST BE PRESENT FOR TEMP STORAGE
var upload = multer({ storage: storage }).array("picture[]");

let globalPhoto = [];

/**
 * Photos are uploaded throught this endpoint
 */
router.post("/api/photoupload", function(req, res) {
  
  upload(req, res, function(err, data) {
    let encodeArray = [];
    let photoIdArray = [];
    
    //Each image is converted to base 64 and then into a buffer
    for (let file of req.files) {
      //start of loop through photo files
      var img = fs.readFileSync(file.path);
      var encode_image = img.toString("base64");
      globalPhoto.push(encode_image);
      var finalImg = {
        contentType: file.mimetype,
        image: Buffer.from(encode_image, "base64")
      };
    
      const photo = new Photos({
        _id: new mongoose.Types.ObjectId(),
        ...finalImg
      });

      //images are uploaded to mongo
      photoIdArray.push(photo._id);
      photo.save().then(item => console.log("Photo saved"));

      //images deleted from local storage
      encodeArray.push(finalImg);
      fs.unlink(file.path, err => {
        if (err) throw err;
        console.log("successfully deleted: " + file.originalname);
      });
    } //End of loop through photo files

    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(photoIdArray);
  });
});

/**
 * Request to display the years in assending order
 * with the associated number of projects within that year
 */
router.get("/api/", (req, res, next) => {
  Project.find()
    .sort({ year: 1 })
    .then(items => {
      let package = [];
      if (items.length === 0) {
        res.json([]);
      } else {
        let yearPage = {};
        for (let i = 0; i < items.length; i++) {
          if (!yearPage[items[i].year]) {
            yearPage[items[i].year] = 1;
          } else {
            yearPage[items[i].year] = yearPage[items[i].year] + 1;
          }
        }

        for (let x in yearPage) {
          let yearReturn = {
            year: x,
            numProjects: yearPage[x]
          };
          package.push(yearReturn);
        }
        res.json(package);
      }
    });
});

/**
 * Request to add a new project within the selected year.
 * First projects in the year will be assigned a value of
 * YY001 => 19001
 */
router.post("/api/:year", (req, res, next) => {
  Project.find({ year: req.params.year }).then(items => {
    let maxProjNumber = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].projectNumber > maxProjNumber)
        maxProjNumber = items[i].projectNumber;
    }

    if (!maxProjNumber) {
      let date = new Date();
      maxProjNumber = new Number((date.getYear() - 100).toString() + "000");
    }

    const project = new Project({
      _id: new mongoose.Types.ObjectId(),
      projectNumber: maxProjNumber + 1,
      ...req.body
    });
    project.save().then(item => {
      console.log("Project saved");
      res.json(item);
    });
  });
});

/**
 * Request to display the project numbers in the selected year
 * with the number of reports in that project number
 */
router.get("/api/:year", (req, res, next) => {
  Project.find({ year: req.params.year }).then(items => {
    if (items) {
      let returnProjects = [];
      for (let x of items) {
        let pairCollection = {
          projectNumber: x.projectNumber,
          numReports: x.reports.length,
          projectName: x.projectName
        };
        returnProjects.push(pairCollection);
      }

      res.json(returnProjects);
    }
  });
});

/**
 * Request to add a new report for a specific project number
 * assigns a new project number based on the number of reports
 * in that project.
 */
router.post("/api/:year/:projectId", (req, res, next) => {
  Project.find({ projectNumber: req.params.projectId }).then(project => {
    const report = new Report({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });

    project[0].reports.push(report._id);

    report.save().then(report => {
      console.log("Report Saved");

      project[0].save().then(project => {
        console.log("Project Saved");

        setTimeout(function() {
          mainExport(report, project);
        }, 5000);
      });
    });

    res.json(project);
  });
});

/**
 * Request to display the report numbers
 * for the reports in that selected project
 */
router.get("/api/:year/:projectId", (req, res, next) => {
  Project.findOne({ projectNumber: req.params.projectId })
    .populate("reports")
    .exec(function(err, project) {
      if (err) return err;
      // console.log(project)
      let returnReports = [];
      for (let report of project.reports) {
        let pairCollection = {
          reportNumber: report.reportNumber,
          dateModified: report.date
        };
        returnReports.push(pairCollection);
      }
      res.json(returnReports);
    });
});

/**
 * Request to display the report and project information for
 * the report view page
 */
router.get("/api/:year/:projectId/add", (req, res, next) => {
  Project.findOne({ projectNumber: req.params.projectId }).then(item => {
    let projectInformation = {
      projectName: item.projectName,
      projectNumber: item.projectNumber,
      contractors: item.contractors,
      location: item.location,
      reportNumber: item.reports.length + 1
    };

    res.json(projectInformation);
  });
});

/**
 * Request to display the sepecific project information
 * with the requested report.
 */
router.get("/api/:year/:projectId/:reportId", (req, res, next) => {
  let projectSummary = [];

  Project.findOne({ projectNumber: req.params.projectId }).then(project => {
    project.reports = [];
    projectSummary.push(project);
  });

  Project.findOne({ projectNumber: req.params.projectId })
    .populate("reports")
    .exec(function(err, report) {
      if (err) return err;

      let specificReport = report.reports.find(
        report => report.reportNumber === parseInt(req.params.reportId)
      );

      let returnReportId = specificReport._id;

      Report.find({ _id: returnReportId })
        .populate("photos")
        .exec(function(err, report) {
          projectSummary[0].reports = report;

          let photoSection = projectSummary[0].reports[0].photos;
          photoSection = [];

          for (let image of projectSummary[0].reports[0].photos) {
            var base64data = Buffer.from(image.image, "binary").toString(
              "base64"
            );
            photoSection.push(base64data);
          }

          let fullReport = {
            projectName: projectSummary[0].projectName,
            projectNumber: projectSummary[0].projectNumber,
            year: projectSummary[0].year,
            location: projectSummary[0].location,
            contractors: projectSummary[0].contractors,
            report,
            photoSection
          };

          res.json(fullReport);
        });
    });
});

//This is where the email is created and sent.
async function mainExport(report, project) {
  await Report.find({ _id: report._id })
    .populate("photos")
    .exec(function(err, report) {
      
      //creating the outputs for the various arrays inside the report
      let purpose = report[0].purposeOfReview
        .map(note => `<li style="font-size:18px; margin-top:5px;">${note}</li>`)
        .join("");
      let deficiencies = report[0].deficienciesNoted
        .map(note => `<li style="font-size:18px; margin-top:5px;">${note}</li>`)
        .join("");
      let miscNotes = report[0].miscellaneousNotes
        .map(note => `<li style="font-size:18px; margin-top:5px;">${note}</li>`)
        .join("");
      let date = report[0].date;
      let time = report[0].time;
      let weather = report[0].weather;
      let reportNumber = report[0].reportNumber;
      let contractors = project.contractors;
      let projectNumber = project.projectNumber;
      let projectName = project.projectName;
      let location = project.location;

      let workCompleted = report[0].workCompleted
        .map(
          section =>
            `<li><h3 style='margin-bottom:5px;font-size:20px; text-transform: capitalize;'>${
              section.title
            }</h3><ul style='margin-top: 0; padding-left: 20px;'>${section.notes
              .map(
                note =>
                  `<li style="font-size: 18px; font-weight:normal">${note}</li>`
              )
              .join("")}</ul></li>`
        )
        .join("");

      const emailBody = `
          <section style='font-family: Arial, Helvetica, sans-serif; color:#202020'>
             <h1 style='margin-bottom: 0;font-size:25px;'>
              Site Visit Report ${reportNumber}
             </h1>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td style='font-weight: 600; font-size:18px; text-align: right;'>Project:</td>
                      <td style='font-size:18px;'>${projectName}</td>
                    </tr>
                    <tr>
                      <td style='font-weight: 600;font-size:18px; text-align: right;'>Location:</td>
                      <td style='font-size:18px;'>${location}</td>
                    </tr>
                    <tr>
                      <td style='font-weight: 600;font-size:18px; text-align: right;'>Date:</td>
                      <td style='font-size:18px;'>${date}</td>
                    </tr>
                    <tr>
                      <td style='font-weight: 600;font-size:18px; text-align: right;'>Time:</td>
                      <td style='font-size:18px;'>${time}</td>
                    </tr>
                    <tr>
                      <td style='font-weight: 600;font-size:18px; text-align: right;'>Weather:</td>
                      <td style='font-size:18px;'>${weather}</td>
                    </tr>
                    <tr>
                      <td style='font-weight: 600;font-size:18px; text-align: right;'>File Number:</td>
                      <td style='font-size:18px;'>${projectNumber}</td>
                    </tr>
                    <tr>
                      <td style='font-weight: 600;font-size:18px; text-align: right;'>Contractors:</td>
                      <td style='font-size:18px;'>${contractors.join(", ") ||
                        "Dale Shlass"}</td>
                    </tr>
                  </tbody>
                </table>

                <section>
                  <h2 style='font-size:22px; margin-bottom: 0; text-decoration: underline'>Purpose of Review</h2>
                  <ul style='margin-top: 0; padding-left: 20px;'>
                    ${purpose ||
                      '<li style="font-size:18px; margin-top:5px;">None noted.</li>'}
                  </ul>
                </section>

                <section>
                  <h2 style='font-size:22px; margin-bottom: 0; text-decoration: underline'>Deficiencies Noted</h2>
                  <ul style='margin-top: 0; padding-left: 20px;'>
                    ${deficiencies ||
                      '<li style="font-size:18px; margin-top: 5px;">None noted.</li>'}
                  </ul>
                </section>

                <section>
                  <h2 style=' font-size:22px; margin-bottom: 0; text-decoration: underline'>
                    Work Underway/Completed
                  </h2>
                    ${
                      workCompleted
                        ? `<ol style='font-weight: 600; font-size: 20px;'>${workCompleted}<ol>`
                        : '<ul style="margin-top: 0; padding-left: 20px;"><li style="font-size:18px; margin-top: 5px;">No work in progress at the time of site visit.</li></ul>'
                    }
                </section>

                <section>
                  <h2 style=' font-size:22px; margin-bottom: 0; text-decoration: underline'>Miscellaneous Notes</h2>
                  <ul style='margin-top: 0; padding-left: 20px;'>
                    ${miscNotes ||
                      '<li style="font-size:18px; margin-top: 5px;">None noted.</li>'}
                  </ul>
                </section>
              </div>
              <section>
                  <h2 style=' font-size:22px; margin-bottom: 0; text-decoration: underline'>Photos</h2>
                  <p style='margin-top: 5px; font-size:18px;'>Please see attachments.</p>
                </section>
              <section>
                <p style="font-size: 18px; margin-bottom: 20px;">Should you have any questions, please contact the undersigned.</p>
                <p style="font-size: 18px; margin-bottom: 20px;">Site Assistant Built By:</p>
                <p style="font-size: 18px; margin-bottom: 5px;">Dale Shlass, EIT</p>
                <p style="font-size: 18px; margin-bottom: 5px;margin-top: 0px;">Web Developer</p> 
                <a style="display: block;font-size: 18px;text-decoration: none;color: rgba(32, 32, 32, 1); " href='tel:+14169187713'>416-918-7713</a> 
                <a style="display: block;font-size: 18px;text-decoration: none;color: rgba(32, 32, 32, 1); margin-bottom: 5px;" href='mailto:dale@shlass.com'>dale@shlass.com</a>
                <a style="display: block;font-size: 18px;text-decoration: none; margin-top: 10px;float: left; background: #0077B5;color: white;padding: 5px 20px;border-radius: 20px;" href='https://www.linkedin.com/in/dshlass/'>LinkedIn</a>
                <a style="display: block;font-size: 18px;text-decoration: none; margin-top: 10px;float: left; border: 1px solid #24292E; background: #fff; color: #24292E; padding: 5px 20px; border-radius: 20px; margin-left: 40px;" href='https://www.github.com/dshlass/'>GitHub</a>
             </section>
              </div>
         </section>`;

      let photoSection = [];

      for (let image of report[0].photos) {
        var base64data = Buffer.from(image.image, "binary").toString("base64");
        photoSection.push({
          filename: `ReportPhoto.png`,
          content: base64data,
          encoding: "base64"
        });
      }

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAIL_USER,
          pass: process.env.NODEMAIL_PASS
        }
      });

      console.log(transporter);

      let info = transporter.sendMail({
        from: '"Site Assistant ✅" <dale@shlass.com>', // sender address
        to: `${project.recipients}`, // list of receivers
        subject: `${project.projectName} Site Visit ${["#"].toString()}${
          report[0].reportNumber
        }`, // Subject line
        text: "Your site report", // plain text body
        html: emailBody,
        attachments: photoSection
      });

      console.log("Message sent to", project.recipients.join(" "));
    });
}

module.exports = router;
