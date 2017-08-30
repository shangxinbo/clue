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
                "model_id": '@natural(1,3)',
                "project_id": '@natural',
                "client_id": '@natural',
                "project_name": "@cname",
                "product_id": '@natural(1,3)',
                "client_name": "@cname",
                "weights": '@int(100)',
                "preview_content":'@ctitle',
                "send_type": '@int(100)',
                "send_time":  '@date("yyyy-MM-dd HH:mm:ss")',
                "data_num":  '@int(0,110000)',
                "product_name": "@cname"
            }
        ]
    })
}