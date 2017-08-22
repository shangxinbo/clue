let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let channel_key = param.channel_key
    if (channel_key) {
        return [
            "Geo易获客",
            "平安普惠"
        ]
    }else{
        return []
    }
}