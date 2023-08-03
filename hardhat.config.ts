import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";

export default {
    zksolc: {
        version: '1.3.13',
        compilerSource: 'binary',
        settings: {
            isSystem: true
        }
    },
    solidity: {
        version: '0.8.20'
    },
    networks: {
        hardhat: {
            zksync: true
        },
        zkSyncTestnet: {
            url: "https://testnet.era.zksync.dev",
            ethNetwork: "goerli",
            zksync: true,
            verifyURL:
              "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
        },
        zkSyncMainnet: {
            url: "https://mainnet.era.zksync.io",
            ethNetwork: "mainnet",
            zksync: true,
            verifyURL:
              "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
        }
    }
};
