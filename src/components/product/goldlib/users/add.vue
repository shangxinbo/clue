<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-265px','margin-top':'-118px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>创建客户</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>客户名称</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="name">
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <button class="btn confirm" type="button" @click="sure">确定</button>
            <button class="btn cancel" type="button" @click="close">取消</button>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    export default {
        data() {
            return {
                style: 'none',
                name: '',
            }
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                if (this.name) {
                    this.$ajax({
                        url: API.goldlib_user_add,
                        data: {
                            costomer_name: this.name
                        },
                        success: data => {
                            this.close()
                            if (data.code == 200) {
                                this.$toast('添加成功', () => {
                                    window.location.reload()
                                })
                            } else {
                                this.$toast(data.message)
                            }
                        }
                    })
                }
            }
        },
        created() {
            this.$on('show', function () {
                this.style = 'block'
                this.name = ''
                this.$store.commit('SHOW_LAYER')
            })
        }
    }

</script>