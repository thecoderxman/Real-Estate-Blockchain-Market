const truffleAssert = require('truffle-assertions');

var HousingEquityERC721Token = artifacts.require('HousingEquityERC721Token');

contract("TestERC721Mintable", (accounts) => {
    const account_owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];
    const TOKENS_NUMBER = 5;
    const TOKEN_NAME = "TestTokenName";
    const TOKEN_SYMBOL = "TTN";
    const BASE_URI =
      "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
  
    describe("match erc721 spec", function () {
      beforeEach(async function () {
        this.contract = await HousingEquityERC721Token.new(TOKEN_NAME, TOKEN_SYMBOL, {
          from: account_owner,
        });
  
        // TODO: mint multiple tokens
        for (let i = 1; i <= TOKENS_NUMBER; i++) {
          await this.contract.mint(accounts[i], i);
        }
      });
  
      it("should return total supply", async function () {
        let result = await this.contract.totalSupply();
        assert.equal(result, TOKENS_NUMBER, "Incorrect total supply");
      });
  
      it("should get token balance", async function () {
        let result = await this.contract.balanceOf(account_one);
        assert.equal(result, 1, "Incorrect token balance");
      });
  
      // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
      it("should return token uri", async function () {
        const token = 1;
        let result = await this.contract.tokenURI(token);
        assert.equal(result, BASE_URI + token, "Incorrect token uri");
      });
  
      it("should transfer token from one owner to another", async function () {
        const token = 1;
        try {
          await this.contract.transferFrom(account_one, account_two, token, {
            from: account_one,
          });
        } catch (e) {
          console.log(e.message);
        }
  
        let owner = await this.contract.ownerOf(token);
        assert.equal(owner, account_two, "Incorrect transfer token");
      });
    });
  
    describe("have ownership properties", function () {
      beforeEach(async function () {
        this.contract = await HousingEquityERC721Token.new(TOKEN_NAME, TOKEN_SYMBOL, {
          from: account_owner,
        });
      });
  
      it("should fail when minting when address is not contract owner", async function () {
        let mintRejected = false;
        const token = 1;
        try {
          mintRejected = await this.contract.mint(accounts[2], token, {
            from: accounts[3],
          });
        } catch (e) {
          mintRejected = true;
        }
        assert.equal(mintRejected, true, "Only owner can mint token");
      });
  
      it("should return contract owner", async function () {
        let owner = await this.contract.owner();
        assert.equal(owner, account_owner, "Incorrect account owner");
      });
    });
  });
  