pragma solidity ^0.4.17;

contract CryptoKitty {

    struct Kitty {
        bool isGestating;
        bool isReady;
        uint256 cooldownIndex;
        uint256 nextActionAt;
        uint256 stringWithId;
        uint256 birthTime;
        uint256 matronId;
        uint256 sireId;
        uint256 generation;
        uint256 genes;
    }

    Kitty[] public kitties;
    event KittyCreated(uint kittyId);

    function _generateRandomGene(string _str) private pure returns(uint256) {
        uint256 rand = uint256(keccak256(_str));
        uint dnaDigits = 16;
        uint dnaModulus = 10 ** dnaDigits;
        uint256 gene = rand % dnaModulus;
        return gene;
    }

    function addKitty(uint256 _stringWithId, string _nameString) public {
        uint256 genes = _generateRandomGene(_nameString);
        uint kittyId = kitties.push(Kitty(false, true, 0, 0, _stringWithId, 0, 0, 0, 0, genes)) - 1;
        emit KittyCreated(kittyId);
    }

    function getKitty(uint kittyId) public view returns(bool, bool, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256) {
        require(kittyId < kitties.length);
        Kitty storage fetchedKitty = kitties[kittyId];
        return (fetchedKitty.isGestating,
            fetchedKitty.isReady,
            fetchedKitty.cooldownIndex,
            fetchedKitty.nextActionAt,
            fetchedKitty.stringWithId,
            fetchedKitty.birthTime,
            fetchedKitty.matronId,
            fetchedKitty.sireId,
            fetchedKitty.generation,
            fetchedKitty.genes);                  
    }

    function getNumKitties() public view returns(uint) {
        return uint(kitties.length);
    }

}