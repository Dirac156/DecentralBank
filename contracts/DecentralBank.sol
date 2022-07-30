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

    event Staking(
        address _customer,
        uint _value
    );

    event Unstaking(
        address _customer,
        uint _value
    );

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
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
        emit Staking(msg.sender, _amount);
    }

    function issueTokens() public {
        // required only the owner to issue the token
        require(msg.sender == owner, 'only owner can perform this action');
        for (uint i = 0; i<stackers.length; i++) {
            address recipient = stackers[i];
            uint balance = stakingBalance[recipient] / 9; // /9 to create percentafe incentive
            // issue token only when balance is greater than 0
            if (balance > 0) rwd.transfer(recipient, balance); 
        }
    }

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        // required the amount to be greater than zero
        require(balance > 0, 'staking balance cannot be less than zero');
        // transfer the tokens to the specified contract address from our bank
        stakingBalance[msg.sender] = 0;
        tether.transfer(msg.sender, balance);
        // update skaing status
        isStaking[msg.sender] = false;
        emit Unstaking(msg.sender, balance);
    }
}
