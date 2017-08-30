let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "page": {
            "total": "100"
        },
        "list|10": [
            {
                "id": '@natural',
                "date": '@date()',
                "client_name": '@ctitle',
                "project_name": '@ctitle',
                "batch": '000003',
                "num": '@natural(0,20000)',
                "send_num": '@natural(0,20000)',
                "success_num": '@natural(0,20000)',
                "click_num": '@natural(0,20000)',
                "replay_num": '@natural(0,20000)',
                "click_percentage": '@natural(0,100)',
                "success_percentage": '@natural(0,100)'
            }
        ]
    })
}