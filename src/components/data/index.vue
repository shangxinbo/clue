<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <div class="tag-nav">
                    <router-link v-for="item in modelList" :to="{path:'/data/index',query:{id:item.id}}" :key="item.id" :class="{'active':navId==item.id}">{{item.model_name}}</router-link>
                </div>
                <div class="add-model">
                    <a href="javascript:void(0);" @click="add" class="btn add">
                        <span>
                            <i class="icon"></i>创建模型</span>
                    </a>
                </div>
            </div>
            <div class="data-property">
                <div class="info">
                    <ul>
                        <li>
                            <span class="name">总量：</span>
                            <span class="num">{{total|formatNum}}</span>
                        </li>
                    </ul>
                    <div class="calendar-warp">
                        <span class="name">日期：</span>
                        <datepicker addClass="date text" :init="date" :max="maxDate" @change="selectByDate"></datepicker>
                    </div>
                </div>
                <div class="data-table">
                    <table v-if="sum.length>0">
                        <tbody>
                            <tr class="line">
                                <td>分值</td>
                                <td v-for="item in sum">{{item.weight}}</td>
                                <td>总量</td>
                            </tr>
                            <tr>
                                <td>量级</td>
                                <td v-for="item in sum">{{item.cnt}}</td>
                                <td>{{sumTotal}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <div class="mode">
                    <ul>
                        <li>
                            <span class="name">余量：</span>
                            <span class="num">{{left|formatNum}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="10%" label="优先级">
                            <span>{{props.item.weights}}</span>
                        </td>
                        <td width="10%" label="产品">
                            <span>{{props.item.product_name}}</span>
                        </td>
                        <td width="10%" label="客户">
                            <span>{{props.item.client_name}}</span>
                        </td>
                        <td width="10%" label="项目">
                            <span>{{props.item.project_name}}</span>
                        </td>
                        <td width="10%" label="量">
                            <span class="yellow">{{props.item.data_num|formatNum}}</span>
                        </td>
                        <td width="10%" label="投放日期">
                            <span>{{props.item.send_time}}</span>
                        </td>
                        <td width="10%" label="操作">
                            <a href="javascript:void(0)" @click="change(props.item.id,props.item.product_name,props.item.client_name,props.item.weights,props.item.data_num)">调整</a>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <addDialog ref="addDialog"></addDialog>
        <changeDialog ref="changeDialog"></changeDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import mtable from 'components/utils/table'
    import addDialog from './add'
    import changeDialog from './change'
    import datepicker from 'components/utils/datepicker'
    import moment from 'moment'
    export default {
        data() {
            let now = moment().format('YYYY-MM-DD')
            return {
                modelList: [],
                navId: '',
                date: '',
                list: [],
                currentPage: 1,
                totalPage: 1,
                sum: [],
                left: '',
                total: '',
                maxDate: now
            }
        },
        watch: {
            $route(newVal, oldVal) {
                this.date = ''
                this.nav()
                this.getList()
                this.getSum()
            }
        },
        filters: {
            formatNum(val) {
                try {
                    return val.toString().replace(/\d+?(?=(?:\d{3})+$)/img, "$&,")
                } catch (e) {
                    return NaN
                }
            }
        },
        computed: {
            sumTotal() {
                let num = 0
                this.sum.forEach((item, index) => {
                    num += item.cnt
                })
                return num
            }
        },
        created() {
            this.$ajax({
                url: API.models_get,
                data: {},
                success: data => {
                    if (data.code == 200) {
                        this.modelList = data.data
                        this.nav()
                        this.getList()
                        this.getSum()
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        },
        methods: {
            nav() {
                this.navId = this.$route.query.id || this.modelList[0].id
            },
            add() {
                this.$refs.addDialog.$emit('show')
            },
            getSum() {
                this.$ajax({
                    url: API.model_get_sum,
                    data: {
                        id: this.navId,
                        date: this.date
                    },
                    success: data => {
                        if (data.code == 200) {
                            //console.log(data.data)
                            if (data.data && data.data.data_json) {
                                this.sum = JSON.parse(data.data.data_json)
                                this.left = data.data.left
                                this.total = data.data.data_count
                            } else {
                                this.sum = []
                                this.left = 0
                                this.total = 0
                            }

                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            },
            getList() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.$ajax({
                    url: API.model_data_list,
                    data: {
                        id: this.navId
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data.data
                            this.totalPage = Math.ceil(data.data.total / data.data.per_page)
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            },
            selectByDate(val) {
                this.date = val
                this.getSum()
            },
            change(id, product, customer, weight, count) {
                this.$refs.changeDialog.$emit('show', id, product, customer, weight, count, this.navId)
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
            mtable,
            addDialog,
            changeDialog,
            datepicker
        }
    }

</script>