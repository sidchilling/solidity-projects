pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/dummycontract.sol";

contract TestDummyContract {

    function testFetchRandomNumber() public {
        DummyContract dummyContract = new DummyContract();
        uint randomNumber = dummyContract.fetchRandomNumber();
        Assert.equal(randomNumber, 10, "Random number is not 10");
    }

    function testAddingElements() public {
        DummyContract dummyContract = new DummyContract();
        uint numElements = dummyContract.getNumElements();
        Assert.equal(numElements, 0, "Number of elements is not zero");

        dummyContract.addElement(10);
        numElements = dummyContract.getNumElements();
        Assert.equal(numElements, 1, "Number of elements is not one");

        dummyContract.addElement(20);
        numElements = dummyContract.getNumElements();
        Assert.equal(numElements, 2, "Number of elements is not two");
    }

    function testInspectData() public {
        DummyContract dummyContract = new DummyContract();
        uint dataVal = dummyContract.data();
        Assert.equal(dataVal, 10, "Data is not 10");
    }

}