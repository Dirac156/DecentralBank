const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async (deployer, network, accounts) => {
    // Deploy Mock Tether Contract
    await deployer.deploy(Tether);
    const tether = await Tether.deployed()
    // Deploy RWD Contract
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();
    // Deploy Decentral Bank
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();
    // Transfer all RWD tokens to Decentral Bank
    // TODO: check big number issue
    await rwd.transfer(decentralBank.address, "1000000000000000000000000");

    // Distribute 100 Tether tokens to investors (1 token = 10^18)
    await tether.transfer(accounts[1], "100000000000000000000");
}