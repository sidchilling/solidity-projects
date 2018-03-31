pragma solidity ^0.4.17;

contract DummyContract {

    uint[] public elements;
    uint public data = 10;

    event ElementAdded(uint el);

    function fetchRandomNumber() public pure returns(uint) {
        uint res = 10;
        return res;
    }

    function getNumElements() public view returns(uint) {
        uint numElements = elements.length;
        return numElements;
    }

    function addElement(uint el) public {
        elements.push(el);
        emit ElementAdded(el);
    }

}