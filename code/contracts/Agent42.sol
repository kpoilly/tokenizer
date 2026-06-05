// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Agent42 (AGT42) - Token BEP-20
//
// Un token cree dans le cadre du projet Tokenizer de 42.
// Deploye sur la BNB Smart Chain (BSC) Testnet.
//
// Fonctionnalites :
// - Standard BEP-20 complet (compatible ERC-20)
// - Supply initiale : 42 000 000 AGT42
// - Mint : reserve au owner (createur du contrat)
// - Burn : tout detenteur peut bruler ses propres tokens
// - Ownership : transferable via Ownable (securite)

contract Agent42 is ERC20, ERC20Burnable, Ownable {

    // Deploiement : mint la supply initiale au createur du contrat
    constructor()
        ERC20("Agent42", "AGT42")
        Ownable(msg.sender)
    {
        // 42 millions de tokens avec 18 decimales
        _mint(msg.sender, 42_000_000 * 10 ** decimals());
    }

    // Seul le owner peut creer de nouveaux tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
