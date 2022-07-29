// configurations sets where to find compiled contract
const Migrations = artifacts.require('Migrations');

module.exports = deployer => {
    deployer.deploy(Migrations);
};