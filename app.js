const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamPersonnel = [];
const allId = [];

function startApp() {

    function addManager() {
        console.log("Let's start building your team!!")
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the manager's name?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's e-mail address?"
            },
            {
                type: "list",
                name: "managerId",
                message: "What is the manager's ID Badge Number?",
                choices: [
                    "1",
                    "2",
                    "3",
                    "4"
                ]
            },
            {
                type: "list",
                name: "managerOffice",
                message: "What is the manager's office number?",
                choices: [
                    "502",
                    "402",
                    "302",
                    "202"
                ]
            }
        ]).then(responses => {
            const manager = new Manager(responses.managerName, responses.managerEmail,
                responses.managerId, responses.managerOffice);
            teamPersonnel.push(manager);
            allId.push(responses.managerId);
            addTeamMembers();
        });
    };

    function addTeamMembers() {
        inquirer.prompt([
            {
                type: "list",
                name: "teamMemberChoice",
                message: "What team member position would you like to add?",
                choices: [
                    "Intern.",
                    "Engineer.",
                    "I am done building my team."
                ]
            }
        ]).then(teamBuilderChoice => {
            switch(teamBuilderChoice.teamMemberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    createTeam();
            }
        });
    };

    function addEngineer() {
        console.log("Let's add an Engineer to your team!!")
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's e-mail address?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's ID Badge Number?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineer's Github Username?"
            }
        ]).then(responses => {
            const engineer = new Engineer(responses.engineerName, responses.engineerEmail,
                responses.engineerId, responses.engineerGithub);
            teamPersonnel.push(engineer);
            allId.push(responses.engineerId);
            addTeamMembers();
        });
    };

    function addIntern() {
        console.log("Let's add an Intern to your team!!")
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's e-mail address?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's ID Badge Number?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What university or college does the intern attend?"
            }
        ]).then(responses => {
            const intern = new Intern(responses.internName, responses.internEmail,
                responses.internId, responses.internSchool);
            teamPersonnel.push(intern);
            allId.push(responses.internId);
            addTeamMembers();
        });
    };

    function createTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamPersonnel), "utf-8");
    };

    addManager();

};

startApp();