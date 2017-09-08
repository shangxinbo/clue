<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">创建模板</span>
            </div>
            <div class="data-property task-box">
                <form>
                    <div class="task-push">
                        <ul class="data-text">
                            <li>
                                <label class="name">模板名称</label>
                                <div class="input-warp">
                                    <p class="text" v-if="edit">{{name}}</p>
                                    <input v-else class="text" v-model="name" type="text">
                                    <p v-if="error_name" class="tips block error">{{error_name}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">客户名称</label>
                                <div class="input-warp" v-if="edit">
                                    <p class="text">{{customer}}</p>
                                </div>
                                <mselect v-else ref="customerSelect" :api="customerApi" :hideAll="true"></mselect>
                            </li>
                            <li>
                                <label class="name">短信文本</label>
                                <div class="input-warp">
                                    <textarea v-model="content" maxlength="70"></textarea>
                                    <p class="tips block">最多录入70个字符，已经输入{{contentLength}}个字符</p>
                                    <p v-if="error_content" class="tips block error">{{error_content}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">短信链接</label>
                                <div class="input-warp">
                                    <input class="text" v-model="url" type="text">
                                    <p class="tips block">如有短信链接，务必在短信文本中对应位置加入链接占位符#url#</p>
                                    <p v-if="error_url" class="tips block error">{{error_url}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">发送通道</label>
                                <mselect ref="tunnelSelect" :api="tunnelApi" :id="tunnelId" :hideAll="true" @change="getSign"></mselect>
                            </li>
                            <li>
                                <label class="name">短信签名</label>
                                <div class="input-warp" v-if="edit">
                                    <p class="text">{{sign}}</p>
                                </div>
                                <mselect v-else ref="signSelect" :api="signApi" :param="signParam" :id="signId" :hideAll="true" @change="getSignText"></mselect>
                            </li>
                            <li class="li-btn">
                                <div class="input-warp">
                                    <button class="btn confirm" type="button" @click="submit">提交</button>
                                </div>
                            </li>
                        </ul>
                        <div class="sms-phone">
                            <div class="inrr">
                                <i class="bg-up"></i>
                                <i class="bg-down"></i>
                                <p v-show="sign">【{{sign}}】</p>
                                <p v-show="content_view" v-html="content_view"></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import mselect from 'components/utils/select'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                id: '',
                name: '',
                error_name: '',
                customerApi: API.customer_select_list,
                customer: '',
                content: '',
                error_content: '',
                url: '',
                error_url: '',
                tunnelApi: API.tunnel_select_list,
                tunnelId: '',
                signApi: API.sign_select_list,
                signParam: {},
                signId: '',
                sign: '',
                repeatSubmit:false
            }
        },
        computed: {
            contentLength() {
                return this.content.replace(/#url#/, '12345678901234').length
            },
            content_view() {
                return this.content.replace(/#url#/, '<a href="' + this.url + '"> t.cn/RK73y </a>')
            },
            edit() {
                return !!this.$route.params.id
            }
        },
        created() {
            if (this.$route.params.id) {
                this.$ajax({
                    url: API.sms_template_detail,
                    data: {
                        id: this.$route.params.id
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.id = data.data.id
                            this.name = data.data.name
                            this.customer = data.data.client_name
                            this.content = data.data.content
                            this.url = data.data.url
                            this.sign = data.data.sign
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            }
        },
        methods: {
            getSign(result) {
                if (this.edit) return false
                this.signParam = {
                    channel_key: result.id
                }
                let _this = this
                this.$nextTick(() => {
                    this.$refs.signSelect.init()
                })
            },
            getSignText(result) {
                this.sign = result.name
            },
            submit() {
                let obj = {}
                if (this.edit) {
                    obj = {
                        id: this.id
                    }
                } else {
                    if (!this.name) {
                        this.error_name = '请填写模板名称'
                        return false
                    }
                    obj = {
                        name: this.name,
                        client_id: this.$refs.customerSelect.selected.id,
                        sign: this.$refs.signSelect.selected.id
                    }
                }

                if (!this.content) {
                    this.error_content = '请填写短信内容'
                    return false
                } else {
                    this.error_content = ''
                }
                if (this.url) {
                    /* eslint-disable no-useless-escape */
                    let reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
                    if (!reg.test(this.url)) {
                        this.error_url = '链接格式不正确'
                        return false
                    } else {
                        this.error_url = ''
                    }
                } else {
                    this.error_url = ''
                }
                obj.content = this.content
                obj.url = this.url
                
                if(this.repeatSubmit) return false
                this.repeatSubmit = true

                this.$ajax({
                    url: API.sms_template_save,
                    data: obj,
                    success: data => {
                        this.repeatSubmit = false
                        if (data.code == 200) {
                            this.$toast(`${this.edit ? '编辑' : '新建'}成功`, () => {
                                this.$router.replace('/product/sms/template/list')
                            })
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            }
        },
        components: {
            mselect
        }
    }

</script>