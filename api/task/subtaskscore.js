let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return {
        "list": [
            {
                "level": "0.0",
                "cnt": 1,
                "click": 1,
                "reply": 0
            },
            {
                "level": "0.1",
                "cnt": 2,
                "click": 2,
                "reply": 1
            },
            {
                "level": 0.2,
                "cnt": 0,
                "is_click": 0,
                "is_reply": 0
            },
            {
                "level": "0.3",
                "cnt": 2,
                "click": 1,
                "reply": 0
            },
            {
                "level": 0.4,
                "cnt": 0,
                "is_click": 0,
                "is_reply": 0
            },
            {
                "level": 0.5,
                "cnt": 0,
                "is_click": 0,
                "is_reply": 0
            },
            {
                "level": 0.6,
                "cnt": 0,
                "is_click": 0,
                "is_reply": 0
            },
            {
                "level": 0.7,
                "cnt": 0,
                "is_click": 0,
                "is_reply": 0
            },
            {
                "level": 0.8,
                "cnt": 0,
                "is_click": 0,
                "is_reply": 0
            },
            {
                "level": 0.9,
                "cnt": 0,
                "is_click": 0,
                "is_reply": 0
            }
        ]
    }
}