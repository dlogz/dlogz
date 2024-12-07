// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import "@anon-aadhaar/contracts/interfaces/IAnonAadhaar.sol";

contract UserContract {
    address public adminAddress;
    address public userAddress;
    address public anonAadhaarVerifierAddr;

    uint256 public createdTimestamp = block.timestamp;

    // Single user information
    bool public isVerified = false;
    bool public isAdult = false;
    uint256 public verificationTimestamp;
    uint public userNullifier;

    // Constructor to initialize the contract
    constructor(
        address _userAddress,
        address _adminAddress,
        address _anonAadhaarVerifierAddr
    ) {
        userAddress = _userAddress;
        adminAddress = _adminAddress;
        anonAadhaarVerifierAddr = _anonAadhaarVerifierAddr;
    }

    /// @dev Convert an address to uint256, used to check against signal.
    /// @param _addr: msg.sender address.
    /// @return Address msg.sender's address in uint256
    function addressToUint256(address _addr) private pure returns (uint256) {
        return uint256(uint160(_addr));
    }

    /// @dev Register the single user in the contract.
    /// @param nullifierSeed: Nullifier Seed used while generating the proof.
    /// @param nullifier: Nullifier for the user's Aadhaar data.
    /// @param timestamp: Timestamp of when the QR code was signed.
    /// @param revealArray: Array of the values used as input for the proof generation.
    /// @param groth16Proof: SNARK Groth16 proof.
    function verifyUserProof(
        uint nullifierSeed,
        uint nullifier,
        uint timestamp,
        uint[4] memory revealArray,
        uint[8] memory groth16Proof
    ) public {
        require(
            msg.sender == userAddress || msg.sender == adminAddress,
            "UserContract: Only user or admin can verify"
        );
        require(!isVerified, "UserContract: User already verified");

        require(
            IAnonAadhaar(anonAadhaarVerifierAddr).verifyAnonAadhaarProof(
                nullifierSeed,
                nullifier,
                timestamp,
                addressToUint256(userAddress),
                revealArray,
                groth16Proof
            ) == true,
            "UserContract: proof sent is not valid."
        );

        isVerified = true;
        verificationTimestamp = block.timestamp;
        userNullifier = nullifier;

        isAdult = revealArray[0] == 1;
    }

    // Function to get user registration timestamp
    function getUserVerificationTime() public view returns (uint256) {
        require(isVerified, "UserContract: User not verified");
        return verificationTimestamp;
    }

    function isUserVerified() public view returns (bool) {
        return isVerified;
    }

    function isUserAdult() public view returns (bool) {
        return isAdult;
    }
}
