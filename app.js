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
                message: "What is your manager's name?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's e-mail address?"
            },
            {
                type: "list",
                name: "managerId",
                message: "What is your manager's ID Badge Number?",
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
                message: "What is your manager's office number?",
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

    
};

startApp();