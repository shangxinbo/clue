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
                "status": '@natural(0,1)',
                "status_desc": "@cname",
                "client_name": '@ctitle',
                "project_name": '@ctitle',
                "product_name": '@ctitle',
                "send_date": '@ctitle',
                "data_num": '@natural(0,20000)'
            }
        ]
    })
}