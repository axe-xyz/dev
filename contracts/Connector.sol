// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

import "src/AxeRouter.sol";
import {LSSVMPair} from "./AxePair.sol";

contract Connector {
    LSSVMRouter router;

    constructor(address payable _llsvmrounterAddr) {
        router = LSSVMRouter(_llsvmrounterAddr);
    }

    function axeSwapETHForAnyNFT(
        PairSwapAny[] calldata swapList,
        address payable ethRecipient,
        address nftRecipient,
        uint256 deadline
    ) public {
        router.swapETHForAnyNFTs(
            swapList,
            ethRecipient,
            nftRecipient,
            deadline
        );
    }
}
