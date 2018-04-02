pragma solidity ^0.4.17;

import "./ownable.sol";
import "./safemath.sol";

contract ZombieFactory is Ownable {

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewZombie(uint zombieId, string name, uint dna, uint32 level, uint32 readyTime, uint16 winCount, uint16 lossCount);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 1 days;

    struct Zombie {
        string name;
        uint dna;
        uint32 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }

    Zombie[] public zombies;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) public ownerZombieCount;

    function _createZombie(string _name, uint _dna) internal {
        uint32 level = 1;
        uint16 winCount = 0;
        uint16 lossCount = 0;
        uint32 readyTime = uint32(now + cooldownTime);
        uint zombieId = zombies.push(Zombie(_name, _dna, 1, readyTime, winCount, lossCount)) - 1;
        zombieToOwner[zombieId] = msg.sender;
        ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].add(1);
        emit NewZombie(zombieId, _name, _dna, level, readyTime, winCount, lossCount);
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomZombie(string _name) public {
        require(ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createZombie(_name, randDna);
    }

    /// The following functions are for writing Solidity tests and must be removed
    /// when deploying to production
    function getNumberOfZombies() public view returns(uint) {
        return uint(zombies.length);
    }

    function getLevel(uint zombieId) public view returns(uint) {
        Zombie storage zombie = zombies[zombieId];
        return uint(zombie.level);
    }

}