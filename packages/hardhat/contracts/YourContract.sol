// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;
import "./SoulBoundToken.sol";

abstract contract YourContract is SoulBoundToken  {

    SoulBoundToken[] SoulBoundTokens;

    function createSBT(string memory name,string memory ticker) public {
        SoulBoundToken newToken = new SoulBoundToken(name,ticker);
        SoulBoundTokens.push(newToken);
    }

    function allTokens() public view returns(SoulBoundToken[] memory call){
        return SoulBoundTokens;
    }
}