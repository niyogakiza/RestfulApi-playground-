/*
* Create and export configuration variables
* */

// Container for all environments
const environments = {};

// Staging
environments.staging = {
    "PORT": 3000,
    "ENV_NAME": 'staging'
};

// Production
environments.production = {
    "PORT": 5000,
    "ENV_NAME": 'production'
};

const currentEnvironments = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase(): '';
const environmentsToExport = typeof(environments[currentEnvironments]) === 'object' ? environments[currentEnvironments] : environments.staging;

module.exports = environmentsToExport;
