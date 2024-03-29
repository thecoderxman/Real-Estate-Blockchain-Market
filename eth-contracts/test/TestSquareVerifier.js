// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
const Verifier = artifacts.require("verifier");
const proofData = require("./proof");

// Test verification with correct proof
contract("TestSquareVerifier", (accounts) => {
  // - use the contents from proof.json generated from zokrates steps
  const proof = proofData.proof;
  const correctProofInputs = proofData.inputs;
  const incorrectProofInputs = [0, 1];

  // Test verification with incorrect proof
  describe("Setup", function () {
    beforeEach(async function () {
      this.contract = await Verifier.new({ from: accounts[0] });
    });

    it("Test verification with correct proof", async function () {
      let result = await this.contract.verifyTx.call(
        proof.a,
        proof.b,
        proof.c,
        correctProofInputs,
        { from: accounts[0] }
      );
      assert.equal(result, true, "Incorrect proof");
    });

    // Test verification with incorrect proof
    it("Test verification with incorrect proof", async function () {
      let result = await this.contract.verifyTx.call(
        proof.a,
        proof.b,
        proof.c,
        incorrectProofInputs,
        { from: accounts[0] }
      );
      assert.equal(result, false, "Correct proof");
    });
  });
});
