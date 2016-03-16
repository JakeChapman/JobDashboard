import AppLog from '../models/AppLog.js';
import express from 'express';

const router = express.Router();

router.route('/logs')

    // create a AppLog (accessed at POST http://localhost:3000/api/logs)
    .post(function(req, res) {

        // logs must have a title
        if (!req.body.title) {
            return res.status(400).send('Name field is required!');
        }

        // create the AppLog and check for errors
        AppLog.create(req.body, function(err, log) {
            if (err) return errorHandler(res, err);

            res.json(log);
        });
    })

    // get all the AppLogs (accessed at GET http://localhost/api/logs)
    .get(function(req, res) {
        AppLog.find(function(err, logs) {
            if (err) return errorHandler(res, err);

            res.json(logs);
        });
    });

router.route('/logs/:log_id')

    // get the AppLog with that id (accessed at GET http://localhost:8080/api/logs/:log_id)
    .get(function(req, res) {
        AppLog.findOne({id: req.params.log_id}, function(err, log) {
            if (err) return errorHandler(res, err);

            if (!log) return notFoundHandler(res);

            res.json(log);
        });
    })

    // update the log with this id (accessed at PUT http://localhost:8080/api/logs/:log_id)
    .put(function(req, res) {
        AppLog.update({id: req.params.log_id}, req.body, function(err, log) {
            if (err) return errorHandler(res, err);

            if (!log) return notFoundHandler(res);

            res.json(log);
        });
    })

    // delete the log with this id (accessed at DELETE http://localhost:8080/api/logs/:log_id)
    .delete(function(req, res) {
        AppLog.remove({
            id: req.params.log_id
        }, function(err, log) {
            if (err) return errorHandler(res, err);

            if (!log) return notFoundHandler(res);

            res.json(log);
        });
    });

module.exports = router;