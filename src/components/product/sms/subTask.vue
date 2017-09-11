<template>
    <div class="task-push push-bg">
        <a href="javascript:void(0);" v-if="index>0" @click="del" class="icon push-close" title="删除任务"></a>
        <div class="title">任务{{index+1}}</div>
        <ul class="data-text">
            <li>
                <label class="name">短信模板</label>
                <mselect ref="templateSelect" :initlist="templateList" :hideAll="true" @change="changeSelected"></mselect>
            </li>
            <li>
                <label class="name">短信渠道</label>
                <mselect ref="tunnelSelect" :api="tunnelApi" :hideAll="true" @change="changeTunnel"></mselect>
            </li>
            <li>
                <label class="name">数据量占比</label>
                <div class="input-warp">
                    <input class="text w200" v-model.number="num" type="text" @change="checkNum">
                    <span>%</span>
                </div>
            </li>
            <li class="li-date">
                <label class="name">追踪手机号</label>
                <div class="input-warp radio-inline">
                    <label class="radio-warp" :class="{'radio-active':track==1}" for="numYes">
                        <input type="radio" name="numYes" class="radio">
                        <i class="icon" @click="track=1"></i>
                        <span class="radioname">是</span>
                    </label>
                    <label class="radio-warp" :class="{'radio-active':track==0}" for="numNo">
                        <input type="radio" name="numNo" class="radio">
                        <i class="icon" @click="track=0"></i>
                        <span class="radioname">否</span>
                    </label>
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
                content: '',
                selected: '',
                tunnel: '',
                track: 1,
                num: ''
            }
        },
        watch: {
            templateList(val) {
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
                if (isNaN(this.num)||this.num<0) {
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