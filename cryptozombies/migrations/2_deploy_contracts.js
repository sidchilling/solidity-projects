const DummyContract = artifacts.require("./dummycontract.sol");
const ZombieFactory = artifacts.require('./zombiefactory.sol');
const CryptoKitty = artifacts.require('./CryptoKitty.sol');

module.exports = deployer => {
    deployer.deploy(DummyContract);
    deployer.deploy(ZombieFactory);
    deployer.deploy(CryptoKitty);
};