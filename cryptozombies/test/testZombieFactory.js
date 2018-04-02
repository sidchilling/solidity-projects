const ZombieFactory = artifacts.require('./zombiefactory.sol');
const EventWatcher = require('./eventUtils.js');

contract('ZombieFactory', () => {

    it('Inital Number of Zombies', () => {
        return ZombieFactory.deployed()
        .then(instance => {
            return instance.getNumberOfZombies();
        })
        .then(numZombies => {
            assert.equal(numZombies, 0, 'Number of zombies must be zero');
        });
    });

    it('Test properties of new zombie', () => {
        let zombieFactoryInstance = null;
        let eventWatcher = null;
        let totalNumZombies = -1;
        const zombieName = 'New Zombie';
        return ZombieFactory.deployed()
        .then(instance => {
            zombieFactoryInstance = instance;
            eventWatcher = new EventWatcher(zombieFactoryInstance, 'NewZombie');
            return zombieFactoryInstance.createRandomZombie(zombieName);
        })
        .then(() => {
            return eventWatcher.run();
        })
        .then(() => {
            return zombieFactoryInstance.getNumberOfZombies()
            .then(numZombies => {
                assert.equal(numZombies, 1, 'Number of zombies must be 1');
                totalNumZombies = numZombies;
            });
        })
        .then(() => {
            return eventWatcher.getAllArgs()
            .then(allArgs => {
                const currentArgs = allArgs[totalNumZombies - 1];
                const name = currentArgs.name;
                const zombieId = currentArgs.zombieId;
                const level = currentArgs.level;
                const winCount = currentArgs.winCount;
                const lossCount = currentArgs.lossCount;
                assert.equal(name, zombieName, 'Zombie name is not equal');
                assert.equal(zombieId, totalNumZombies - 1, 'Zombie ID is incorrect');
                assert.equal(level, 1, 'Level must be 1');
                assert.equal(winCount, 0, 'Win Count must be 0');
                assert.equal(lossCount, 0, 'Loss Count must be 0');
            });
        });
    });

});