const DummyContract = artifacts.require('./dummycontract.sol');
const EventWatcher = require('./eventUtils.js');

contract('DummyContract', () => {

    it('Should return the number 10', () => {
        return DummyContract.deployed()
        .then(instance => {
            return instance.fetchRandomNumber();
        })
        .then(randomNumber => {
            assert.equal(randomNumber, 10, 'The number returned is not 10');
        });
    });

    it('Negative test: Should return the number 10', () => {
        return DummyContract.deployed()
        .then(instance => {
            return instance.fetchRandomNumber();
        })
        .then(randomNumber => {
            assert.notEqual(randomNumber, 11, 'The number returned is 11');
        });
    });

    it('Checking number of elements after adding', () => {
        return DummyContract.deployed()
        .then(instance => {
            return instance.addElement(10)
            .then(() => {
                return instance.getNumElements();
            })
        })
        .then(numElements => {
            assert.equal(numElements, 1, 'Number of elements is not one');
        });
    });

});

contract('AnotherDummyContract', () => {

    it('Testing before and after adding elements', () => {
        let dummyContractInstance = null;
        return DummyContract.deployed()
        .then(instance => {
            dummyContractInstance = instance;
            return dummyContractInstance.getNumElements()
            .then(numElements => {
                assert.equal(numElements, 0, 'Number of elements must be 0');
            });
        })
        .then(() => {
            return dummyContractInstance.addElement(10)
            .then(() => {
                return dummyContractInstance.getNumElements();
            })
            .then(numElements => {
                assert.equal(numElements, 1, 'Number of elements must be 1');
            });
        })
        .then(() => {
            return dummyContractInstance.addElement(20)
            .then(() => {
                return dummyContractInstance.getNumElements();
            })
            .then(numElements => {
                assert.equal(numElements, 2, 'Number of elements must be 2');
            });
        });
    });

});

contract('EventsDummyContract', () => {

    it('Event must be fired', () => {
        let instance = null;
        const elToAdd = 10;
        return DummyContract.deployed()
        .then(i => {
            instance = i;
            const eventWatcher = instance['ElementAdded']();
            return instance.addElement(elToAdd)
            .then(() => {
                return eventWatcher.get();
            })
            .then(events => {
                const elementAddedEvents = _.filter(events, 'event', 'ElementAdded');
                assert.equal(elementAddedEvents.length, 1, 'Only 1 event must be fired');
                const element = elementAddedEvents[0] && elementAddedEvents[0].args && elementAddedEvents[0].args.el || null;
                assert.equal(element, elToAdd, 'Added Element must be ' + elToAdd);
            });
        });
    });

});

contract('EventsDummyLib', () => {

    it('Listen to events fired', () => {
        const elToAdd = 20;
        let eventWatcher = null;
        return DummyContract.deployed()
        .then(instance => {
            eventWatcher = new EventWatcher(instance, 'ElementAdded');
            return instance.addElement(elToAdd);
        })
        .then(() => {
            return eventWatcher.run();
        })
        .then(() => {
            return eventWatcher.getNumEvents()
            .then(numEvents => {
                assert.equal(numEvents, 1, 'Number of events must be 1');
            });
        })
        .then(() => {
            const argName = 'el';
            return eventWatcher.getArgsWithName(argName)
            .then(argsWithName => {
                assert.equal(argsWithName[0][argName], elToAdd, 'Element added must be ' + elToAdd);
            });
        });
    });

});

contract('Access Variable', () => {

    it('access the contract public variable', () => {
        return DummyContract.deployed()
        .then(instance => {
            return instance.data()
            .then(data => {
                assert.equal(data, 10, 'Data must be 10');
            });
        });
    });

});