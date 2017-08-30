<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">短信营销</span>
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-info">
                        <li>
                            <label class="name">状态</label>
                            <mselect ref="statusSelect" :api="statusApi" :id="status"></mselect>
                        </li>
                        <li>
                            <label class="name">任务属性</label>
                            <mselect ref="typeSelect" :api="typeApi" :id="type"></mselect>
                        </li>
                        <li class="li-btn">
                            <button class="btn search" type="button" @click="search">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="20%" label="客户">
                            <span>{{props.item.client_name}}</span>
                        </td>
                        <td width="10%" label="投放日期">
                            <span>{{props.item.send_date}}</span>
                        </td>
                        <td width="10%" label="投放量">
                            <span>{{props.item.send_num}}</span>
                        </td>
                        <td width="10%" label="任务属性">
                            <span>{{props.item.task_type}}</span>
                        </td>
                        <td width="10%" label="当天状态">
                            <span :class="{yellow:props.item.today_status==2}">{{props.item.today_status_desc}}</span>
                        </td>
                        <td width="10%" label="操作">
                            <router-link :to="{path:'/product/sms/push/',query:{id:props.item.id,dataNum:props.item.send_num}}">{{props.item.today_status==2?'重新推送':'推送'}}</router-link>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import mselect from 'components/utils/select'
    import pages from 'components/common/pages'
    import mtable from 'components/utils/table'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                statusApi: API.sms_index_status,
                typeApi: API.sms_type_list,
                status: '',
                type: '',
                list: [],
                currentPage: 1,
                totalPage: 1,
                tunnel: '',
            }
        },
        created() {
            this.init()
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.status = this.$route.query.status != null ? this.$route.query.status : ''
                this.type = this.$route.query.type != null ? this.$route.query.type : ''
                this.getData()
            },
            getData() {
                this.$ajax({
                    url: API.sms_index_list,
                    data: {
                        page: this.currentPage,
                        nums: 10,
                        status: this.status,
                        type: this.type
                    },
                    success: (data) => {
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
                    query = Object.assign({}, {
                        status: this.$refs.statusSelect.selected.id,
                        type: this.$refs.typeSelect.selected.id
                    })
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            }
        },
        components: {
            mselect,
            pages,
            mtable
        }
    }

</script>