<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-412px','margin-top':'-324px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>编辑任务</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>客户名称</label>
                    <div class="input-warp">
                        <p class="text">{{customer}}</p>
                    </div>
                </li>
                <li>
                    <label>项目名称</label>
                    <div class="input-warp">
                        <p class="text">{{project}}</p>
                    </div>
                </li>
                <li>
                    <label>投放量</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="count">
                        <p v-if="count_error" class="tips error">{{count_error}}</p>
                    </div>
                </li>
                <li class="li-radio">
                    <label class="name">投放日期</label>
                    <div class="input-warp">
                        <div class="task-push">
                            <label class="radio-warp" :class="{'radio-active':dateType==1}" for="sendDay">
                                <input type="radio" name="sendDay" class="radio" checked="checked">
                                <i class="icon" @click="dateType=1"></i>
                                <span class="radioname">每天</span>
                            </label>
                            <label class="radio-warp" :class="{'radio-active':dateType==2}" for="sendWeekly">
                                <input type="radio" name="sendWeekly" class="radio">
                                <i class="icon" @click="dateType=2"></i>
                                <span class="radioname">每周</span>
                                <ul class="check-warp">
                                    <li v-for="item in dateWeek" :class="{active:item.checked}">
                                        <i class="icon" @click="item.checked=!item.checked"></i>
                                        <span>{{item.name}}</span>
                                    </li>
                                </ul>
                            </label>
                            <label class="radio-warp" :class="{'radio-active':dateType==3}" for="sendChoose">
                                <input type="radio" name="sendChoose" class="radio">
                                <i class="icon" @click="dateType=3"></i>
                                <span class="radioname">选择日期</span>
                                <div id="datepicker" class="auto-kal"></div>
                            </label>
                            <p v-if="date_error" class="tips error">{{date_error}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <button class="btn confirm" type="button" @click="sure">确定</button>
            <button class="btn cancel" type="button" @click="close">取消</button>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    export default {
        data() {
            return {
                id: '',
                customer: '',
                project: '',
                count: '',
                count_error: '',
                style: 'none',
                dateType: 1,
                datapicker: null,
                dateWeek: [
                    { id: 1, name: '周一', checked: false },
                    { id: 2, name: '周二', checked: false },
                    { id: 3, name: '周三', checked: false },
                    { id: 4, name: '周四', checked: false },
                    { id: 5, name: '周五', checked: false },
                    { id: 6, name: '周六', checked: false },
                    { id: 7, name: '周日', checked: false }
                ],
                date_error: ''
            }
        },
        mounted() {
            /* eslint-disable no-undef */
            this.datepicker = new Kalendae('datepicker', {
                months: 3,
                mode: 'multiple',
                direction: 'today-future'
            })
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                if (!this.count) {
                    this.count_error = '请填写数据量'
                    return false
                } else {
                    let reg = /^[1-9]\d*$/
                    if (!reg.test(this.count)) {
                        this.count_error = '数据量格式不对'
                        return false
                    }
                }

                let dates = this.datepicker.getSelected()
                let sendTime = ''
                if (this.dateType == 2) {
                    let tag = false
                    this.dateWeek.forEach((item, index) => {
                        if (item.checked) tag = true
                    })
                    if (!tag) {
                        this.date_error = '请选择日期'
                        return false
                    }
                    sendTime = []
                    this.dateWeek.forEeach((item, index) => {
                        if (item.checked) {
                            sendTime.push(item.id)
                        }
                    })
                } else if (this.dateType == 3) {
                    if (!dates) {
                        this.date_error = '请选择日期'
                        return false
                    }
                    sendTime = dates.split(',')
                }

                this.$ajax({
                    url: API.task_edit,
                    data: {
                        id: this.id,
                        data_num: this.count,
                        send_type: this.dateType,
                        send_time: sendTime
                    },
                    success: data => {
                        this.close()
                        if (data.code == 200) {
                            this.$toast('编辑成功', () => {
                                window.location.reload()
                            })
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            }
        },
        created() {
            this.$on('show', function (id, customer, project, count, type, date) {
                this.style = 'block'
                this.id = id
                this.customer = customer
                this.project = project
                this.count = count
                this.$store.commit('SHOW_LAYER')
                this.dateWeek.forEach(item => {
                    item.checked = false
                })
                if (type == '具体日期') {
                    let selected = this.datepicker.getSelected()
                    this.datepicker.removeSelected(selected)
                    this.datepicker.setSelected(date)
                    this.datepicker.draw()
                    this.dateType = 3
                } else {
                    if (type == '固定日期') {
                        let arr = date.split(',')
                        arr.forEach((item, index) => {
                            this.dateWeek.forEach(day => {
                                if (day.name == item.replace('星期', '周').trim()) {
                                    day.checked = true
                                }
                            })
                        })
                        this.dateType = 2
                    } else {
                        this.dateType = 1
                    }
                    let selected = this.datepicker.getSelected()
                    this.datepicker.removeSelected(selected)
                    this.datepicker.draw()
                }

            })
        }
    }

</script>