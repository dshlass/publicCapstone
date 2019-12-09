# **SITE ASSISTANT**

An application for both Construction Supervisors and Engineers. Site Assistant is a single solution for documenting and distributing site reports.

## **TABLE OF CONTENTS**
1. [Server Setup](#SERVER-SETUP)
   - [MongoDB Atlas Setup](#MongoDB-Atlas-Setup)
   - [Nodemailer Setup](#Nodemailer-Setup)
2. [Client Setup](#Client-Setup)
3. [Startup](#Startup)
4. [Usage](#Usage)
    - [Login Info](#Login-Info)
    - [Project Creation](#Project-Creation)
    - [Report Creation](#Report-Creation)
    - [Project View](#Project-View)
    - [Report View](#Report-View)
5. [Future of this Project](#Future-of-this-Project)
6. [FAQ](#FAQ)
    - [If Port 8080 Is In Use](#If-Port-8080-Is-In-Use)
    - [Editing Projects and Reports](#Editing-Projects-and-Reports)
    - [Maximum Photo Upload](#Maximum-Photo-Upload)

## **SERVER SETUP**
Clone the package using:

```
git clone git@github.com:dshlass/publicCapstone.git
```
Once the project has been cloned:

```
cd publicCapstone && npm install
```
 Create a .env file:
```
 touch .env`
```
 Inside the `.env` file paste in the following code:

```
 NODEMAIL_USER=
 NODEMAIL_PASS=
 MONGO=
 ```

 We will be adding our secure information to this file in the steps below.

Before the project will run, a MongoDB Atlas account must be set up to connect to the database.

### **MongoDB Atlas Setup**
- Go to the following link: https://www.mongodb.com/cloud/atlas and `create a free account`.
- `Create a cluster` using the `Starter Cluster free tier`.
- Select `Cloud Provider & Region` (default) and a region that is close to your current location (will differ for everyone).
- Additional settings can be selected in `Cluster Tier`, `Additional Settings` and `Cluster Name`, but for this project, we will use the defaults.
- Click `Create Cluster`
- Setup will take a few minutes to complete. Once all 3 Servers are deployed you will be able to continue with the setup.
- Once the Servers have deployed, click `Connect`.
- Whitelist your connection IP address: Click the button to add your `current IP address`.
- Create a `MongoDB User`: create a Username and Password. You will need to remember the credentials for the next step.
- Click `Create a Connection Method`.
- Click `Connect Your Application`.
- Copy the `Connection String`.

In the `.env` file paste your connection string after Mongo=

The `.env` file should now look as such:

```
NODEMAIL_USER=
NODEMAIL_PASS=
MONGO=mongodb+srv://YOURUSERNAME:YOURPASSWORD@cluster0-erdx8.mongodb.net/test?retryWrites=true&w=majority
 ```

 YOURUSERNAME and YOURPASSWORD are case sensitive

Next, we will be setting up Nodemailer. To do so we must allow Less Secure apps access using Gmail. To do so, 2-Step Verification **MUST** be disabled to proceed. I recommend creating a new dummy Gmail account to avoid any issues in the future with your Gmail account.

To do so, go to https://www.google.com/gmail/about/ and create a new account.

Once a new account has been created, follow the steps below to set up Nodemailer with Gmail.

### **Nodemailer Setup**
- Navigate to your `Gmail inbox`.
- Click on your avatar in the top right of the browser and click on `Manage your Google Account`.
- Click on `Security` in the left Menu
- If you have `2-Step Verification` turned on, turn it off for this guide.
- Scroll down until you see `Less secure app access` and click `Turn on access`.
- Turn Allow less secure app `ON`

Should you have any issues, please refer to https://devanswers.co/allow-less-secure-apps-access-gmail-account/ for additional information.

In the `.env` file paste your email address and password after NODEMAIL_USER=
and NODEMAIL_PASS.

The `.env` file should now look as such:

```
NODEMAIL_USER=emailaddress@gmail.com
NODEMAIL_PASS=emailaddresspassword
MONGO=mongodb+srv://YOURUSERNAME:YOURPASSWORD@cluster0-erdx8.mongodb.net/test?retryWrites=true&w=majority
```

emailaddress @gmail.com and emailaddresspassword are case sensitive

Once the `.env` has been filled out, you can now set up the client.


 ## **CLIENT SETUP**
```
cd publicCapstone/client && npm install.
```


 ## **STARTUP**

Please note that the Server runs on Port:8080 and the Client runs on Port:3000.

If Port:8080 is already in use, [click here](#If-Port-8080-Is-In-Use) for instructions to reconfigure the port number.

To Run the Application:
- Inside of `publicCapstone/`
- Start the server: `npm start`
- In a new terminal window `cd publicCapstone/client`
- Start the client: `npm start`
- Navigate to http://localhost:3000 if the browser doesn't automatically open.


## **USAGE**

### **Login Info**
You will be prompted to login. The super secure credentials are:

`Username: User`

`Password: password`

### **Project Creation**

Once logged in the user will be prompted to create a new project as none exist.

Projects numbers are automatically generated as followed:

If the current year is 2019, the first project generated would be 19001 and then they would increment by one.

All of the info in the Project Creation will be visible in the email once a report has been sent.

**Project Name**: Name of the project

**Location**: Major cities do not require a province/state but Towns will for accurate readings.

```
For Weather in Toronto, Ontario enter:
Toronto

For Weather in Springfield, Massachusetts enter:
Springfield, MA
```

**Contractors**: Click the + to add a contractor. You can enter multiple.

**Recipients**: This is for emails of people receiving the reports. Multiple addresses can be added here.

**PLEASE NOTE THAT ONCE THIS INFORMATION IS SUBMITTED NOTHING CAN BE CHANGED OR REMOVED.**

### **Report Creation**

Once a Project is created, the user will be prompted to add a new Report to the Project.

Report numbers are automatically generated starting at 1 so the user never loses track of what report number is next.

In each report, the project information will populate at the head of the report including the weather based on location and the current time (at report creation).

**Purpose of Review**: Reason you have made your site visit today. Multiple reasons can be added.

**Deficiencies Noted**: Current issues noted on-site or outstanding issues to be rectified. Multiple deficiencies can be added.

**Work Underway/Completed**: This is the body of the report. Once the user adds a section title, notes for each title can be added to the form. This will allow for multiple sections and nested notes.

**Miscellaneous Notes**: This section is for any additional information that the user would like to provide to the recipients. Examples would be if the site had a visitor etc. Mutliple notes can be added.

**Photos**: A photo is the most important part of any report. This proves to the client/contractors that the user was, in fact, on-site on the noted date. A photo is required to send off a report.

**A default message will be added to sections left blank in the report. Only the Photo is required to prove the user was on-site**


Once the Report has been submitted, it should be emailed to the contacts specified in the Project Creation.

**PLEASE NOTE THAT ONCE THIS INFORMATION IS SUBMITTED NOTHING CAN BE CHANGED OR REMOVED.**

### **Project View**
Once a Project has been created, it is now viewable in the associated Year directory.

Projects displayed by Project Number by Default but can be toggled to view the associated Project Name.

### **Report View**
Once a report has been created, it is now viewable in the associated Project directory.


## **Future of this Project**
For the future of this project, I would love to add the following features:
- Integrate the site with Amazon S3 and CloundFront to increase the load speed of the reports.
- Designated company logins with a user permission structure
- Custom report templates generated by the users.
- Allow users to edit project information and reports once created.
- Allow users to customize their own signatures.
- Implement an autosave feature for reports.

## **FAQ**

### **If Port 8080 Is In Use**

Navigate to publicCapstone/server.js. Look for the following line of code:

```javascript
app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on Port: 8080');
})
```

Change the Port number accordingly.

Once the port has been changed, the address for the client will also need to be changed inside of publicCapstone/client/src/App.js. Look for the following line of code:

```javascript
processUrl = 'http://localhost:8080/api/'
```

Change the Port number to the same as what was set in the server.js file.


### **Editing Projects and Reports**

At the moment there is no way to edit Projects or Reports. This will be a future feature.

### **Maximum Photo Upload**

I do not currently know the maximum number of photos that can be taken in a single report.

As a side note: The free version of MongoDB Atlas provides 200MB of storage so you will be notified once space becomes limited.






