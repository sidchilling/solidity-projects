const CryptoKitty = artifacts.require('./cryptokitty.sol');
const EventWatcher = require('./eventUtils.js');

contract('CryptoKitty', () => {
    
    it('check no kitties present', () => {
        let kittyInstance = null;
        return CryptoKitty.deployed()
        .then(instance => {
            kittyInstance = instance;
            return kittyInstance.getNumKitties();
        })
        .then(numKitties => {
            assert.equal(numKitties, 0, 'number of kitties must be 0');
        });
    });

    it('check adding a new kitty', () => {
        let kittyInstance = null;
        const stringWithId = 100;
        const nameString = 'Sid Kitty';
        let eventWatcher = null;
        let numKitties = 0;
        return CryptoKitty.deployed()
        .then(instance => {
            kittyInstance = instance;
            eventWatcher = new EventWatcher(kittyInstance, 'KittyCreated');
            return kittyInstance.addKitty(stringWithId, nameString);
        })
        .then(() => {
            return eventWatcher.run();
        })
        .then(() => {
            return kittyInstance.getNumKitties()
            .then(numberOfKitties => {
                numKitties = numberOfKitties;
            });
        })
        .then(() => {
            return eventWatcher.getAllArgs()
            .then(allArgs => {
                const currentArgs = allArgs[numKitties - 1];
                const kittyId = currentArgs.kittyId;
                assert.equal(kittyId, numKitties - 1, `Kitty ID must be ${numKitties - 1}`);
            });
        })
        .then(() => {
            console.log('Contract Address: ' + kittyInstance.address);
            console.log('typeof address: ' + typeof kittyInstance.address);
        });
    });

});