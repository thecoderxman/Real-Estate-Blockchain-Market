pragma solidity >=0.4.21 <0.6.0;

import "./verifier.sol";
import "./ERC721Mintable.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is HousingEquityERC721Token {
    Verifier verifierContract;

    constructor(
        address verifierAddress,
        string memory name,
        string memory symbol
    ) public HousingEquityERC721Token(name, symbol) {
        verifierContract = Verifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address senderAddress;
    }

    uint256 solutionCounter = 1;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutionsSubmitted;

    // TODO define an array of the above struct
    // TODO Create an event to emit when a solution is added
    event SolutionAdded(bytes32 solutionKey, address solutionAddress);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        require(solutionsSubmitted[key].index == 0, "Solution already exists");
        solutionsSubmitted[key] = Solution({
            index: solutionCounter,
            senderAddress: msg.sender
        });
        solutionCounter += 1;

        emit SolutionAdded(key, msg.sender);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintWithVerification(
        address to,
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        require(
            verifierContract.verifyTx(a, b, c, input),
            "Incorrect Solution"
        );
        addSolution(a, b, c, input);
        super.mint(to, tokenId);
    }
}
