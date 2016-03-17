/* eslint no-console: 0 */
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../webpack.config.js');
const busboy = require('connect-busboy');
const fs = require('fs-extra');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const s3 = require('s3');


const isDeveloping = process.env.NODE_ENV !== 'production';

const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

    app.use(middleware);

    app.use(webpackHotMiddleware(compiler));
    //app.use(busboy());
    // allow cross-origin requests
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

// configure app to use bodyParser()
// this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.post('/upload', upload.single('resume'), function (req, res, next) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
        console.log(req.file);
        var client = s3.createClient({
            maxAsyncS3: 20,     // this is the default
            s3RetryCount: 3,    // this is the default
            s3RetryDelay: 1000, // this is the default
            multipartUploadThreshold: 20971520, // this is the default (20 MB)
            multipartUploadSize: 15728640, // this is the default (15 MB)
            s3Options: {
                accessKeyId: "AKIAJN5IWD2PHB62ONQQ",
                secretAccessKey: "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",
                // any other options are passed to new AWS.S3()
                // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
            }
        });

        var params = {
            localFile: req.file.path,

            s3Params: {
                Bucket: "jobdashboard",
                Key: "Resumes/" + req.file.originalname,
                // other options supported by putObject, except Body and ContentLength.
                // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
            },
        };
        var uploader = client.uploadFile(params);
        uploader.on('error', function(err) {
            console.error("unable to upload:", err.stack);
        });
        uploader.on('progress', function() {
            console.log("progress", uploader.progressMd5Amount,
                uploader.progressAmount, uploader.progressTotal);
        });
        uploader.on('end', function() {
            console.log("done uploading");
        });
        res.status(204).end();
        alert("Upload Completed");
    });
    // all of our API routes will prefixed with /api
    app.use('/api', require('./api/Log.js'));

    app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
    // all of our API routes will prefixed with /api
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

module.exports = app;
/*
app.listen(port, '0.0.0.0', function onStart(err) {
                if (err) {
                    console.log(err);
                }
                console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
    */