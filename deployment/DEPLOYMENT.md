# Deploiement Agent42 (AGT42)

## Reseau

| Propriete    | Valeur                         |
|--------------|--------------------------------|
| Blockchain   | BNB Smart Chain Testnet (BSC)  |
| Chain ID     | 97                             |
| RPC URL      | https://data-seed-prebsc-1-s1.bnbchain.org:8545 |
| Explorateur  | https://testnet.bscscan.com    |

## Smart Contract

| Propriete          | Valeur                     |
|--------------------|----------------------------|
| Adresse du contrat | `TODO: a remplir apres deploiement` |
| Lien BSCScan       | `TODO: a remplir apres deploiement` |

## Instructions de Deploiement

### Prerequis

1. Node.js installe
2. MetaMask configure avec le reseau BSC Testnet
3. Des tBNB sur le wallet (via le faucet BNB Chain)

### Etapes

```bash
# 1. Se placer dans le dossier code
cd code

# 2. Installer les dependances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Editer .env et ajouter la cle privee MetaMask

# 4. Compiler le contrat
npx hardhat compile

# 5. Lancer les tests
npx hardhat test

# 6. Deployer sur BSC Testnet
npx hardhat run scripts/deploy.js --network bscTestnet
```

### Verification sur BSCScan

Apres le deploiement, le script affiche l'adresse du contrat.
Cette adresse est verifiable sur https://testnet.bscscan.com.
