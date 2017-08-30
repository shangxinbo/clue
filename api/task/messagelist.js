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
                "task_id": '@natural',
                "client_name": '@ctitle',
                "send_date": '@ctitle',
                "task_type_id":'@natural(0,2)',
                "task_type":"投放任务",
                "today_status_desc": "待推送",
                "today_status":"@natural(0,1)",
                "send_num": '@int(0,10000)'
            }
        ]
    })
}