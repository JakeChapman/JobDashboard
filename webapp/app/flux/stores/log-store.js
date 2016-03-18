import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
// polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _logs = {};

// Our client-side CRUD methods for Logs:
function create (log) {
    log.synced = false;
    _logs[log.id] = log;
}

function createAll (logs) {
    _logs = {};
    logs.forEach( (log) => {
        log.synced = true;
        console.log(log);
        _logs[log._id] = log;
    });
}

function destroy (id) {
    delete _logs[id];
}

function update (id, props, synced) {
    let log = _logs[id];
    /* This is a simplistic way of tracking whether Logs's state is currently
     synced with the server and should probably be replaced with a more
     sophisticated method for production, but for our demo purposes it's fine */
    _logs[id] = assign(log, props, { synced: synced });
}


/* The store only needs to allow components to register/unregister listeners,
 and emit change events. Since we have just one top-level component managing
 state for all components interested in Logs, the only other method necessary
 is one for getting all the Logs */
const LogStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        console.log('LogStore Change Event Emitted');
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAll: function() {
        return _logs;
    }
});

/* Register with the App Dispatcher, and declare how the store handles various
 actions. This should be the sole way in which a client side model gets updated */
AppDispatcher.register( (payload) => {
    let action = payload.action;

    switch(action.actionType) {
        case AppConstants.UPDATE_LOG:
            update(action.log.id, action.props, false);
            LogStore.emitChange();
            break;

        case AppConstants.UPDATE_LOG_SUCCESS:
            update(action.log.id, action.props, true);
            LogStore.emitChange();
            break;

        case AppConstants.GET_LOGS_SUCCESS:
            createAll(action.logs);
            LogStore.emitChange();
            break;

        case AppConstants.ADD_LOG:
            create(action.log);
            LogStore.emitChange();

        case AppConstants.ADD_LOG_SUCCESS:
            update(action.log.id, action.log, true);
            LogStore.emitChange();
            break;

        case AppConstants.REMOVE_LOG:
            destroy(action.log.id);
            LogStore.emitChange();
            break;

        default:
        // no op
    }
});

export default LogStore;