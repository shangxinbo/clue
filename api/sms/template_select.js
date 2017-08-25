let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return [
        {
            "id": 1,
            "name": "尚德教育测试",
            "preview_content": "【尚德教育】尊敬的学员,尚德开学季大促，所有班型直降1000。详情 t.cn/8sz4PDS  退订TD"
        },
        {
            "id": 2,
            "name": "hold on",
            "preview_content": "【尚德教育】hahah"
        }
    ]
}