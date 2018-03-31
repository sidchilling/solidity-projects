const DummyContract = artifacts.require("./dummycontract.sol");

module.exports = deployer => {
    deployer.deploy(DummyContract);
};