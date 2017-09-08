<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">{{title}}数据明细</span>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table v-if="headers.length>0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th v-for="item in headers">{{item}}</th>
                            </tr>
                            <tr v-for="item in list">
                                <td v-for="key in item">{{key}}</td>
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
    import pages from 'components/common/pages'
    export default {
        data() {
            return {
                currentPage: 1,
                totalPage: 1,
                headers: [],
                list: [],
                type: 1,
                title: ''
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
                this.type = this.$route.query.id ? this.$route.query.id : 1
                this.title = this.$route.query.name
                this.$ajax({
                    url: API.model_detail,
                    data: {
                        id: this.type
                    },
                    success: data => {
                        if (data.code == 200) {
                            if (data.data && data.data.header) {
                                this.headers = data.data.header
                                this.list = data.data.data
                                this.totalPage = Math.ceil(data.data.total / 10)
                            } else {
                                this.headers = []
                                this.list = []
                                this.totalPage = 1
                            }
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
            pages
        }
    }

</script>