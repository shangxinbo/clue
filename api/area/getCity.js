let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.province ? param.province : '北京'
    let ss = Mock.mock({
        "data|10": [
            {
                "city": '@city()',
                "area_code": '@natural'
            }
        ]
    })
    return ss.data
}