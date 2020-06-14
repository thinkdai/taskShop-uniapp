const express = require('express');
const router = express.Router();
const path = require('path');
const logger = require('../../middleWare/logger');
const options = {
    headers: {
        'Content-Type': 'text/plain'
    }
};

// 请求日志
router.get('/access', function(req, res) {
    
    res.sendFile(path.resolve(__dirname, `../../log/pc/access.log`), options, function(err) {
        if (err) {
            logger.error(err.message);
        }
    });
});

// 错误日志
router.get('/error', function(req, res) {
    res.writeHead(200,{'Content-Type':'image/jpeg'});
    res.sendFile(path.resolve(__dirname, `../../log/pc/error.log`), options, function(err) {
        if (err) {
            logger.error(err.message);
        }
    });
});

module.exports = router;
