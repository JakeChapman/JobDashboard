import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatcher/app-dispatcher.js';
import LogApi from '../apis/Log-Api.js';

/* Actions here perform two purposes: to send the appropriate action on to the
 dispatcher (which routes in on to the store), and to interface with the Api */
const AppActions = {
    addLog: function (log) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_LOG,
            log: log
        });

        LogApi.create(log, (log) => {
            AppDispatcher.handleServerAction({
                actionType: AppConstants.ADD_LOG_SUCCESS,
                log: log
            });
        }, (error) => {
            AppDispatcher.handleServerAction({
                actionType: AppConstants.ADD_LOG_FAIL,
                error: error
            });
        });
    },
    getLogs: function() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_LOGS
        });

        LogApi.getAll( (logs) => {
            AppDispatcher.handleServerAction({
                actionType: AppConstants.GET_LOGS_SUCCESS,
                logs: logs
            });
        }, (error) => {
            AppDispatcher.handleServerAction({
                actionType: AppConstants.GET_LOGS_FAIL,
                error: error
            });
        });
    }
};

export default AppActions;