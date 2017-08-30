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
                "betch_no": '@natural',
                "send_num": '@natural(1,10000)',
                "success_num": '@natural(1,10000)',
                "click_num": '@natural(1,10000)',
                "replay_num": '@natural(1,10000)',
                "click_percentage": '@natural(1,100)',
                "success_percentage": '@natural(1,100)',
                "content": '@content',
                "url":"@url"
            }
        ]
    })
}