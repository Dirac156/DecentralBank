const Tether = artifacts.require('Tether');

module.exports = async deployer => {
    await deployer.deploy(Tether);
}