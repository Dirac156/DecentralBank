const RWD = artifacts.require('RWD');
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank;

    const tokens = number => web3.utils.toWei(number, 'ether');

    before(async () => {
        // load contracts
        tether = await Tether.new();
        rwd = await RWD.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);
        // check to see if we transfer the all tokens to our decentralized bank
        await rwd.transfer(decentralBank.address, tokens('1000000'));
        // Transfer 100 mock Tethers to customer
        await tether.transfer(customer, tokens('100'), { from: owner})
    })
    // All of the code goes here for testing
    describe('Mock Tether Deployment', async () => {
        it('matches name successfuly', async () => {
            const name = await tether.name();
            assert.equal(name, 'Mock Tether Token');
        })

        it('matches symbol successfuly', async () => {
            const symbol = await tether.symbol();
            assert.equal(symbol, 'mUSDT');
        })
    });

    describe('Reward Token Deployment', async () => {
        it('matches name successfuly', async () => {
            const name = await rwd.name();
            assert.equal(name, 'Reward Token');
        })

        it('matches symbol successfuly', async () => {
            const symbol = await rwd.symbol();
            assert.equal(symbol, 'RWD');
        })
    });


    describe('Decentral Bank Deployment', async () => {
        it('matches the name successfuly', async () => {
            const name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank');
        });

        it('contract has tokens', async () => {
            const balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance, tokens('1000000'));
        });
    });

    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            // check investor balance
            let result = await tether.balanceOf(customer);
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before staking')
        })
    })
});