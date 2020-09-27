# Employee-Tracker

![GitHub license](https://img.shields.io/badge/license-GNU%20General%20Public%20License%20v3.0-green.svg) ![GitHub license](https://img.shields.io/badge/license-MIT%20License-green.svg) 

For a busy business owner who needs an effective **C**ontent **M**anagement **S**ystem (**CRM**) to view and manage your buisness's database, look no further!

This Node CLI application will enable users to view, add, and update employees, roles, and departments within a buisness. This application will allow any user to manage your company's employees using MYSQL, the Inquirer NPM package, and Node.js as a backend framework.

## Table of Contents
[Deployed Application](https://github.com/Rogers-Development-Services/Employee-Tracker#deployed-application)

[Installation](https://github.com/Rogers-Development-Services/Employee-Tracker#installation)

[Usage](https://github.com/Rogers-Development-Services/Employee-Tracker#usage)

[Screenshots](https://github.com/Rogers-Development-Services/Employee-Tracker#screenshots)

[Videos](https://github.com/Rogers-Development-Services/Employee-Tracker#videos)

[Testing](https://github.com/Rogers-Development-Services/Employee-Tracker#testing)

[Future Updates](https://github.com/Rogers-Development-Services/Employee-Tracker#future-updates)

[Questions](https://github.com/Rogers-Development-Services/Employee-Tracker#questions)

[Credits](https://github.com/Rogers-Development-Services/Employee-Tracker#credits)

[License](https://github.com/Rogers-Development-Services/Employee-Tracker#license)

## Deployed Application

Here is an example of our app in action: 

![Good README.md Generator](./Assets/Employee-Tracker-GIF.gif)

## Installation

Download this package, open your command line interface and run npm install. This should install the following dependencies aswell: express, path, and moment. If for some reason, you need to install the dependencies individually run npm install "dependency_name".

Next run the following command to start the app: "node index.js"

```bash
npm install 
```

```bash
npm install express
```

## Usage 

The application will deploy a employee tracker application in a CLI application. Begin by typing "npm start". 

```bash
npm start 
```

Next, press the down or up arrow keys to scroll to choices with the corresponding action of your choice and press enter. Follow the prompt instructions to enter in details about your department, role, or employee. When ready to input your information, press ENTER.

Note: When updating role and you are prompted for a salary value, don't use the "$", just the number value. Also, when viewing all employees or adding a new employee, the "null" manager stands for an employee having no manager. Furthermore, currently there are only two managers, Chris Roque and Lorrey Talbet.

### Screenshots

![Deployed Application](https://user-images.githubusercontent.com/38272211/94357257-24368780-004c-11eb-817d-23735424c941.JPG)

### Videos

[![Video Tutorial](https://img.youtube.com/vi/se_b6BkXqQU/0.jpg)](https://www.youtube.com/watch?v=se_b6BkXqQU)


## Testing

Testing Instructions: Currently, there are no written tests for this application, but if you wish to write your, change the scripts property in package json file.

```bash
npm install jest
```

```bash
npm test
```

## Future Updates
This application is a work in progress, future updates will include: 
1. Refactor each function into new Promise syntax to contain each connection.query().
2. Provide functionality for:
    * Removing departments, roles, and employees.
    * Viewing all employees by department or manager
    * View the total utilized budget of a department (the combined salaries of all employees in that department)
3. Refactor root directory to contain a functions file which could be exported to app.js

## Questions

Share with us with any comments or questions to help us grow! 

GitHub Profile: [Rogers-Development-Services](https://www.github.com/Rogers-Development-Services)

Email: [matthew.shane.rogers@gmail.com](matthew.shane.rogers@gmail.com)

## Credits

Code template provided by Trilogy Education 

Thanks to [Elma Gonzalez](https://github.com/eyl91?tab=stars), [Steven Landgraf](https://www.linkedin.com/in/slandgra/), [Steven Jirjis](https://www.linkedin.com/in/stevenjirjis/),[Tim Sanders](https://github.com/tbsanders5), [Aaron Platt](https://github.com/aaronkplatt)A for troubleshooting and debugging assistance.

## Licenses
Licensed under the GNU General Public License v3.0,MIT License lincense(s).