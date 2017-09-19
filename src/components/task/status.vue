<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <div class="tag-nav">
                    <router-link v-for="(item,index) in productList" :to="{path:'/task/status',query:{id:index}}" :key="index" :class="{'active':navId==index}">{{item}}</router-link>
                </div>
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-info">
                        <li>
                            <label class="name">日期：</label>
                            <div class="input-warp date-warp">
                                <div class="calendar-warp">
                                    <datepicker addClass="date text" :init="startDate" :max="maxStart" @change="setStart"></datepicker>
                                </div>
                                <em class="or">至</em>
                                <div class="calendar-warp">
                                    <datepicker addClass="date text" :init="endDate" :min="minEnd" :max="maxEnd" @change="setEnd"></datepicker>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">客户名称：</label>
                            <div class="input-warp">
                                <input class="text" v-model="customer" type="text">
                            </div>
                        </li>
                        <li v-show="navId==3||navId==4">
                            <label class="name">项目名称：</label>
                            <div class="input-warp">
                                <input class="text" v-model="project" type="text">
                            </div>
                        </li>
                        <li class="li-btn">
                            <button class="btn search" type="button" @click="search()">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                        <li class="li-download">
                            <a :href="exportURI" target="blank" class="btn" type="button">
                                <span>
                                    <i class="icon download"></i>导出报告</span>
                            </a>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>日期</th>
                                <th>客户</th>
                                <th>批次号</th>
                                <template v-if="navId==2">
                                    <th>发送量</th>
                                    <th>到达量</th>
                                    <th>点击量</th>
                                    <th>回复量</th>
                                    <th>到达率</th>
                                    <th>点击率</th>
                                </template>
                                <template v-if="navId==3||navId==4">
                                    <th>项目</th>
                                    <th>数据量</th>
                                </template>
                                <template v-if="navId==1">
                                    <th>数据量</th>
                                </template>
                                <th>操作</th>
                            </tr>
                            <tr v-for="item in list">
                                <td>{{item.date}}</td>
                                <td>{{item.client_name}}</td>
                                <td>{{item.batch}}</td>
                                <template v-if="navId==2">
                                    <td>{{item.send_num}}</td>
                                    <td>{{item.success_num}}</td>
                                    <td>{{item.click_num}}</td>
                                    <td>{{item.replay_num}}</td>
                                    <td>{{item.success_percentage}}%</td>
                                    <td>{{item.click_percentage}}%</td>
                                </template>
                                <template v-if="navId==3||navId==4">
                                    <td>{{item.project_name}}</td>
                                    <td>{{item.num}}</td>
                                </template>
                                <template v-if="navId==1">
                                    <td>{{item.num}}</td>
                                </template>
                                <td>
                                    <router-link :to="{path:'/task/status/detail',query:{id:item.id,date:item.date,customer:item.client_name,batch:item.batch}}">查看</router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mtable from 'components/utils/table'
    import pages from 'components/common/pages'
    import datepicker from 'components/utils/datepicker'
    import moment from 'moment'
    export default {
        data() {
            let now = moment().format('YYYY-MM-DD')
            return {
                productList: [],
                navId: '',
                startDate: '',
                endDate: '',
                customer: '',
                project: '',
                list: [],
                currentPage: 1,
                totalPage: 1,
                maxStart: now,
                minEnd: '',
                maxEnd: now,
            }
        },
        watch: {
            $route(newVal, oldVal) {
                this.nav()
                this.initList()
            }
        },
        computed:{
            exportURI(){
                let a = `${API.task_status_export}?product_id=${this.navId}&begin_date=${this.startDate}&end_date=${this.endDate}&client_name=${this.customer}`
                if(this.navId==3||this.navId==4){
                    a = a + `&project_name=${this.project}`
                }
                return a
            }
        },
        created() {
            this.$ajax({
                url: API.product_list,
                data: {},
                success: data => {
                    if (data.code == 200) {
                        this.productList = data.data
                        this.nav()
                        this.initList()
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        },
        mounted() {
            /* eslint-disable no-undef */
            this.datepicker = new Kalendae('#startDatepicker', {
                mode: 'single'
            })
            //this.datepicker.show()
        },
        methods: {
            nav() {
                this.navId = this.$route.query.id || 1
            },
            initList() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.startDate = this.$route.query.startDate ? this.$route.query.startDate : ''
                this.endDate = this.$route.query.endDate ? this.$route.query.endDate : ''
                this.customer = this.$route.query.customer ? this.$route.query.customer : ''
                this.project = this.$route.query.project ? this.$route.query.project : ''
                this.$ajax({
                    url: API.task_status_list,
                    data: {
                        page: this.currentPage,
                        nums: 10,
                        product_id: this.navId,
                        begin_date: this.startDate,
                        end_date: this.endDate,
                        client_name: this.customer,
                        project_name: this.project
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data.list || []
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
                    query = Object.assign({}, this.$route.query, {
                        startDate: this.startDate,
                        endDate: this.endDate,
                        customer: this.customer
                    })
                    if(this.navId==3||this.navId==4){
                        query.project = this.project
                    }
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            },
            setStart(value) {
                this.startDate = value
                this.minEnd = value
            },
            setEnd(value) {
                this.endDate = value
                this.maxStart = value
            }
        },
        components: {
            pages,
            mtable,
            datepicker
        }
    }

</script>