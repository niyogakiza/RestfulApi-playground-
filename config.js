/*
* Create and export configuration variables
* */

// Container for all environments
const environments = {};

// Staging
environments.staging = {
    "HTTP_PORT": 3000,
    "HTTPS_PORT": 3001,
    "ENV_NAME": 'staging'
};

// Production
environments.production = {
    "HTTP_PORT": 5000,
    "HTTPS_PORT": 5001,
    "ENV_NAME": 'production',
};

const currentEnvironments = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase(): '';
const environmentsToExport = typeof(environments[currentEnvironments]) === 'object' ? environments[currentEnvironments] : environments.staging;

module.exports = environmentsToExport;
