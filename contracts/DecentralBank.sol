// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.5.0;
import './Reward.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stackers;

    mapping (address=> uint) public stakingBalance;
    mapping (address => bool) public hasStaked;
    mapping (address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }

    // staking function
    function depositTokens(uint _amount) public {
        // require staking amount to be greater than o
        require(_amount > 0, 'amount cannot be 0');
        // Transfer tether tokens to this contract address for staking
        // make sure the sender has the amount to stake
        require(tether.transferFrom(msg.sender, address(this), _amount));
        // update Staking Balalance
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stackers.push(msg.sender);
        }
        // update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}
