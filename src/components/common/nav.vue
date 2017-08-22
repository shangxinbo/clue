<template>
    <div class="navbox">
        <h1><a href="#" title="GEO内部线索管理系统" class="logo"><img :src="logo" alt="GEO内部线索管理系统" /></a></h1>
        <ul>
            <li>
                <a href="数据管理.html"><span><i class="icon icon01"></i>数据管理</span></a>
                <ul>
                    <li>
                        <a href="数据管理-贷款数据明细.html"><span>贷款</span></a>
                    </li>
                    <li>
                        <a href="数据管理-信用卡数据明细.html"><span>信用卡</span></a>
                    </li>
                    <li>
                        <a href="数据管理-教育数据明细.html"><span>教育</span></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="任务管理.html"><span><i class="icon icon02"></i>任务管理</span></a>
                <ul>
                    <li>
                        <a href="任务管理-任务状态.html"><span>任务状态</span></a>
                    </li>
                </ul>
            </li>
            <li class="current">
                <a href="产品管理.html"><span><i class="icon icon03"></i>产品管理</span></a>
                <ul>
                    <li>
                        <a href="产品管理-短信营销.html"><span>短信营销</span></a>
                        <ul>
                            <li>
                                <a href="产品管理-短信营销-通道管理.html"><span>通道管理</span></a>
                            </li>
                            <li class="active">
                                <a href="产品管理-短信营销-模板管理.html"><span>模板管理</span></a>
                            </li>
                            <li>
                                <a href="产品管理-短信营销-客户管理.html"><span>客户管理</span></a>
                            </li>
                            <li>
                                <a href="产品管理-短信营销-资质管理.html"><span>资质管理</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="产品管理-小金库.html"><span>小金库</span></a>
                        <ul>
                            <li>
                                <a href="产品管理-小金库-客户管理.html"><span>客户管理</span></a>
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

    export default {
        data() {
            return {
                logo: logo,
                type: 2
            }
        },
        computed: {
            path() {
                return this.$route.path
            },
            yunying_role() {
                return this.$store.state.yunying_role
            }
        },
        created() {
            let user = JSON.parse(localStorage.getItem('user'))
            this.type = user.type
        }
    }

</script>