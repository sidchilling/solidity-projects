pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/dummycontract.sol";

contract TestDummyContract2 {

    function testRandomNumberNew() public {
        DummyContract dummyContract = new DummyContract();
        uint randomNumber = dummyContract.fetchRandomNumber();
        Assert.equal(randomNumber, 10, "Number is not 10");
    }

    function testRandomNumberDeployed() public {
        DummyContract dummyContract = DummyContract(DeployedAddresses.DummyContract());
        uint randomNumber = dummyContract.fetchRandomNumber();
        Assert.equal(randomNumber, 10, "Number is not 10");
    }

}