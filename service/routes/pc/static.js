const express = require('express');
const router = express.Router();
const path = require('path');

// 静态文件展示
router.get('/img/*', function(req, res) {
    // let { filename } = req.params;
    // res.writeHead(200,{'Content-Type':'image/jpeg'});

    res.sendFile(path.resolve(__dirname, `../../static/${req.url}`));
});

module.exports = router;
