// SPDX-Licence-Identifier: UNLICENSED
pragma solidity ^0.5.0;

contract RWD {
    string public name = 'Reward Token';
    string public symbol = 'RWD';
    // each token is equal to 1*10^18
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    event Transfer (
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns(bool success) {
        // require that the value is greater or equal for transfer
        require(_value <= balanceOf[msg.sender]);
        // transfer the amount and substract the balance
        balanceOf[msg.sender] -= _value;
        // add balance
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
        // require that the value is greater or equal for transfer
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        // substract balance to transfer from
        balanceOf[_from] -= _value;
        // add balance
        balanceOf[_to] += _value;
        // 
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}