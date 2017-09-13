let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return {
        "zucp": "漫道短信",
        "welink": "微网通联",
        "chuanglan": "创蓝短信",
        "tianzheng": "天正短信"
    }
}