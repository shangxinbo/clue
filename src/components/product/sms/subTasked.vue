<template>
    <div class="task-push push-bg">
        <div class="title">任务{{index+1}}</div>
        <ul class="data-text">
            <li>
                <label class="name">短信模板</label>
                <div class="input-warp">
                    <span style="line-height:38px;font-size:16px;">{{template}}</span>
                </div>
            </li>
            <li>
                <label class="name">短信渠道</label>
                <div class="input-warp">
                    <span style="line-height:38px;font-size:16px;">{{data.channel}}</span>
                </div>
            </li>
            <li>
                <label class="name">数据量占比</label>
                <div class="input-warp">
                    <input class="text w200" v-model.number="num" type="text" @change="checkNum">
                    <span>%</span>
                </div>
            </li>
        </ul>
        <div class="sms-phone">
            <div class="inrr">
                <i class="bg-up"></i>
                <i class="bg-down"></i>
                <p>{{content}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['templateList', 'index', 'data'],
        data() {
            return {
                template: '',
                content: '',
                num: this.data.send_num
            }
        },
        watch: {
            templateList() {
                this.changeView()
            }
        },
        created() {
            if (this.templateList.length > 0) {
                this.changeView()
            }
        },
        methods: {
            changeView() {
                this.templateList.forEach(item => {
                    if (item.id == this.data.template_id) {
                        this.template = item.name
                        this.content = item.preview_content
                    }
                })
            },
            checkNum() {
                if (isNaN(this.num)) {
                    this.num = 0
                } else {
                    this.num = parseInt(this.num)
                }
            }
        }
    }

</script>