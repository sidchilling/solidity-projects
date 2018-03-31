const _ = require('lodash');
const Promise = require('bluebird');

class EventWatcher {

    constructor(contract, eventName) {
        this.contract = contract;
        this.eventName = eventName;
        
        this.eventWatcher = this.contract[this.eventName]();
    }

    run() {
        return new Promise((resolve, reject) => {
            this.eventWatcher.get((error, log) => {
                if (error) {
                    reject(error);
                } else {
                    this.events = log;
                    resolve();
                }
            });
        });
    }

    getNumEvents() {
        return new Promise((resolve, reject) => {
            resolve(this.events.length);
        });
    }

    getAllArgs() {
        return new Promise((resolve, reject) => {
            const allArgs = [];
            _.forEach(this.events, event => {
                const args = event && event.args || {};
                allArgs.push(args);
            });
            resolve(allArgs);
        });
    }

    getArgsWithName(argName) {
        return new Promise((resolve, reject) => {
            const args = [];
            _.forEach(this.events, event => {
                const argValue = event && event.args && event.args[argName] || null;
                const currentRes = {};
                currentRes[argName] = argValue;
                args.push(currentRes);
            });
            resolve(args);
        });
    }

}

module.exports = EventWatcher;
