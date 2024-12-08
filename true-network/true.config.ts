// import { TrueApi, testnet } from '@truenetworkio/sdk'
import { testnet, TrueApi } from "@truenetworkio/sdk/dist";
import { TrueConfig } from "@truenetworkio/sdk/dist/utils/cli-config";

// If you are not in a NodeJS environment, please comment the code following code:
// import dotenv from 'dotenv'
// dotenv.config()

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret);

  await trueApi.setIssuer(config.issuer.hash);

  return trueApi;
};

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: "i7USh5248pfCT2vj69FLYhHF1XmCBUMMiRXMeRyVoKZuDia",
    secret: process.env.TRUE_NETWORK_SECRET_KEY ?? "",
  },
  issuer: {
    name: "d_logz",
    hash: "0xecc77f7729107a06f308cad07db5faeafa3e31f088a00738af3c33e0479fcc13",
  },
  algorithm: {
    id: undefined,
    path: undefined,
    schemas: [],
  },
};
