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
    }
};

export default LogApi;