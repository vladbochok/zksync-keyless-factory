// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@matterlabs/zksync-contracts/l2/system-contracts/libraries/SystemContractsCaller.sol";
import { DEPLOYER_SYSTEM_CONTRACT } from "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";

/**
 * @title Singleton Factory
 * @notice Exposes CREATE2 to deploy bytecode on deterministic addresses on zkSync-based network on initialization code and salt.
 * @author Vlad Bochok
 */
contract ZkSyncSingletonFactory {
    function deploy(bytes32 _salt, bytes32 _bytecodehash, bytes calldata _calldata) external payable {
        (bool success, ) = SystemContractsCaller
            .systemCallWithReturndata(
                uint32(gasleft()),
                address(DEPLOYER_SYSTEM_CONTRACT),
                uint128(msg.value),
                abi.encodeCall(
                    DEPLOYER_SYSTEM_CONTRACT.create2,
                    (_salt, _bytecodehash, _calldata)
                )
            );
        require(success, "Deployment failed");
    }
}
