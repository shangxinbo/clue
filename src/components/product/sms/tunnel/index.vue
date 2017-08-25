<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">通道管理</span>
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-info">
                        <li>
                            <label class="name">通道名称</label>
                            <mselect ref="tunnelSelect" :api="tunnelApi" :id="tunnel"></mselect>
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
                        <td width="40%" label="通道名称">
                            <span>{{props.item.channel}}</span>
                        </td>
                        <td width="30%" label="发送数量">
                            <span>{{props.item.send_num}}</span>
                        </td>
                        <td width="30%" label="成功数量">
                            <span>{{props.item.success_num}}</span>
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
                tunnelApi: API.tunnel_select_list,
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
                this.tunnel = this.$route.query.tunnel ? this.$route.query.tunnel : ''
                this.getData()
            },
            getData() {
                this.$ajax({
                    url: API.sms_tunnel_list,
                    data: {
                        flag: this.tunnel,
                        page: this.currentPage,
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            this.list = data.data.data
                            this.totalPage = Math.ceil(data.data.total / data.data.per_page)
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
                    query = Object.assign({}, { tunnel: this.$refs.tunnelSelect.selected.id })
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