const { expect } = require("chai");
const { ethers } = require("hardhat");

// Tests unitaires pour le token Agent42 (BEP-20)
//
// On teste toutes les fonctionnalites du contrat :
// - Deploiement et parametres initiaux
// - Transferts de tokens
// - Systeme d'approbation (approve/transferFrom)
// - Mint (reserve au owner)
// - Burn (tout detenteur)
// - Ownership (transfert, renonciation)

describe("Agent42", function () {
  let token;
  let owner;
  let addr1;
  let addr2;

  const INITIAL_SUPPLY = ethers.parseEther("42000000");

  // Deployer un nouveau contrat avant chaque test
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Agent42 = await ethers.getContractFactory("Agent42");
    token = await Agent42.deploy();
  });

  // Deploiement
  describe("Deploiement", function () {
    it("doit avoir le bon nom", async function () {
      expect(await token.name()).to.equal("Agent42");
    });

    it("doit avoir le bon symbole", async function () {
      expect(await token.symbol()).to.equal("AGT42");
    });

    it("doit avoir 18 decimales", async function () {
      expect(await token.decimals()).to.equal(18);
    });

    it("doit assigner la supply initiale au deployer", async function () {
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("doit definir le deployer comme owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  // Transferts
  describe("Transferts", function () {
    it("doit transferer des tokens entre comptes", async function () {
      const amount = ethers.parseEther("1000");

      await token.transfer(addr1.address, amount);
      expect(await token.balanceOf(addr1.address)).to.equal(amount);

      await token.connect(addr1).transfer(addr2.address, amount);
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
      expect(await token.balanceOf(addr1.address)).to.equal(0);
    });

    it("doit echouer si le solde est insuffisant", async function () {
      const amount = ethers.parseEther("1");
      await expect(
        token.connect(addr1).transfer(owner.address, amount)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });

    it("doit emettre un evenement Transfer", async function () {
      const amount = ethers.parseEther("100");
      await expect(token.transfer(addr1.address, amount))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, addr1.address, amount);
    });
  });

  // Approve et TransferFrom
  describe("Approve / TransferFrom", function () {
    it("doit autoriser et permettre un transferFrom", async function () {
      const amount = ethers.parseEther("500");

      await token.approve(addr1.address, amount);
      expect(
        await token.allowance(owner.address, addr1.address)
      ).to.equal(amount);

      await token
        .connect(addr1)
        .transferFrom(owner.address, addr2.address, amount);
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
    });

    it("doit echouer si le montant depasse l'allowance", async function () {
      const amount = ethers.parseEther("100");
      await token.approve(addr1.address, amount);

      const tooMuch = ethers.parseEther("200");
      await expect(
        token
          .connect(addr1)
          .transferFrom(owner.address, addr2.address, tooMuch)
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
    });
  });

  // Mint
  describe("Mint", function () {
    it("doit permettre au owner de mint", async function () {
      const amount = ethers.parseEther("1000");
      await token.mint(addr1.address, amount);

      expect(await token.balanceOf(addr1.address)).to.equal(amount);
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY + amount);
    });

    it("doit interdire le mint par un non-owner", async function () {
      const amount = ethers.parseEther("1000");
      await expect(
        token.connect(addr1).mint(addr1.address, amount)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
  });

  // Burn
  describe("Burn", function () {
    it("doit permettre de bruler ses tokens", async function () {
      const amount = ethers.parseEther("100");
      await token.transfer(addr1.address, amount);

      await token.connect(addr1).burn(ethers.parseEther("50"));
      expect(await token.balanceOf(addr1.address)).to.equal(
        ethers.parseEther("50")
      );
    });

    it("doit reduire la supply totale", async function () {
      const burnAmount = ethers.parseEther("1000");
      await token.burn(burnAmount);
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY - burnAmount);
    });
  });

  // Ownership
  describe("Ownership", function () {
    it("doit permettre de transferer l'ownership", async function () {
      await token.transferOwnership(addr1.address);
      expect(await token.owner()).to.equal(addr1.address);
    });

    it("doit permettre de renoncer a l'ownership", async function () {
      await token.renounceOwnership();
      expect(await token.owner()).to.equal(ethers.ZeroAddress);
    });
  });
});
