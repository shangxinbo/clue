let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "total": 100,
        "per_page": 10,
        "current_page": page,
        "last_page": 3,
        "next_page_url": "http://sms.geotmt.com/agent/list?page=3",
        "prev_page_url": "http://sms.geotmt.com/agent/list?page=1",
        "from": 2,
        "to": 2,
        "data|10": [
            [
                '@date',
                '@int(1,10100)',
                '@int(1,10100)',
                '@int(1,10100)',
                '@int(1,10100)',
                '@int(1,10100)',
                '@int(1,10100)',
                '@int(1,10100)',
                '@int(1,10100)',
                '@int(1,10100)',
            ]
        ],
        "header": [
            "日期",
            "总量",
            "已使用",
            "未使用",
            "短信营销",
            "短信营销去重量",
            "易获客yhk",
            "易获客yhk去重量",
            "易获客mdm",
            "易获客mdm去重量"
        ]
    })
}