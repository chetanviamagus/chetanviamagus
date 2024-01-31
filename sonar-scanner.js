const scanner = require('sonarqube-scanner');
const dotenv = require('dotenv').config();
scanner(
    {
        serverUrl: process.env.SONARQUBE_URL,
        token: process.env.SONARQUBE_TOKEN,
        options: {
            'sonar.projectName': process.env.SONARQUBE_PROJECTKEY,
            'sonar.projectKey': process.env.SONARQUBE_PROJECTKEY,
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)