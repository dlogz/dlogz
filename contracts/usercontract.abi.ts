
export const USER_CONTRACT_ABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_userAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_adminAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_anonAadhaarVerifierAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addBlog",
        "inputs": [
            {
                "name": "blobId",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "blobHash",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "adminAddress",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "anonAadhaarVerifierAddr",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "blogSlugs",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "blogs",
        "inputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "blobId",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "blobHash",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "isPublished",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createdTimestamp",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllBlogSlugs",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string[]",
                "internalType": "string[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBlogBySlug",
        "inputs": [
            {
                "name": "slug",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct UserContract.Blog",
                "components": [
                    {
                        "name": "blobId",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "blobHash",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "isPublished",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserVerificationTime",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isAdult",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isUserAdult",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isUserVerified",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isVerified",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "publishBlog",
        "inputs": [
            {
                "name": "blobId",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateBlog",
        "inputs": [
            {
                "name": "slug",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "newBlobHash",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "newBlobId",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "userAddress",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "userNullifier",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "verificationTimestamp",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "verifyUserProof",
        "inputs": [
            {
                "name": "nullifierSeed",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "nullifier",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "revealArray",
                "type": "uint256[4]",
                "internalType": "uint256[4]"
            },
            {
                "name": "groth16Proof",
                "type": "uint256[8]",
                "internalType": "uint256[8]"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "BlogAdded",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "title",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "content",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "BlogPublished",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "blobId",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "BlogUpdated",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "slug",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "newBlobHash",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "newBlobId",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UserVerified",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "isAdult",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
    }
] as const;