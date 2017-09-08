<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">任务状态详情</span>
            </div>
            <div class="sms-push">
                <ul class="info">
                    <li>
                        <label class="name">客户：</label>
                        <span>{{customer}}</span>
                    </li>
                    <li>
                        <label class="name">日期：</label>
                        <span>{{date}}</span>
                    </li>
                </ul>
            </div>
            <div class="data-property">
                <div class="data-table">
                    <table v-if="score.length>0">
                        <tbody>
                            <tr class="line">
                                <th>评分等级</th>
                                <th v-for="item in score">{{item.level}}</th>
                            </tr>
                            <tr class="line">
                                <td>数量</td>
                                <td v-for="item in score">{{item.cnt}}</td>
                            </tr>
                            <tr>
                                <td>点击/回复量</td>
                                <td v-for="item in score">{{item.click||item.reply}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="10%" label="子批次号">
                            <span>{{props.item.betch_no}}</span>
                        </td>
                        <td width="10%" label="发送量">
                            <span>{{props.item.send_num}}</span>
                        </td>
                        <td width="10%" label="到达量">
                            <span>{{props.item.success_num}}</span>
                        </td>
                        <td width="10%" label="点击量">
                            <span>{{props.item.click_num}}</span>
                        </td>
                        <td width="10%" label="回复量">
                            <span>{{props.item.replay_num}}</span>
                        </td>
                        <td width="10%" label="到达率">
                            <span>{{props.item.success_percentage}}%</span>
                        </td>
                        <td width="10%" label="点击率">
                            <span>{{props.item.click_percentage}}%</span>
                        </td>
                        <td width="10%" label="文案">
                            <span :title="props.item.content">{{props.item.content}}</span>
                        </td>
                        <td width="10%" label="URL">
                            <span>{{props.item.url}}</span>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mtable from 'components/utils/table'
    import pages from 'components/common/pages'
    export default {
        data() {
            return {
                id: '',
                date: '',
                customer: '',
                list: [],
                score: [],
                batch: '',
                currentPage: 1,
                totalPage: 1
            }
        },
        watch: {
            $route(newVal, oldVal) {
                this.init()
            }
        },
        created() {
            this.customer = this.$route.query.customer ? this.$route.query.customer : ''
            this.date = this.$route.query.date ? this.$route.query.date : ''
            this.batch = this.$route.query.batch ? this.$route.query.batch : ''
            this.id = this.$route.query.id
            this.init()
            this.$ajax({
                url: API.task_sub_status_score,
                data: {
                    batch: this.batch,
                    date: this.date
                },
                success: data => {
                    if (data.code == 200) {
                        this.score = data.data.list
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.$ajax({
                    url: API.task_status_detail,
                    data: {
                        page: this.currentPage,
                        nums: 10,
                        id: this.id
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data.list
                            this.totalPage = Math.ceil(data.data.page.total / 10)
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            },
            search(param) {
                let query
                if (!isNaN(param)) {
                    query = Object.assign({}, this.$route.query, { page: param })
                } else {
                    query = {}
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            }
        },
        components: {
            pages,
            mtable
        }
    }

</script>