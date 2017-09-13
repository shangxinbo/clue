<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">推送短信</span>
            </div>
            <div class="sms-push">
                <ul class="info">
                    <li>
                        <label class="name">客户：</label>
                        <span>{{client}}</span>
                    </li>
                    <li>
                        <label class="name">数据量：</label>
                        <span class="yellow">{{dataNum}}</span>
                    </li>
                    <li class="num" v-if="pushTime">
                        <label class="name">发送时间：</label>
                        <span>{{pushTime}}</span>
                    </li>
                </ul>
            </div>
            <div class="data-property task-box">
                <form>
                    <subTasked ref="subTasked" v-for="(item,key) in subtasked" :key="item.index" :index="key" :data="item" :templateList="templateList"></subTasked>
                    <subTask ref="subTask" v-for="(item,key) in task" :key="item.index" :index="subtasked.length + key" :templateList="templateList"
                        @del="delSub(item.index)"></subTask>
                    <div class="task-push" v-if="!task_type">
                        <div class="add-model">
                            <a href="javascript:void(0)" class="btn add" @click="addSubTask">
                                <span>
                                    <i class="icon"></i>创建新任务</span>
                            </a>
                        </div>
                    </div>
                    <div class="task-push">
                        <ul class="data-text">
                            <li class="li-date" v-if="!task_type">
                                <label class="name">发送时间</label>
                                <div class="input-warp">
                                    <label class="radio-warp" :class="{'radio-active':type==2}" for="sendDay" @click="type=2">
                                        <input type="radio" name="sendDay" class="radio">
                                        <i class="icon"></i>
                                        <span class="radioname">立即发送</span>
                                    </label>
                                    <label class="radio-warp" :class="{'radio-active':type==1}" for="sendWeekly" @click="type=1">
                                        <input type="radio" name="sendWeekly" class="radio">
                                        <i class="icon"></i>
                                        <span class="radioname">定时发送</span>
                                        <div class="date-warp">
                                            <span class="date">{{pushTime}}</span>
                                            <mselect ref="timeSelect" :initlist="timeList" :hideAll="true" @click.stop></mselect>
                                        </div>
                                    </label>
                                </div>
                            </li>
                            <li class="li-btn" v-if="!task_type">
                                <div class="input-warp">
                                    <button class="btn confirm" type="button" @click="submit">提交</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import subTask from './subTask'
    import subTasked from './subTasked'
    import mselect from 'components/utils/select'
    import API from 'src/services/api'
    export default {
        data() {
            let timeList = []
            for (let i = 8; i < 19; i++) {
                timeList.push({
                    id: i,
                    name: `${i}点`
                })
            }
            return {
                id: '',
                client: '',
                dataNum: '',
                pushTime: '',
                templateApi: API.sms_template_select,
                task: [],
                subtasked: [],
                taskNum: 0,
                templateList: [],
                timeList: timeList,
                type: 2,
                sms_task_id: '',
                task_type: 0
            }
        },
        created() {
            this.id = this.$route.query.id

            this.$ajax({
                url: API.tast_detail,
                data: {
                    task_id: this.id
                },
                success: data => {
                    if (data.code == 200) {
                        this.client = data.data.data_task.costomer_name
                        this.pushTime = data.data.data_task.send_date
                        this.subtasked = data.data.sms_subTask
                        this.type = data.data.sms_task.status || 2
                        this.sms_task_id = data.data.sms_task.id
                        this.dataNum = data.data.data_task.data_num
                        if (data.data.sms_task.is_send) {
                            this.task_type = data.data.data_task.type
                        }
                        if (!data.data.sms_subTask.length) {
                            this.task.push({ index: '0' })
                        }
                        this.$ajax({
                            url: this.templateApi,
                            data: {
                                client_id: data.data.data_task.client_id
                            },
                            success: data => {
                                if (data.code == 200) {
                                    this.templateList = data.data
                                } else {
                                    this.$toast(data.message)
                                }
                            }
                        })
                    } else {
                        this.$toast(data.message)
                    }
                }
            })

        },
        methods: {
            addSubTask() {
                this.taskNum++
                this.task.push({ index: this.taskNum })
            },
            delSub(index) {
                this.task.forEach((item, key) => {
                    if (item.index == index)
                        this.task.splice(key, 1)
                })
            },
            submit() {
                let task = this.$refs.subTask
                let tasked = this.$refs.subTasked
                let arr = []
                let sumNum = 0
                let canSubmit = true
                if (tasked) {
                    tasked.forEach((item, index) => {
                        if (parseInt(item.num)) {
                            arr.push({
                                id: item.data.id,
                                template_id: item.data.template_id,
                                flag: item.data.flag,
                                channel: item.data.channel,
                                percent: parseInt(item.num),
                                style: item.track
                            })
                            sumNum += parseInt(item.num)
                        } else {
                            canSubmit = false
                        }
                    })
                }
                if (task) {
                    task.forEach((item, index) => {
                        if (parseInt(item.num)) {
                            arr.push({
                                id: '',
                                template_id: item.selected.id,
                                flag: item.tunnel.id,
                                channel: item.tunnel.name,
                                percent: parseInt(item.num),
                                style: item.track
                            })
                            sumNum += parseInt(item.num)
                        } else {
                            canSubmit = false
                        }
                    })
                }


                if (sumNum != 100) {
                    this.$toast('数据量占比之和不等于100%')
                    return false
                }

                if (canSubmit) {
                    this.$ajax({
                        url: API.task_save,
                        data: {
                            task_id: this.id,
                            status: this.type,
                            time: this.$refs.timeSelect.selected.id,
                            sms_task_id: this.sms_task_id,
                            task: arr
                        },
                        success: data => {
                            if (data.code == 200) {
                                this.$toast('已经加入推送队列', () => {
                                    this.$router.replace('/product/sms/index')
                                })
                            } else {
                                this.$toast(data.message)
                            }
                        }
                    })
                } else {
                    this.$alert('请注意，有任务的数据量占比不是整数')
                }
            }
        },
        components: {
            subTask,
            subTasked,
            mselect
        }
    }

</script>