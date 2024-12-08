
export const ZK_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "emailAuthAddr",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "command",
                "type": "string"
            }
        ],
        "name": "ReadBlogEvent",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "commandTemplates",
        "outputs": [
            {
                "internalType": "string[][]",
                "name": "",
                "type": "string[][]"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "accountSalt",
                "type": "bytes32"
            }
        ],
        "name": "computeEmailAuthAddress",
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
                "name": "templateIdx",
                "type": "uint256"
            }
        ],
        "name": "computeTemplateId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dkim",
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
        "name": "dkimAddr",
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
        "name": "emailAuthImplementation",
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
        "name": "emailAuthImplementationAddr",
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
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "templateId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "commandParams",
                        "type": "bytes[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "skippedCommandPrefix",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "domainName",
                                "type": "string"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "publicKeyHash",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "maskedCommand",
                                "type": "string"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "emailNullifier",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "accountSalt",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bool",
                                "name": "isCodeExist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bytes",
                                "name": "proof",
                                "type": "bytes"
                            }
                        ],
                        "internalType": "struct EmailProof",
                        "name": "proof",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct EmailAuthMsg",
                "name": "emailAuthMsg",
                "type": "tuple"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "templateIdx",
                "type": "uint256"
            }
        ],
        "name": "emitEmailCommand",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userContractAddr",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userContractAddr",
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
        "name": "verifier",
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
        "name": "verifierAddr",
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
