<template>
    <div class="navbox">
        <h1>
            <a href="#" title="GEO内部线索管理系统" class="logo">
                <img :src="logo" alt="GEO内部线索管理系统" />
            </a>
        </h1>
        <ul>
            <li>
                <router-link to="/data/index/">
                    <span>
                        <i class="icon icon01"></i>数据管理</span>
                </router-link>
                <ul>
                    <li v-for="item in modelNav">
                        <router-link :to="{path:'/data/detail',query:{id:item.id,name:item.model_name}}">
                            <span>{{item.model_name}}</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <router-link to="/task/index/">
                    <span>
                        <i class="icon icon02"></i>任务管理</span>
                </router-link>
                <ul>
                    <li>
                        <router-link to="/task/status/">
                            <span>任务状态</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="current">
                <a href="产品管理.html">
                    <span>
                        <i class="icon icon03"></i>产品管理</span>
                </a>
                <ul>
                    <li>
                        <router-link to="/product/sms/index/">
                            <span>短信营销</span>
                        </router-link>
                        <ul>
                            <li>
                                <router-link to="/product/sms/tunnel/">
                                    <span>通道管理</span>
                                </router-link>
                            </li>
                            <li class="active">
                                <router-link to="/product/sms/template/list">
                                    <span>模板管理</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/product/sms/customer/index">
                                    <span>客户管理</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/product/sms/certificate/index">
                                    <span>资质管理</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link to="/product/goldlib/index/">
                            <span>小金库</span>
                        </router-link>
                        <ul>
                            <li>
                                <router-link to="/product/goldlib/user/">
                                    <span>客户管理</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import logo from 'assets/img/logo.png'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                logo: logo,
                modelNav: []
            }
        },
        computed: {
            path() {
                return this.$route.path
            }
        },
        created() {
            this.$ajax({
                url: API.models_get,
                data: {},
                success: data => {
                    if (data.code == 200) {
                        this.modelNav = data.data
                    }
                }
            })
        }
    }

</script>