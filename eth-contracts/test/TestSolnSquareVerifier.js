const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const Verifier = artifacts.require("verifier");

const proofData = require("./proof");

contract("TestSolutionSquareVerifier", (accounts) => {
  const proof = proofData.proof;
  const correctProofInputs = proofData.inputs;
  const TOKEN_NAME = "TestTokenName";
  const TOKEN_SYMBOL = "TTN";

  describe("Setup", function () {
    beforeEach(async function () {
      const VerifierContract = await Verifier.new({ from: accounts[0] });
      this.contract = await SolnSquareVerifier.new(
        VerifierContract.address,
        TOKEN_NAME,
        TOKEN_SYMBOL,
        { from: accounts[0] }
      );
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it("Test if a solution can be added to contract - SolnSquareVerifier", async function () {
      let result = false;
      await this.contract.addSolution(
        proof.a,
        proof.b,
        proof.c,
        correctProofInputs,
        { from: accounts[0] }
      );

      try {
        /* With the same proof */
        await this.contract.addSolution(
          proof.a,
          proof.b,
          proof.c,
          correctProofInputs,
          { from: accounts[0] }
        );
      } catch (e) {
        result = true;
      }
      assert.equal(result, true, "Solution was added");
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("Test if an ERC721 token can be minted for contract - SolnSquareVerifier", async function () {
      const token = 1;
      const address = accounts[0];
      await this.contract.mintWithVerification(
        accounts[1],
        token,
        proof.a,
        proof.b,
        proof.c,
        correctProofInputs,
        { from: address }
      );

      let owner = await this.contract.ownerOf(token);
      assert.equal(
        owner,
        accounts[1],
        "Token can be minted with correct proof"
      );
    });
  });
});
