// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserContract.sol";

contract Factory {
    address public admin;
    mapping(address => UserContract) public userContracts;
    address[] public allUsers; // Array to store all user addresses

    constructor() {
        admin = msg.sender;
    }

    function createUserContract() external {
        require(
            address(userContracts[msg.sender]) == address(0),
            "User contract already exists for this address"
        );

        UserContract newUserContract = new UserContract(msg.sender);
        userContracts[msg.sender] = newUserContract;
        allUsers.push(msg.sender); // Add user address to the array
    }

    // Function to get all users who have created contracts
    function getAllUsers() external view returns (address[] memory) {
        return allUsers;
    }

    // Function to get the user contract for a specific address
    function getUserContract(
        address user
    ) external view returns (UserContract) {
        return userContracts[user];
    }
}
