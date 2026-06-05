# Agent42 (AGT42)

Token BEP-20 deploye sur la BNB Smart Chain Testnet.

## A propos

Agent42 est un token numerique cree dans le cadre du projet **Tokenizer** de 42.
Le nom est un clin d'oeil a l'ecole 42 et aux AI agents.

## Structure du projet

```
tokenizer/
  README.md                     # Ce fichier
  code/                         # Smart contract et outils de dev
    contracts/Agent42.sol       # Contrat Solidity (BEP-20)
    test/Agent42.test.js        # Tests unitaires (16 tests)
    scripts/deploy.js           # Script de deploiement
    hardhat.config.js           # Configuration Hardhat
  documentation/                # Documentation technique
    WHITEPAPER.md               # Whitepaper du token
  deployment/                   # Informations de deploiement
    DEPLOYMENT.md               # Adresse du contrat et instructions
```

## Choix techniques

| Composant     | Choix             | Raison                                      |
|---------------|-------------------|---------------------------------------------|
| Blockchain    | BSC Testnet       | Partenariat 42/BNB Chain, frais quasi-nuls   |
| Standard      | BEP-20 (ERC-20)   | Standard de l'industrie, compatible MetaMask |
| Langage       | Solidity 0.8.20   | Langage natif des blockchains EVM            |
| Framework     | Hardhat           | Standard professionnel, tests integres       |
| Bibliotheque  | OpenZeppelin      | Contrats audites et securises                |

## Fonctionnalites du token

- **Transfer** : envoyer des tokens entre adresses
- **Approve / TransferFrom** : deleguer des transferts a un tiers
- **Mint** : le owner peut creer de nouveaux tokens
- **Burn** : tout detenteur peut detruire ses tokens
- **Ownership** : transferable ou renonciable (securite)

## Lancer les tests

```bash
cd code
npm install
npx hardhat test
```

## Deployer

Voir [deployment/DEPLOYMENT.md](deployment/DEPLOYMENT.md) pour les instructions completes.

## Smart Contract

- **Adresse** : `TODO`
- **Reseau** : BSC Testnet (chainId 97)
- **BSCScan** : `TODO`