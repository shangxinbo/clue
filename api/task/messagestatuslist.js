module.exports = function (req, res) {
    return [
        {
            "code": 0,
            "desc": "待推送"
        },
        {
            "code": 1,
            "desc": "已推送"
        },
        {
            "code": 2,
            "desc": "推送失败"
        }
    ]
}