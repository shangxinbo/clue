<template>
    <div class="navbox">
        <h1>
            <router-link to="/" title="GEO内部线索管理系统" class="logo">
                <img :src="logo" alt="GEO内部线索管理系统" />
            </router-link>
        </h1>
        <ul>
            <li :class="{current:path.startsWith('/data'),active:path.startsWith('/data/index')}">
                <router-link to="/data/index/">
                    <span>
                        <i class="icon icon01"></i>数据管理</span>
                </router-link>
                <ul>
                    <li v-for="item in modelNav" :class="{active:path.startsWith('/data/detail')&&query.id==item.id}">
                        <router-link :to="{path:'/data/detail',query:{id:item.id,name:item.model_name}}">
                            <span>{{item.model_name}}</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li :class="{current:path.startsWith('/task'),active:path.startsWith('/task/index')||path.startsWith('/task/create')}">
                <router-link to="/task/index/">
                    <span>
                        <i class="icon icon02"></i>任务管理</span>
                </router-link>
                <ul>
                    <li :class="{active:path.startsWith('/task/status')}">
                        <router-link to="/task/status/">
                            <span>任务状态</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li :class="{current:path.startsWith('/product'),active:path.startsWith('/product/index')}">
                <router-link to="/product/index">
                    <span>
                        <i class="icon icon03"></i>产品管理</span>
                </router-link>
                <ul>
                    <li :class="{active:path.startsWith('/product/sms/index')||path.startsWith('/product/sms/push')}">
                        <router-link to="/product/sms/index/">
                            <span>短信营销</span>
                        </router-link>
                        <ul>
                            <li :class="{active:path.startsWith('/product/sms/tunnel')}">
                                <router-link to="/product/sms/tunnel/">
                                    <span>通道管理</span>
                                </router-link>
                            </li>
                            <li :class="{active:path.startsWith('/product/sms/template')}">
                                <router-link to="/product/sms/template/list">
                                    <span>模板管理</span>
                                </router-link>
                            </li>
                            <li :class="{active:path.startsWith('/product/sms/customer')}">
                                <router-link to="/product/sms/customer/index">
                                    <span>客户管理</span>
                                </router-link>
                            </li>
                            <li :class="{active:path.startsWith('/product/sms/certificate')}">
                                <router-link to="/product/sms/certificate/index">
                                    <span>资质管理</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li :class="{active:path.startsWith('/product/goldlib/index')}">
                        <router-link to="/product/goldlib/index/">
                            <span>小金库</span>
                        </router-link>
                        <ul>
                            <li :class="{active:path.startsWith('/product/goldlib/user')}">
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
            },
            query() {
                return this.$route.query
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