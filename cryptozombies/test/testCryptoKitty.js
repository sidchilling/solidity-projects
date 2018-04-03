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

contract('GetKittyTest', () => {

    it('create and get kitty', () => {
        let kittyInstance = null;
        const stringWithIdSet = 200;
        const nameString = 'Another Sid Kitty';
        let createdKittyId;
        return CryptoKitty.deployed()
        .then(instance => {
            kittyInstance = instance;
            eventWatcher = new EventWatcher(kittyInstance, 'KittyCreated');
            return kittyInstance.addKitty(stringWithIdSet, nameString);
        })
        .then(() => eventWatcher.run())
        .then(() => {
            return eventWatcher.getAllArgs()
            .then(allArgs => {
                const currentArgs = allArgs[0];
                createdKittyId = currentArgs.kittyId;
                console.log('Created Kitty ID: ' + createdKittyId);
            });
        })
        .then(() => {
            return kittyInstance.getKitty(createdKittyId)
            .then(data => {
                const isGestating = data[0];
                const isReady = data[1];
                const cooldownIndex = parseInt(data[2]);
                const nextActionAt = parseInt(data[3]);
                const stringWithId = parseInt(data[4]);
                const birthTime = parseInt(data[5]);
                const matronId = parseInt(data[6]);
                const sireId = parseInt(data[7]);
                const generation = parseInt(data[8]);
                const genes = parseInt(data[9]);
                assert.isFalse(isGestating, 'isGestating must be false');
                assert.isTrue(isReady, 'isReady must be true');
                assert.equal(cooldownIndex, 0, 'cooldownIndex must be 0');
                assert.equal(nextActionAt, 0, 'nextActionAt must be 0');
                assert.equal(birthTime, 0, 'birthTime must be 0');
                assert.equal(matronId, 0, 'matronId must be 0');
                assert.equal(sireId, 0, 'sireId must be 0');
                assert.equal(generation, 0, 'generation must be 0');
                assert.equal(stringWithId, stringWithIdSet, 'ID strings must be equal');
                console.log('Gene: ' + genes);
            });
        });
    });

});