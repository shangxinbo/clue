<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <div class="tag-nav">
                    <router-link v-for="item in modelList" :to="{path:'/data/index',query:{id:item.id}}" :key="item.id" :class="{'active':navId==item.id}">{{item.model_name}}</router-link>
                </div>
                <div class="add-model">
                    <a href="javascript:void(0);" @click="add" class="btn add">
                        <span>
                            <i class="icon"></i>创建模型</span>
                    </a>
                </div>
            </div>
            <div class="data-property">
                <div class="info">
                    <ul>
                        <li>
                            <span class="name">总量：</span>
                            <span class="num">20,170,727</span>
                        </li>
                    </ul>
                    <div class="calendar-warp">
                        <span class="name">日期：</span>
                        <input type="text" class="text date auto-kal" data-kal="mode:'single'" value="2017-08-15">
                    </div>
                </div>
                <div class="data-table">
                    <table>
                        <tbody>
                            <tr class="line">
                                <td>分值</td>
                                <td>0-0.1</td>
                                <td>0.1-0.2</td>
                                <td>0.2-0.3</td>
                                <td>0.3-0.4</td>
                                <td>0.4-0.5</td>
                                <td>0.5-0.6</td>
                                <td>0.6-0.7</td>
                                <td>0.7-0.8</td>
                                <td>0.8-0.9</td>
                                <td>0.9-1.0</td>
                                <td>总量</td>
                            </tr>
                            <tr>
                                <td>量级</td>
                                <td>60</td>
                                <td>60</td>
                                <td>60</td>
                                <td>60</td>
                                <td>60</td>
                                <td>60</td>
                                <td>60</td>
                                <td>60</td>
                                <td>60</td>
                                <td>60</td>
                                <td>600</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mode">
                    <ul>
                        <li>
                            <span class="name">余量：</span>
                            <span class="num">200,000</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table>
                        <tbody>
                            <tr>
                                <th>优先级</th>
                                <th>产品</th>
                                <th>客户</th>
                                <th>项目</th>
                                <th>量</th>
                                <th>投放日期</th>
                                <th>操作</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>小金库</td>
                                <td>宜信</td>
                                <td>I贷</td>
                                <td>
                                    <span class="yellow">200,000</span>
                                </td>
                                <td>2017-08-10</td>
                                <td>
                                    <a href="javascript:void(0);" onclick="getWindow('editAdjust');">调整</a>
                                </td>
                            </tr>
                            <tr class="tr2">
                                <td>2</td>
                                <td>小金库</td>
                                <td>宜信</td>
                                <td>I贷</td>
                                <td>
                                    <span class="yellow">200,000</span>
                                </td>
                                <td>2017-08-10</td>
                                <td>
                                    <a href="javascript:void(0);" onclick="getWindow('editAdjust');">调整</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page">
                    <a class="prev disabled" href="javascript:void(0);">上一页</a>
                    <a href="javascript:void(0);" class="active">1</a>
                    <a href="javascript:void(0);">2</a>
                    <a href="javascript:void(0);">3</a>
                    <span>...</span>
                    <a href="javascript:void(0);">19</a>
                    <a class="next" href="javascript:void(0);">下一页</a>
                </div>
            </div>
        </div>
        <addDialog ref="addDialog"></addDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import addDialog from './add.vue'
    export default {
        data() {
            return {
                modelList: [],
                navId: '',
            }
        },
        watch: {
            $route(newVal, oldVal) {
                this.nav()
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
            add() {
                this.$refs.addDialog.$emit('show')
            }
        },
        components:{
            addDialog
        }
    }

</script>