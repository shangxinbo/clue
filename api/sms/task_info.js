let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return {
        "sms_subTask": [
            {
                "id": 3,
                "sms_task_id": 3,
                "data_task_id": 1,
                "template_id": 2,
                "send_num": 100,
                "send_percent": "10",
                "flag": "zucp",
                "channel": "漫道短信",
                "sms_account": "geo-sales-03",
                "sms_key": "7c7c08836e2ae5b69ec7c8dbe5fe165a",
                "channel_extend": "2975663",
                "created_at": "2017-08-24 15:53:20",
                "updated_at": "2017-08-24 15:53:20"
            }
        ],
        "sms_task": {
            "id": 3,
            "data_task_id": 2,
            "status": 2,
            "time": "",
            "is_send": 0,
            "created_at": "2017-08-24 15:53:20",
            "updated_at": "2017-08-24 19:16:06"
        },
        "data_task": {
            "id": 2,
            "type": 2,
            "model_id": 1,
            "project_type": 2,
            "client_id": 7,
            "product_id": 2,
            "project_id": 2,
            "area": "",
            "weights": 0,
            "send_type": "",
            "send_time": "",
            "status": 0,
            "upload_path": "",
            "send_date": "201211",
            "created_at": null,
            "updated_at": null,
            "customer_name": "妞妞"
        }
    }
}