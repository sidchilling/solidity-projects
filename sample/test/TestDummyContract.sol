pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/dummycontract.sol";

contract TestDummyContract {

    function testFetchRandomNumber() public {
        DummyContract dummyContract = new DummyContract();
        uint randomNumber = dummyContract.fetchRandomNumber();
        Assert.equal(randomNumber, 10, "The number returned is not 10");
    }

}