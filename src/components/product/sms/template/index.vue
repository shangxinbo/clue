<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">模板管理</span>
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-info">
                        <li>
                            <label class="name">客户名称</label>
                            <div class="input-warp">
                                <input class="text" type="text" v-model="customer">
                            </div>
                        </li>
                        <li class="li-btn">
                            <button class="btn search" type="button" @click="search">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                        <li class="li-download">
                            <div class="add-model">
                                <router-link to="/product/sms/template/add" class="btn add">
                                    <span>
                                        <i class="icon"></i>创建模板</span>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="20%" label="模板名称">
                            <span>{{props.item.name}}</span>
                        </td>
                        <td width="20%" label="客户">
                            <span>{{props.item.client_name}}</span>
                        </td>
                        <td width="50%" label="短信内容">
                            <span :title="props.item.preview_content">{{props.item.preview_content}}</span>
                        </td>
                        <td width="10%" label="操作">
                            <a href="产品管理-短信营销-模板管理-编辑模板.html">编辑</a>
                            <a href="javascript:void(0);" @click="del(props.item.id,props.item.name)">删除</a>
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
    import pages from 'components/common/pages'
    import mtable from 'components/utils/table'
    export default {
        data() {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1,
                customer: ''
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
                    url: API.sms_template_list,
                    data: {
                        name: this.customer,
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
            del(id,name){
                this.$confirm(`确定要删除此${name}`,()=>{
                    this.$ajax({
                        url:API.sms_template_del,
                        data:{
                            id:id
                        },
                        success:data =>{
                            if(data.code==200){
                                this.init()
                            }else{
                                this.$toast(data.message)
                            }
                        }
                    })
                })
            }
        },
        components: {
            pages,
            mtable
        }
    }

</script>