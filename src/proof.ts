export const DEMO_PROOF = {
    message: "request status",
    request: {
        body: {
            accountCode:
                "0x22a2d51a892f866cf3c6cc4e138ba87a8a5059a1d80dea5b8ee8232034a105b7",
            body: "Read blog at https://dlogz.vercel.app",
            chain: "baseSepolia",
            codeExistsInEmail: true,
            commandParams: ["helloasd"],
            commandTemplate: "Read blog {string}",
            dkimContractAddress: "0x67958da8b5ef9c7003c65ef8b321b493b6dbe171",
            emailAddress: "theansh13ansh@gmail.com",
            subject: "Read blog helloasd",
            templateId:
                "0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a",
        },
        id: "a31f1100-1273-4bf7-ac94-000046dfbe5e",
        status: "Finished",
        updatedAt: "2024-12-08T00:51:55.248705",
    },
    response: {
        commandParams: [
            "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000026174000000000000000000000000000000000000000000000000000000000000",
        ],
        proof: {
            accountSalt:
                "0x153d19b685fe3681ebcc784d0fd69d983ce0c9bc66c363fde0c33bf893f9b932",
            domainName: "gmail.com",
            emailNullifier:
                "0x1056a997799451e0c4be153a553140bebe18c230290d0e0cb2f60f9d01c057ac",
            isCodeExist: true,
            maskedCommand: "Read blog helloasd",
            proof:
                "0x0ad1b21ac6ec52ffc49ab079adc87dedf5fd07e78a3dcf8744a214fb6ce3b7df1b73d184c52aa070bc7b0630588353ae49f0e011a1f040465bb568f64e1addc200136b2c42f72260675a9c25c2bac38ba7b186e079b95261088a00da026ebf2b17ae67de83e7d73113750f7ae8207e39b6b371d8c807bf76b0e986a7a745a3c002dbf1ac9663708e09d7666c38238126d034654106ef75c90cc89f605b5aa735220ec2dcd99f55e95e5315f826180f5082770579926ac91ee00032e8840a70ae20a820d818858aff10b37c5958cd3a0a48cabab8e1eb7ea07c8a2ce2dbbb550401bae9e0deab3b1359c94ba6a3696daad1b826c696d00a440e296950b4888975",
            publicKeyHash:
                "0x0ea9c777dc7110e5a9e89b13f0cfc540e3845ba120b2b6dc24024d61488d4788",
            timestamp: 1733619286,
        },
        skippedCommandPrefix: 0,
        templateId:
            "0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a",
    },
};
