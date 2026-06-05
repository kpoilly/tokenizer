# Agent42 (AGT42) - Whitepaper

## 1. Introduction

Agent42 est un token numerique conforme au standard BEP-20 (compatible ERC-20),
deploye sur la BNB Smart Chain Testnet. Il a ete cree dans le cadre du projet
Tokenizer de 42, en partenariat avec BNB Chain.

Le nom "Agent42" est un clin d'oeil a la culture geek :
- **42** : la reponse a la grande question sur la vie, l'univers et le reste
  (Douglas Adams, H2G2), mais surtout le nom de l'ecole
- **Agent** : reference aux agents IA et au monde de l'espionnage / Hitman

## 2. Specifications Techniques

| Propriete         | Valeur                             |
|-------------------|------------------------------------|
| Nom               | Agent42                            |
| Symbole           | AGT42                              |
| Standard          | BEP-20 (compatible ERC-20)         |
| Blockchain        | BNB Smart Chain (BSC) Testnet      |
| Decimales         | 18                                 |
| Supply initiale   | 42 000 000 AGT42                   |
| Supply maximale   | Illimitee (mintable par le owner)  |
| Langage           | Solidity 0.8.20                    |
| Framework         | Hardhat                            |
| Bibliotheque      | OpenZeppelin Contracts             |

## 3. Fonctionnalites

### 3.1 Standard BEP-20 Complet

Le contrat implemente toutes les fonctions du standard BEP-20 :
- `name()`, `symbol()`, `decimals()` : informations du token
- `totalSupply()` : nombre total de tokens en circulation
- `balanceOf(address)` : consulter le solde d'une adresse
- `transfer(to, amount)` : envoyer des tokens
- `approve(spender, amount)` : autoriser un tiers a depenser nos tokens
- `allowance(owner, spender)` : consulter une autorisation
- `transferFrom(from, to, amount)` : transfert delegue apres approbation

### 3.2 Mint (Creation de Tokens)

Le owner (deployer initial) peut creer de nouveaux tokens via la
fonction `mint(address to, uint256 amount)`. Cette fonction est protegee
par le modificateur `onlyOwner` d'OpenZeppelin.

**Cas d'usage** : recompenser des contributeurs, alimenter un pool
de liquidite, ou distribuer des airdrops.

### 3.3 Burn (Destruction de Tokens)

Tout detenteur de tokens peut volontairement bruler (detruire) une partie
ou la totalite de ses tokens via la fonction `burn(uint256 amount)`.
Cela reduit definitivement la supply totale.

**Cas d'usage** : mecanisme deflationniste pour augmenter la rarete du token.

### 3.4 Ownership (Gestion des Privileges)

Le contrat utilise le pattern `Ownable` d'OpenZeppelin :
- `transferOwnership(newOwner)` : transferer le role d'admin a une autre adresse
- `renounceOwnership()` : renoncer definitivement au role d'admin
  (le contrat devient alors entierement autonome et decentralise)

## 4. Architecture et Securite

### 4.1 Heritage du Contrat

```
Agent42
  |-- ERC20           (standard BEP-20 complet)
  |-- ERC20Burnable   (fonction burn)
  |-- Ownable         (gestion des permissions)
```

### 4.2 Choix de Securite

- **OpenZeppelin** : les contrats de base sont audites et utilises par
  des milliers de projets en production. Ils protegent contre les attaques
  classiques (overflow, reentrancy, etc.)
- **Solidity 0.8.20** : cette version inclut nativement la protection
  contre les overflows/underflows arithmetiques (pas besoin de SafeMath)
- **Ownable** : seul le deployer initial a les droits d'administration.
  Le ownership peut etre transfere ou renonce.

## 5. Deploiement

Le contrat est deploye sur la BNB Smart Chain Testnet (chainId: 97).
Voir le fichier `deployment/DEPLOYMENT.md` pour l'adresse exacte du
contrat et les liens vers l'explorateur de blocs.

## 6. Comment Utiliser le Token

1. Installer MetaMask (extension navigateur)
2. Configurer le reseau BSC Testnet dans MetaMask
3. Ajouter le token personnalise en entrant l'adresse du contrat
4. Recuperer des tBNB gratuits via le faucet BNB Chain
5. Interagir avec le token (transferts, approbations, etc.)
