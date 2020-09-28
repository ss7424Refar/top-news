var express = require('express');
var endPoint = express();

var allowCrossDomain = function (req, res, next) {
    // 所有的接口都可以访问
    res.header('Access-Control-Allow-Origin', '*');
    // 自定义中间件，设置跨域需要的响应头
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
}
endPoint.use(allowCrossDomain)

// 仅用于调试
endPoint.get('/', function (req, res) {
    res.send('Hello World');
});

endPoint.get('/news', function (req, res) {
    var num = req.query.num
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://top.baidu.com/buzz?b=1&fr=topindex');

        await page.waitForSelector('.list-title');

        const item = await page.$$eval('.list-title', es => es.map(
            e => {
                return {
                    id : i++,
                    name: e.innerHTML,
                    href: e.href
                }
            }
        ));

        await browser.close();

        let limit = 10;
        let pages = Math.ceil(item.length / limit)

        let flag = true
        if (num > pages) {
            num = 1
            flag = false
        }

        let offset = (num -1) * limit

        let result = {
            flag: flag,
            data: JSON.stringify(item.slice(offset, offset + limit))
        }
        res.end(JSON.stringify(result))

    })();


})

endPoint.use(function (err, req, res, next) {
    res.status(err.status || 500).json(err.message);
});

var server = endPoint.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
