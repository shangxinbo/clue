<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">资质管理</span>
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-info">
                        <li>
                            <label class="name">资质名称</label>
                            <mselect ref="certificateSelect" :initlist="types" :id="certificate"></mselect>
                        </li>
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
                                <router-link to="/product/sms/certificate/add" class="btn add">
                                    <span>
                                        <i class="icon"></i>新增客户资质</span>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="20%" label="序号">
                            <span>{{props.item.id}}</span>
                        </td>
                        <td width="20%" label="资质名称">
                            <span>{{certificate_text(props.item.qualification_id)}}</span>
                        </td>
                        <td width="20%" label="客户名称">
                            <span>{{customer_text(props.item.customer_id)}}</span>
                        </td>
                        <td width="20%" label="操作">
                            <a :href="`/costomer/download?id=${props.item.id}`" target="black">下载资质</a>
                            <router-link :to="{path:'/product/sms/certificate/edit/',query:{
                                id:props.item.id,
                                certificate:certificate_text(props.item.qualification_id),
                                customer:customer_text(props.item.customer_id),
                                pic:props.item.qualification_path
                            }}">重新上传</router-link>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import pages from 'components/common/pages'
    import mtable from 'components/utils/table'
    import mselect from 'components/utils/select'
    import API from 'src/services/api'

    let types = [{ id: 1, name: '营业执照' }, { id: 2, name: '授权书' }, { id: 3, name: '其他' }]

    export default {
        data() {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1,
                customer: '',
                certificate: '',
                types: types,
                customer_list: []
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
            certificate_text(val) {
                switch (val) {
                    case 1: return '营业执照'
                    case 2: return '授权书'
                    default: return '其他'
                }
            },
            customer_text(val) { //maybe filter more fitable
                let text = ''
                this.customer_list.forEach((item, index) => {
                    if (item.id == val)
                        text = item.costomer_name
                })
                return text
            },
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.customer = this.$route.query.customer ? this.$route.query.customer : ''
                this.certificate = this.$route.query.certificate ? this.$route.query.certificate : ''
                this.$ajax({
                    url: API.sms_customer_all,
                    data: {},
                    success: data => {
                        if (data.code == 200) {
                            this.customer_list = data.data
                            this.getData()
                        } else {
                            this.$toast('获取客户列表失败')
                        }
                    }
                })
            },
            getData() {
                this.$ajax({
                    url: API.sms_certificate_list,
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
                    query = Object.assign({}, { customer: this.customer, certificate: this.$refs.certificateSelect.selected.id })
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            },
        },
        components: {
            pages,
            mtable,
            mselect
        }
    }

</script>