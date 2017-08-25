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
            {
                "id": '@natural',
                "subtask_id": '@natural',
                "data_id": '@natural',
                "flag": "zucp",
                "betch_no": "123143452535234634",
                "send_num": '@natural',
                "success_num": '@natural',
                "click_num": '@natural',
                "replay_num": '@natural',
                "created_at":  '@date("yyyy-MM-dd HH:mm:ss")',
                "updated_at":  '@date("yyyy-MM-dd HH:mm:ss")',
                "channel": "@cname"
            }
        ]
    })
}