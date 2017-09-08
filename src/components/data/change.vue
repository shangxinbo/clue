<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-265px','margin-top':'-212px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>调整</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>产品名称</label>
                    <div class="input-warp">
                        <p class="text">{{product}}</p>
                    </div>
                </li>
                <li>
                    <label>客户名称</label>
                    <div class="input-warp">
                        <p class="text">{{customer}}</p>
                    </div>
                </li>
                <li>
                    <label>优先级</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="weight">
                        <p v-if="weight_error" class="tips error">{{weight_error}}</p>
                    </div>
                </li>
                <li>
                    <label>量</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="count">
                        <p v-if="count_error" class="tips error">{{count_error}}</p>
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
                id: '',
                model: '',
                product: '',
                customer: '',
                weight: '',
                weight_error: '',
                count: '',
                count_error: ''
            }
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                if (!this.weight) {
                    this.weight_error = '请填写优先级'
                    return false
                } else {
                    let reg = /^[1-9]\d*$/
                    if (!reg.test(this.weight)) {
                        this.weight_error = '优先级格式不对'
                        return false
                    }
                }
                if (!this.count) {
                    this.count_error = '请填写数据量'
                    return false
                } else {
                    let reg = /^[1-9]\d*$/
                    if (!reg.test(this.count)) {
                        this.count_error = '数据量格式不对'
                        return false
                    }
                }
                this.$ajax({
                    url: API.model_change_weight,
                    data: {
                        id: this.id,
                        weights: this.weight,
                        data_num: this.count,
                        model_id: this.model
                    },
                    success: data => {
                        this.close()
                        if (data.code == 200) {
                            this.$toast('调整成功', () => {
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
            this.$on('show', (id, product, customer, weight, count, model) => {
                this.style = 'block'
                this.id = id
                this.product = product
                this.customer = customer
                this.weight = weight
                this.count = count
                this.model = model
                this.$store.commit('SHOW_LAYER')
            })
        }
    }

</script>