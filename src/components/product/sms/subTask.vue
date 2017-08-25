<template>
    <div class="task-push push-bg">
        <a href="javascript:void(0);" v-if="index>0" @click="del" class="icon push-close" title="删除任务"></a>
        <div class="title">任务{{index+1}}</div>
        <ul class="data-text">
            <li>
                <label class="name">短信模板</label>
                <mselect ref="templateSelect" :api="templateApi" :hideAll="true" @change="changeSelected"></mselect>
            </li>
            <li>
                <label class="name">短信渠道</label>
                <mselect ref="tunnelSelect" :api="tunnelApi" @change="changeTunnel" :hideAll="true"></mselect>
            </li>
            <li>
                <label class="name">数据量占比</label>
                <div class="input-warp">
                    <input class="text w200" v-model.number="num" type="text" @change="checkNum"><span>%</span>
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
    import mselect from 'components/utils/select'
    import API from 'src/services/api'
    export default {
        props: ['templateList', 'index'],
        data() {
            return {
                tunnelApi: API.tunnel_select_list,
                templateApi: API.sms_template_select,
                content: '',
                selected: '',
                tunnel: '',
                num: ''
            }
        },
        watch: {
            templateList() {
                this.changeView()
            },
            selected(newVal, oldVal) {
                this.changeView()
            }
        },
        methods: {
            changeSelected(selected) {
                this.selected = selected
            },
            changeTunnel(selected) {
                this.tunnel = selected
            },
            changeView() {
                if (this.templateList.length > 0 && this.selected) {
                    this.templateList.forEach((item, index) => {
                        if (item.id == this.selected.id) {
                            this.content = item.preview_content
                        }
                    })
                }
            },
            checkNum() {
                if (isNaN(this.num)) {
                    this.num = 0
                } else {
                    this.num = parseInt(this.num)
                }
            },
            del() {
                this.$emit('del')
            }
        },
        components: {
            mselect
        }
    }

</script>