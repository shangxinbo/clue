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
                    <table>
                        <tbody>
                            <tr class="line">
                                <th>评分等级</th>
                                <th>0-0.1</th>
                                <th>0.1-0.2</th>
                                <th>0.2-0.3</th>
                                <th>0.3-0.4</th>
                                <th>0.4-0.5</th>
                                <th>0.5-0.6</th>
                                <th>0.6-0.7</th>
                                <th>0.7-0.8</th>
                                <th>0.8-0.9</th>
                                <th>0.9-1.0</th>
                            </tr>
                            <tr class="line">
                                <td>数量</td>
                                <td>47749</td>
                                <td>53103</td>
                                <td>20277</td>
                                <td>12502</td>
                                <td>6556</td>
                                <td>3554</td>
                                <td>2420</td>
                                <td>1751</td>
                                <td>1361</td>
                                <td>727</td>
                            </tr>
                            <tr>
                                <td>点击/回复量</td>
                                <td>142</td>
                                <td>233</td>
                                <td>121</td>
                                <td>91</td>
                                <td>56</td>
                                <td>34</td>
                                <td>29</td>
                                <td>21</td>
                                <td>14</td>
                                <td>5</td>
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
                            <span >{{props.item.url}}</span>
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
            this.init()
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.customer = this.$route.query.customer ? this.$route.query.customer : ''
                this.date = this.$route.query.date ? this.$route.query.date : ''
                this.id = this.$route.query.id
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