<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-265px','margin-top':'-149px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>创建产品</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>产品名称</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="name">
                    </div>
                    <p v-if="name_error" class="error">{{name_error}}</p>
                </li>
                <li>
                    <label>标识</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="tag">
                    </div>
                    <p v-if="tag_error" class="error">{{tag_error}}</p>
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
                    tag: '',
                    name_error:'',
                    tag_error:''
                }
            },
            methods: {
                close() {
                    this.style = 'none'
                    this.$store.commit('HIDE_LAYER')
                },
                sure() {
                    let reg = /^[a-zA-Z]{1,}$/
                    if (!this.name) { 
                        this.name_error = '请输入产品名称'
                        return false
                    }
                    if(!reg.test(this.tag)){
                        this.tag_error = '英文大小写格式'
                        return false
                    }
                    this.$ajax({
                        url: API.create_product,
                        data: {
                            product_name: this.name,
                            identification: this.tag
                        },
                        success: data => {
                            this.close()
                            if (data.code == 200) {
                                this.$toast('创建成功', () => {
                                    window.location.reload()
                                })
                            } else {
                                this.$toast(data.message)
                            }
                        }
                    })
                }
            },
            created() {
                this.$on('show', () => {
                    this.style = 'block'
                    this.name = ''
                    this.tag = ''
                    this.$store.commit('SHOW_LAYER')
                })
            }
        }
    
    </script>