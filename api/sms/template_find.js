let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return {
        "id": 1,
        "client_id": 1,
        "name": "尚德教育测试",
        "content": "尊敬的学员,尚德开学季大促，所有班型直降1000。详情#url# 退订TD",
        "url": "http://music.163.com/#/song?id=371362",
        "status": 1,
        "preview_content": "【尚德教育】尊敬的学员,尚德开学季大促，所有班型直降1000。详情 t.cn/8sz4PDS  退订TD",
        "sign": "尚德教育",
        "created_at": "2017-08-22 10:48:58",
        "updated_at": "2017-08-22 10:56:08",
        "client_name": "光头强"
    }
}