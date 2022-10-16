// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

import {LSSVMPairERC20} from "./AxePairERC20.sol";
import {LSSVMPairEnumerable} from "./AxePairEnumerable.sol";
import {ILSSVMPairFactoryLike} from "./IAxePairFactoryLike.sol";

/**
    @title An NFT/Token pair where the NFT implements ERC721Enumerable, and the token is an ERC20
    @author boredGenius and 0xmons
 */
contract LSSVMPairEnumerableERC20 is LSSVMPairEnumerable, LSSVMPairERC20 {
    /**
        @notice Returns the LSSVMPair type
     */
    function pairVariant()
        public
        pure
        override
        returns (ILSSVMPairFactoryLike.PairVariant)
    {
        return ILSSVMPairFactoryLike.PairVariant.ENUMERABLE_ERC20;
    }
}
