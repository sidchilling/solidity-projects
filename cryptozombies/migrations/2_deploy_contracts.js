const DummyContract = artifacts.require("./dummycontract.sol");
const ZombieFactory = artifacts.require('./zombiefactory.sol');

module.exports = deployer => {
    deployer.deploy(DummyContract);
    deployer.deploy(ZombieFactory);
};