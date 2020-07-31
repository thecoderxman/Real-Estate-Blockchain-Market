// // // migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SquareVerifier);
//   deployer.deploy(SolnSquareVerifier);
// };
// // var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
// // module.exports = function(deployer) {
// //   deployer.deploy(ERC721Mintable);
// // };
// // module.exports = function(deployer) {
// //   deployer.deploy(SquareVerifier)
// //     .then(() => {
// //       return deployer.deploy(SolnSquareVerifier, verifier.address);
// //     });
// // };


var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {

  //deployer.deploy(ERC721Mintable,"NFTs_ERC721MintableToken","AGT");

  deployer.deploy(Verifier)
  .then(() => {
      return deployer.deploy(SolnSquareVerifier, Verifier.address, "House Equity Token", "HET");
  });
};

