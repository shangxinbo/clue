<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">客户管理</span>
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-info">
                        <li>
                            <label class="name">客户名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="customer" type="text">
                            </div>
                        </li>
                        <li class="li-btn">
                            <button class="btn search" type="button" @click="search()">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                        <li class="li-download">
                            <div class="add-model">
                                <a href="javascript:void(0);" class="btn add" @click="showAdd()">
                                    <span>
                                        <i class="icon"></i>创建客户</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="30%" label="客户">
                            <span>{{props.item.costomer_name}}</span>
                        </td>
                        <td width="40%" label="操作">
                            <a href="javascript:void(0);" @click="showAdd(props.item.id,props.item.costomer_name)">编辑</a>
                            <a href="javascript:void(0);" @click="del(props.item.id,props.item.costomer_name)">删除</a>
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
    import pages from 'components/common/pages'
    import mtable from 'components/utils/table'
    import addDialog from './add'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1,
                customer: '',
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
                this.customer = this.$route.query.customer ? this.$route.query.customer : ''
                this.getData()
            },
            getData() {
                this.$ajax({
                    url: API.goldlib_user,
                    data: {
                        costomer_name: this.customer,
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
                    query = Object.assign({}, { customer: this.customer })
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            },
            showAdd(id,name) {
                this.$refs.addDialog.$emit('show',id,name)
            },
            del(id, name) {
                this.$confirm(`确定要删除此${name}`, () => {
                    this.$ajax({
                        url: API.goldlib_user_del,
                        data: {
                            id: id
                        },
                        success: data => {
                            if (data.code == 200) {
                                this.$toast('删除成功', () => {
                                    window.location.reload()
                                })
                            } else {
                                this.$toast(data.message)
                            }
                        }
                    })
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