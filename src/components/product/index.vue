<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <div class="tag-nav">
                    <router-link v-for="(item,index) in productList" :to="{path:'/product/index',query:{id:index}}" :key="index" :class="{'active':navId==index}">{{item}}</router-link>
                </div>
                <div class="add-model">
                    <a href="javascript:void(0);" class="btn add" @click="add">
                        <span>
                            <i class="icon"></i>创建产品</span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="10%" label="客户">
                            <span>{{props.item.client_name}}</span>
                        </td>
                        <td v-if="navId==2" width="10%" label="项目">
                            <span>{{props.item.project_name}}</span>
                        </td>
                        <td width="10%" label="数据获取时间">
                            <span>{{props.item.date}}</span>
                        </td>
                        <td width="20%" label="需求量">
                            <span>{{props.item.single}}</span>
                        </td>
                        <td width="10%" label="去重后总量">
                            <span class="yellow">{{props.item.use}}</span>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <addDialog ref="addDialog"></addDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mtable from 'components/utils/table'
    import pages from 'components/common/pages'
    import addDialog from './add'
    export default {
        data() {
            return {
                productList: [],
                navId: '',
                customer: '',
                project: '',
                list: [],
                currentPage: 1,
                totalPage: 1
            }
        },
        watch: {
            $route(newVal, oldVal) {
                this.nav()
                this.initList()
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
        methods: {
            nav() {
                this.navId = this.$route.query.id || 1
            },
            add() {
                this.$refs.addDialog.$emit('show')
            },
            initList() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.$ajax({
                    url: API.product_index,
                    data: {
                        page: this.currentPage,
                        nums: 10,
                        product_id: this.navId
                    },
                    success: data => {
                        if (data.code == 200) {
                            if (data.data.list) {
                                this.list = data.data.list
                            } else {
                                this.list = []
                            }
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
            mtable,
            addDialog
        }
    }

</script>