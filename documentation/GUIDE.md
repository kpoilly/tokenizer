# Guide de Préparation et de Soutenance - Agent42 (AGT42)

Ce guide est conçu pour vous accompagner pas-à-pas dans le déploiement du token **Agent42** et pour vous préparer à la soutenance du projet **Tokenizer** de 42, même sans connaissances préalables en blockchain.

---

## 1. Concepts Clés pour la Soutenance (Vulgarisation)

Pour votre soutenance, vous devez comprendre et savoir expliquer les concepts suivants en des termes simples :

### Qu'est-ce qu'une Blockchain ?
Une blockchain est un registre public, distribué et infalsifiable. Au lieu d'avoir une base de données centralisée (comme chez Google ou Amazon), la base de données est dupliquée sur des milliers de serveurs (les nœuds) à travers le monde.

### Qu'est-ce qu'un Smart Contract (Contrat Intelligent) ?
Un smart contract est un programme informatique stocké et exécuté sur la blockchain. Il s'exécute de manière autonome et transparente selon des règles strictes définies dans son code source, sans intermédiaire. Pour notre projet, le smart contract [Agent42](file:///home/kpoilly/tokenizer/code/contracts/Agent42.sol) gère la création, la distribution et le transfert de nos tokens.

### Qu'est-ce qu'un Token BEP-20 ?
Sur la BNB Chain (comme ERC-20 sur Ethereum), **BEP-20** est un standard technique (une interface ou un modèle de code) que tous les tokens doivent suivre pour être compatibles avec les portefeuilles (MetaMask), les exchanges et les autres contrats.
Le standard BEP-20 définit des fonctions indispensables comme :
- `totalSupply()` : la quantité totale de tokens existants.
- `balanceOf(address)` : le solde d'un compte.
- `transfer(to, amount)` : envoyer des tokens.
- `approve(spender, amount)` et `transferFrom(from, to, amount)` : autoriser un tiers à dépenser des tokens pour nous.

### Qu'est-ce que le Gas et les Frais de Transaction ?
Chaque opération sur la blockchain (déployer un contrat, transférer des tokens) demande de la puissance de calcul. Les utilisateurs paient cette puissance en utilisant la monnaie native de la blockchain (le **BNB** sur la BNB Chain) sous forme de **frais de gas**.
*Sur le réseau de test (Testnet), on utilise de faux BNB gratuits (tBNB).*

---

## 2. Explication du Code de notre Smart Contract

Le code de notre contrat [Agent42.sol](file:///home/kpoilly/tokenizer/code/contracts/Agent42.sol) est très épuré et utilise les standards sécurisés d'**OpenZeppelin** (le standard de l'industrie pour les contrats intelligents).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Agent42 is ERC20, ERC20Burnable, Ownable {
    constructor()
        ERC20("Agent42", "AGT42")
        Ownable(msg.sender)
    {
        _mint(msg.sender, 42_000_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

### Explication ligne par ligne :
1. **`import ...`** : Nous héritons de contrats audités d'OpenZeppelin :
   - `ERC20` : Implémente toutes les fonctions standard de transfert et de gestion des soldes.
   - `ERC20Burnable` : Permet aux utilisateurs de détruire (burn) leurs propres tokens s'ils le souhaitent.
   - `Ownable` : Permet de définir un propriétaire unique (le deployer) ayant des droits exclusifs sur certaines fonctions.
2. **`contract Agent42 is ERC20, ERC20Burnable, Ownable`** : Notre contrat hérite de ces trois briques de base.
3. **`constructor()`** : La fonction appelée **une seule fois** lors du déploiement :
   - `ERC20("Agent42", "AGT42")` : Configure le nom et le ticker symbol du token.
   - `Ownable(msg.sender)` : Désigne l'adresse qui déploie le contrat comme le propriétaire (`Owner`).
   - `_mint(msg.sender, 42_000_000 * 10 ** decimals())` : Crée la supply initiale de 42 000 000 de tokens et les envoie au deployer. Les 18 décimales standard sont gérées automatiquement (comme pour le BNB ou l'ETH).
4. **`function mint(address to, uint256 amount) public onlyOwner`** : Une fonction pour générer de nouveaux tokens. Le modificateur `onlyOwner` garantit que **seul le propriétaire du contrat** peut appeler cette fonction. Si quelqu'un d'autre tente de le faire, la transaction échoue immédiatement.

---

## 3. Guide de Déploiement Étape par Étape

Pour déployer sur la blockchain **BSC Testnet** (qui est gratuite), nous allons suivre ces étapes simples :

### Étape A : Installer MetaMask
1. Installez l'extension **MetaMask** sur votre navigateur (Chrome, Firefox, Brave).
2. Créez un nouveau portefeuille (Wallet) et notez précieusement votre phrase de récupération (Seed Phrase). *Ne partagez jamais cette phrase !*

### Étape B : Ajouter le réseau BNB Chain Testnet à MetaMask
Par défaut, MetaMask est configuré sur le réseau Ethereum. Il faut lui ajouter la BNB Chain Testnet :
1. Ouvrez MetaMask, cliquez sur le sélecteur de réseau (en haut à gauche) -> **Ajouter un réseau** -> **Ajouter un réseau manuellement**.
2. Remplissez les champs avec les informations suivantes :
   - **Nom du réseau** : `BNB Smart Chain Testnet`
   - **Nouvelle URL de RPC** : `https://data-seed-prebsc-1-s1.bnbchain.org:8545`
   - **ID de chaîne** : `97`
   - **Symbole de la devise** : `tBNB`
   - **URL de l'explorateur de blocs** : `https://testnet.bscscan.com`
3. Enregistrez et basculez sur ce réseau.

### Étape C : Obtenir des tBNB gratuits (Le Faucet)
Puisque le déploiement nécessite du gas, nous devons charger notre compte avec des tBNB de test :
1. Copiez votre adresse publique MetaMask (elle commence par `0x...` sous le nom de votre compte).
2. Rendez-vous sur le site officiel du Faucet : [BNB Chain Faucet](https://www.bnbchain.org/en/testnet-faucet) (ou demandez-moi si vous avez des difficultés pour y accéder).
3. Collez votre adresse et cliquez sur **Send 0.3 BNB** (ou le montant proposé).
4. Attendez quelques secondes : le solde de votre portefeuille MetaMask doit maintenant afficher les BNB de test reçus.

### Étape D : Récupérer votre clé privée MetaMask
Pour que notre script de déploiement Hardhat puisse signer la transaction de création du contrat, il a besoin de votre clé privée (qui correspond à l'adresse contenant les tBNB).
1. Dans MetaMask, cliquez sur les 3 petits points verticaux en haut à droite -> **Détails du compte** -> **Afficher la clé privée**.
2. Saisissez votre mot de passe MetaMask pour la révéler, puis copiez-la.
3. **Important** : Ne partagez jamais cette clé ! Elle donne un accès total à votre compte.

### Étape E : Configurer votre environnement de déploiement
Dans le terminal de votre projet, nous allons créer un fichier local `.env` caché et sécurisé (qui est ignoré par Git via notre [.gitignore](file:///home/kpoilly/tokenizer/.gitignore)) :
1. Créez un fichier nommé `.env` dans le dossier `code/` :
   ```bash
   cp code/.env.example code/.env
   ```
2. Ouvrez ce fichier [code/.env](file:///home/kpoilly/tokenizer/code/.env) et remplacez `your_private_key_here` par votre clé privée MetaMask copiée à l'étape précédente :
   ```env
   PRIVATE_KEY=0x<votre_cle_privee_sans_les_crochets>
   ```

### Étape F : Lancer le Déploiement !
1. Ouvrez un terminal dans le dossier [code](file:///home/kpoilly/tokenizer/code).
2. Lancez le déploiement avec Hardhat :
   ```bash
   npx hardhat run scripts/deploy.js --network bscTestnet
   ```
3. Le terminal affichera alors quelque chose comme :
   ```text
   Deploiement avec le compte : 0x...
   Balance du compte : 0.3 BNB
   Agent42 deploye a l'adresse : 0x<adresse_du_contrat>
   Verifiez sur BSCScan : https://testnet.bscscan.com/address/0x...
   ```

---

## 4. Scénarios de Démo à présenter à l'Évaluateur

Pendant la soutenance, vous pouvez réaliser ces actions simples pour prouver le bon fonctionnement de votre token :

1. **Vérification sur BSCScan** :
   - Entrez l'adresse de votre contrat sur [BSCScan Testnet](https://testnet.bscscan.com).
   - Montrez la page du contrat, le nom "Agent42", le symbole "AGT42", et la supply totale de 42 000 000.
2. **Ajout du token sur MetaMask** :
   - Dans MetaMask, cliquez sur **Importer des jetons**.
   - Collez l'adresse de votre contrat déployé.
   - Les champs "Symbole du jeton" (`AGT42`) et "Décimales" (`18`) se remplissent automatiquement.
   - Validez : vous verrez votre solde de 42 000 000 AGT42 s'afficher directement dans votre portefeuille !
3. **Transfert simple** :
   - Envoyez des tokens AGT42 à une autre adresse (celle de l'évaluateur ou une seconde adresse créée sur votre MetaMask pour l'occasion).
   - Montrez la transaction de transfert en cours puis validée sur BSCScan.
4. **Démonstration du Burn (Destruction)** :
   - Vous pouvez détruire des tokens en utilisant la fonction `burn` du contrat (soit via MetaMask si vous interagissez avec, soit via un script de test, soit directement en écrivant sur le contrat via l'interface BSCScan si le code est vérifié).
5. **Démonstration de la restriction de Mint** :
   - Expliquez que seul vous (le propriétaire) pouvez appeler `mint()`, assurant ainsi qu'aucun utilisateur malveillant ne puisse imprimer de faux jetons.
