let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return [
        {
            id: 1,
            model_name: "贷款"
        },
        {
            id: 2,
            model_name: '信用卡'
        },
        {
            id: 3,
            model_name: '教育'
        }
    ]
}