pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/zombieFactory.sol";

contract TestZombieFactory {

    function testNumberOfZombiesCreated() public {
        ZombieFactory zombieFactory = new ZombieFactory();

        Assert.equal(zombieFactory.getNumberOfZombies(), 0, "Number of zombies is not zero");

        zombieFactory.createRandomZombie("Test #1 Zombie");
        Assert.equal(zombieFactory.getNumberOfZombies(), 1, "Number of zombies is not one");
    }

    function testLevel() public {
        ZombieFactory zombieFactory = new ZombieFactory();

        zombieFactory.createRandomZombie("Sid");
        uint zombieId = zombieFactory.getNumberOfZombies() - 1;
        uint level = zombieFactory.getLevel(zombieId);
        Assert.equal(level, uint(1), "Level is not one");
    }

}