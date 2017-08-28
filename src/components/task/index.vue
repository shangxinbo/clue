<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <div class="tag-nav">
                    <router-link v-for="item in modelList" :to="{path:'/task/index',query:{id:item.id}}" :key="item.id" :class="{'active':navId==item.id}">{{item.model_name}}</router-link>
                </div>
                <div class="add-model">
                    <a href="任务管理-创建投放任务.html" class="btn add">
                        <span>
                            <i class="icon"></i>创建投放任务</span>
                    </a>
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
                                <input class="text" type="text">
                            </div>
                        </li>
                        <li class="li-btn">
                            <button class="btn search" type="button">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table>
                        <tbody>
                            <tr>
                                <th>客户</th>
                                <th>项目</th>
                                <th>产品</th>
                                <th>投放日期</th>
                                <th>投放量</th>
                                <th>操作</th>
                            </tr>
                            <tr>
                                <td>平安</td>
                                <td>I贷</td>
                                <td>短信营销</td>
                                <td>每天</td>
                                <td>
                                    <span class="yellow">30,000</span>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" onclick="getWindow('editPop');">编辑</a>
                                    <a href="#">停止</a>
                                </td>
                            </tr>
                            <tr class="tr2">
                                <td>平安</td>
                                <td>I贷</td>
                                <td>短信营销</td>
                                <td>每天</td>
                                <td>
                                    <span class="yellow">30,000</span>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" onclick="getWindow('editPop');">编辑</a>
                                    <a href="#">停止</a>
                                </td>
                            </tr>
                            <tr>
                                <td>平安</td>
                                <td>I贷</td>
                                <td>短信营销</td>
                                <td>每天</td>
                                <td>
                                    <span class="yellow">30,000</span>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" onclick="getWindow('editPop');">编辑</a>
                                    <a href="#">停止</a>
                                </td>
                            </tr>
                            <tr class="tr2">
                                <td>平安</td>
                                <td>I贷</td>
                                <td>短信营销</td>
                                <td>每天</td>
                                <td>
                                    <span class="yellow">30,000</span>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" onclick="getWindow('editPop');">编辑</a>
                                    <a href="#">停止</a>
                                </td>
                            </tr>
                            <tr>
                                <td>平安</td>
                                <td>I贷</td>
                                <td>短信营销</td>
                                <td>每天</td>
                                <td>
                                    <span class="yellow">30,000</span>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" onclick="getWindow('editPop');">编辑</a>
                                    <a href="#">停止</a>
                                </td>
                            </tr>
                            <tr class="tr2">
                                <td>平安</td>
                                <td>I贷</td>
                                <td>短信营销</td>
                                <td>每天</td>
                                <td>
                                    <span class="yellow">30,000</span>
                                </td>
                                <td>
                                    <a href="javascript:void(0);" onclick="getWindow('editPop');">编辑</a>
                                    <a href="#">停止</a>
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
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    export default {
        data() {
            return {
                modelList: [],
                navId: '',
                productApi:API.product_list,
                product:''
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
        },
        components: {
            mselect,
        }
    }

</script>