// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import "@anon-aadhaar/contracts/interfaces/IAnonAadhaar.sol";

contract UserContract {
    address public adminAddress;
    address public userAddress;
    address public anonAadhaarVerifierAddr;

    struct Blog {
        string blobId; // valrus id
        string blobHash; // blob hash
        bool isPublished; // published status
    }

    mapping(string => Blog) public blogs; // map for storing blogs

    string[] public blogSlugs; // Array to store all blog slugs

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

        emit UserVerified(userAddress, block.timestamp, isAdult);
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

    function addBlog(string memory blobId, string memory blobHash) public {
        require(
            msg.sender == userAddress,
            "UserContract: Only user can call this"
        );

        require(isVerified, "UserContract: Only verified users can add a blog");

        blogs[blobId] = Blog(blobId, blobHash, false);
        blogSlugs.push(blobId);

        // Logic to add the blog (e.g., storing it in a mapping or emitting an event)
        // This is a placeholder for the actual implementation
        emit BlogAdded(msg.sender, blobId, blobHash, block.timestamp);
    }

    function getAllBlogSlugs() public view returns (string[] memory) {
        return blogSlugs;
    }

    function getBlogBySlug(
        string memory slug
    ) public view returns (Blog memory) {
        return blogs[slug];
    }

    function publishBlog(string memory blobId) public {
        require(
            msg.sender == userAddress,
            "UserContract: Only user can call this"
        );
        require(
            isVerified,
            "UserContract: Only verified users can publish a blog"
        );

        // Logic to publish the blog (e.g., changing its status or emitting an event)
        blogs[blobId].isPublished = true;

        emit BlogPublished(msg.sender, blobId, block.timestamp);
    }

    function updateBlog(
        string memory slug,
        string memory newBlobHash,
        string memory newBlobId
    ) public {
        require(
            msg.sender == userAddress,
            "UserContract: Only user can call this"
        );
        require(
            isVerified,
            "UserContract: Only verified users can update a blog"
        );
        require(
            !blogs[slug].isPublished,
            "UserContract: Blog is already published and cannot be updated"
        );

        blogs[slug].blobHash = newBlobHash;
        blogs[slug].blobId = newBlobId;

        emit BlogUpdated(
            msg.sender,
            slug,
            newBlobHash,
            newBlobId,
            block.timestamp
        );
    }

    event BlogUpdated(
        address indexed user,
        string slug,
        string newBlobHash,
        string newBlobId,
        uint256 timestamp
    );

    event BlogPublished(address indexed user, string blobId, uint256 timestamp);

    // EVENTS

    event UserVerified(address indexed user, uint256 timestamp, bool isAdult);

    // Event to log the addition of a new blog
    event BlogAdded(
        address indexed user,
        string title,
        string content,
        uint256 timestamp
    );
}
