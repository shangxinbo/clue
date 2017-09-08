<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <div class="tag-nav">
                    <router-link v-for="item in modelList" :to="{path:'/task/index',query:{id:item.id}}" :key="item.id" :class="{'active':navId==item.id}">{{item.model_name}}</router-link>
                </div>
                <div class="add-model">
                    <router-link to="/task/create" class="btn add">
                        <span>
                            <i class="icon"></i>创建投放任务</span>
                    </router-link>
                </div>
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-info">
                        <li>
                            <label class="name">产品</label>
                            <mselect ref="productSelect" :api="productApi" :id="product"></mselect>
                        </li>
                        <li>
                            <label class="name">客户名称：</label>
                            <div class="input-warp">
                                <input class="text" v-model="customer" type="text">
                            </div>
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
                        <td width="10%" label="客户">
                            <span>{{props.item.client_name}}</span>
                        </td>
                        <td width="10%" label="项目">
                            <span>{{props.item.project_name}}</span>
                        </td>
                        <td width="10%" label="产品">
                            <span>{{props.item.product_name}}</span>
                        </td>
                        <td width="20%" label="投放日期">
                            <span>{{props.item.send_date}}</span>
                        </td>
                        <td width="10%" label="投放量">
                            <span class="yellow">{{props.item.data_num|formatNum}}</span>
                        </td>
                        <td width="10%" label="操作">
                            <a href="javascript:void(0);" @click="edit(props.item.id,props.item.client_name,props.item.project_name,props.item.data_num)">编辑</a>
                            <a href="javascript:void(0)" @click="changeStatus(props.item.id,props.item.status)">{{props.item.status?'停止':'开始'}}</a>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <editDialog ref="editDialog"></editDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import mtable from 'components/utils/table'
    import pages from 'components/common/pages'
    import editDialog from './edit'
    export default {
        data() {
            return {
                modelList: [],
                navId: '',
                productApi: API.product_list,
                product: '',
                currentPage: 1,
                totalPage: 1,
                customer: '',
                list: []
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
        watch: {
            $route(newVal, oldVal) {
                this.nav()
                this.initList()
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
                        this.initList()
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
            initList() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.customer = this.$route.query.customer ? this.$route.query.customer : ''
                this.product = this.$route.query.product ? this.$route.query.product : ''
                this.$ajax({
                    url: API.task_list,
                    data: {
                        page: this.currentPage,
                        nums: 10,
                        model_id: this.navId,
                        product_id: this.product,
                        client_name: this.customer
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
                    query = Object.assign({}, {
                        customer: this.customer,
                        product: this.$refs.productSelect.selected.id
                    })
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            },
            changeStatus(id, status) {
                this.$confirm(`是否${status ? '停止' : '开始'}该任务`, () => {
                    this.$ajax({
                        url: API.task_change_status,
                        data: {
                            task_id: id,
                            status: status == 1 ? 0 : 1
                        },
                        success: data => {
                            if (data.code == 200) {
                                window.location.reload()
                            } else {
                                this.$toast(data.message)
                            }
                        }
                    })
                })
            },
            edit(id, customer, project, count) {
                this.$refs.editDialog.$emit('show', id, customer, project, count)
            }
        },
        components: {
            mselect,
            pages,
            mtable,
            editDialog
        }
    }

</script>