let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return [
        {
            id: 6,
            costomer_name: "小青"
        },
        {
            id: 7,
            costomer_name: "妞妞"
        },
        {
            id: 8,
            costomer_name: "太吓人"
        }
    ]
}