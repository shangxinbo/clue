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
                "client_name": '@ctitle',
                "project_name": '@ctitle',
                "date": '@ctitle',
                "single": '@natural(0,20000)',
                "use": '@natural(0,20000)'
            }
        ]
    })
}