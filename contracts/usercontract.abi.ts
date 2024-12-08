export const USER_CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_adminAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_anonAadhaarVerifierAddr",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_agentAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_zkFactoryAddr",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "slug",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "blobId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "blobHash",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "BlogAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "slug",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "BlogDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "blobId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "BlogPublished",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "slug",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newBlobHash",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newBlobId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "BlogUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isAdult",
                "type": "bool"
            }
        ],
        "name": "UserVerified",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "slug",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "blobId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "blobHash",
                "type": "string"
            }
        ],
        "name": "addBlog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "adminAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "agentAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "anonAadhaarVerifierAddr",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "blogSlugs",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "blogs",
        "outputs": [
            {
                "internalType": "string",
                "name": "blobId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "blobHash",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isPublished",
                "type": "bool"
            },
            {
                "internalType": "enum UserContract.BlogStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "readabilityScore",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "estimatedReadTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "createdTimestamp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "slug",
                "type": "string"
            }
        ],
        "name": "deleteBlog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllBlogSlugs",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "slug",
                "type": "string"
            }
        ],
        "name": "getBlogBySlug",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "blobId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "blobHash",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPublished",
                        "type": "bool"
                    },
                    {
                        "internalType": "enum UserContract.BlogStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "readabilityScore",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "estimatedReadTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "tags",
                        "type": "string[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "likes",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct UserContract.Blog",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUserVerificationTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "slug",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "hasUserLikedBlog",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isAdult",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isUserAdult",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isUserVerified",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isVerified",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "slug",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "likeBlog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_zkContractAddr",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "userAddr",
                "type": "address"
            }
        ],
        "name": "linkZKContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "slug",
                "type": "string"
            }
        ],
        "name": "publishBlog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAgentAddress",
                "type": "address"
            }
        ],
        "name": "updateAgentAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "slug",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newBlobHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newBlobId",
                "type": "string"
            }
        ],
        "name": "updateBlog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "slug",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "newTags",
                "type": "string[]"
            },
            {
                "internalType": "enum UserContract.BlogStatus",
                "name": "newStatus",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "newReadabilityScore",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "newEstimatedReadTime",
                "type": "uint256"
            }
        ],
        "name": "updateBlogMeta",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userNullifier",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "verificationTimestamp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nullifierSeed",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nullifier",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "uint256[4]",
                "name": "revealArray",
                "type": "uint256[4]"
            },
            {
                "internalType": "uint256[8]",
                "name": "groth16Proof",
                "type": "uint256[8]"
            }
        ],
        "name": "verifyUserProof",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "zkContractAddr",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "zkFactoryAddr",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;
