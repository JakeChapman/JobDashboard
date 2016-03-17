// The API layer which handles the actual syncing of Logs  with the server
import $ from 'jquery';

const BASE_URL = '/api/logs/';

const LogApi = {
    create: function (log, success, failure) {
        $.ajax({
            url: BASE_URL,
            type: 'POST',
            dataType: 'json',
            data: log,
            success: function (data) {
                success(data);
            },
            error: function () {
                failure();
            }
        });
    },
    getAll: function(success, failure) {
        $.ajax({
            url: BASE_URL,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                success(data);
            },
            error: function(xhr, status, error) {
                failure(error);
            }
        });
    },

    get: function(id, success, failure) {
        $.ajax({
            url: BASE_URL + id,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                success(data);
            },
            error: function(xhr, status, error) {
                failure(error);
            }
        });
    }
};

export default LogApi;