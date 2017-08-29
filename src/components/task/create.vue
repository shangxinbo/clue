<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <div class="tag-nav">
                    <router-link to="/task/create/puton" :class="{active:!tab}">创建投放任务</router-link>
                    <router-link to="/task/create/replenish" :class="{active:tab}">创建补量任务</router-link>
                </div>
            </div>
            <div class="data-property task-box">
                <div class="task-push">
                    <form>
                        <div class="cutover">
                            <router-view></router-view>
                        </div>
                    </form>
                </div>
                <div class="task-side">
                    <div class="title-warp">在投模型任务</div>
                    <ul class="task-list">
                        <li v-for="item in model">
                            <span class="name">{{item.name}}模型</span>
                            <span class="num">{{item.total}}个项目</span>
                        </li>
                    </ul>
                    <div class="title-warp">在投产品任务</div>
                    <ul class="task-list">
                        <li v-for="item in product">
                            <span class="name">{{item.name}}模型</span>
                            <span class="num">{{item.total}}个项目</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    export default {
        data() {
            return {
                model: [],
                product: []
            }
        },
        computed: {
            tab() {
                return this.$route.path == '/task/create/replenish' ? true : false
            }
        },
        created() {
            this.$ajax({
                url: API.get_model_task,
                data: {},
                success: data => {
                    if (data.code == 200) {
                        this.model = data.data
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
            this.$ajax({
                url: API.get_product_task,
                data: {},
                success: data => {
                    if (data.code == 200) {
                        this.product = data.data
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        }
    }

</script>