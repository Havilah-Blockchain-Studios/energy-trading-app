// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EnergyToken is ERC20, Ownable {
    constructor() ERC20("EnergyToken", "ENT") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

contract EnergyTrading is Ownable {
    EnergyToken public energyToken;
    
    struct User {
        uint256 energyBalance;
        uint256 accountBalance;
        bool isProducer;
    }

    mapping(address => User) public users;
    uint256 public energyPrice = 1 ether / 100; // 1 energy unit costs 0.01 ether
    uint256 public gridFee = 5; // 5% grid fee

    event EnergyPurchased(address buyer, uint256 amount, uint256 cost);
    event EnergySold(address seller, uint256 amount, uint256 payment);
    event ProducerRegistered(address producer);
    event ProducerUnregistered(address producer);

    constructor() {
        energyToken = new EnergyToken();
    }

    function registerProducer() public {
        require(!users[msg.sender].isProducer, "Already registered as producer");
        users[msg.sender].isProducer = true;
        emit ProducerRegistered(msg.sender);
    }

    function unregisterProducer() public {
        require(users[msg.sender].isProducer, "Not registered as producer");
        users[msg.sender].isProducer = false;
        emit ProducerUnregistered(msg.sender);
    }

    function buyEnergy(uint256 _amount) public payable {
        require(msg.value >= _amount * energyPrice, "Insufficient payment");
        users[msg.sender].energyBalance += _amount;
        users[msg.sender].accountBalance += msg.value;
        energyToken.mint(msg.sender, _amount);
        emit EnergyPurchased(msg.sender, _amount, msg.value);
    }

    function sellEnergy(uint256 _amount) public {
        require(users[msg.sender].isProducer, "Not registered as producer");
        require(users[msg.sender].energyBalance >= _amount, "Insufficient energy balance");
        require(energyToken.balanceOf(msg.sender) >= _amount, "Insufficient energy tokens");

        uint256 payment = _amount * energyPrice;
        uint256 fee = (payment * gridFee) / 100;
        uint256 netPayment = payment - fee;

        require(address(this).balance >= netPayment, "Contract has insufficient funds");

        users[msg.sender].energyBalance -= _amount;
        users[msg.sender].accountBalance -= payment;
        energyToken.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(netPayment);
        emit EnergySold(msg.sender, _amount, netPayment);
    }

    function getBalance() public view returns (uint256 energyBalance, uint256 accountBalance, bool isProducer) {
        User memory user = users[msg.sender];
        return (user.energyBalance, user.accountBalance, user.isProducer);
    }

    function setEnergyPrice(uint256 _newPrice) public onlyOwner {
        energyPrice = _newPrice;
    }

    function setGridFee(uint256 _newFee) public onlyOwner {
        require(_newFee <= 100, "Fee cannot exceed 100%");
        gridFee = _newFee;
    }

    function withdrawFees() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        payable(owner()).transfer(contractBalance);
    }
}
