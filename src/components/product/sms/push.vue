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
                        <label class="name">项目：</label>
                        <span>{{project}}</span>
                    </li>
                    <li>
                        <label class="name">批次：</label>
                        <span>{{batch}}</span>
                    </li>
                    <li>
                        <label class="name">数据量：</label>
                        <span class="yellow">{{dataNum}}</span>
                    </li>
                    <li class="num">
                        <label class="name">发送时间：</label>
                        <span>{{pushTime}}</span>
                    </li>
                </ul>
            </div>
            <div class="data-property task-box">
                <form>
                    <subTask v-for="(item,key) in task" :key="item.index" :index="key" :templateList="templateList" @del="delSub(item.index)"></subTask>
                    <div class="task-push">
                        <div class="add-model">
                            <a href="javasript:void(0)" class="btn add" @click="addSubTask">
                                <span>
                                    <i class="icon"></i>创建新任务</span>
                            </a>
                        </div>
                    </div>
                    <div class="task-push">
                        <ul class="data-text">
                            <li class="li-date">
                                <label class="name">发送时间</label>
                                <div class="input-warp">
                                    <label class="radio-warp" :class="{'radio-active':type==0}" for="sendDay" @click="type=0">
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
                                            <mselect :initlist="timeList" :hideAll="true" @click.stop></mselect>
                                        </div>
                                    </label>
                                </div>
                            </li>
                            <li class="li-btn">
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
    import mselect from 'components/utils/select'
    import API from 'src/services/api'
    export default {
        data() {
            let timeList = []
            for (let i = 1; i < 25; i++) {
                timeList.push({
                    id: i,
                    name: `${i}点`
                })
            }
            return {
                client: '',
                project: '',
                batch: '',
                dataNum: '',
                pushTime: '',
                templateApi: API.sms_template_select,
                task: [{ index: '0', template: '', tunnel: '', num: 0 }],
                taskNum: 0,
                templateList: [],
                timeList: timeList,
                type:0
            }
        },
        created() {
            this.client = this.$route.query.client
            this.project = this.$route.query.project
            this.batch = this.$route.query.batch
            this.dataNum = this.$route.query.dataNum
            this.pushTime = this.$route.query.pushTime

            this.$ajax({
                url: this.templateApi,
                data: {},
                success: data => {
                    this.templateList = data.data
                }
            })
        },
        methods: {
            addSubTask() {
                this.taskNum++
                this.task.push({ index: this.taskNum, template: '', tunnel: '', num: 0 })
            },
            delSub(index) {
                this.task.forEach((item, key) => {
                    if (item.index == index)
                        this.task.splice(key, 1)
                })
            },
            submit(){
                
            }
        },
        components: {
            subTask,
            mselect
        }
    }

</script>