<template>
    <div>
        <mnav></mnav>
        <router-view></router-view>
        <mfooter></mfooter>
        <div id="shadowLayer" v-if="layer"></div>
        <alert ref="alert"></alert>
        <confirm ref="confirm"></confirm>
        <toast ref="toast"></toast>
    </div>
</template>
<script>
    import Vue from 'vue'
    import mfooter from 'components/common/footer.vue'
    import mnav from 'components/common/nav.vue'
    import alert from 'components/utils/alert'
    import confirm from 'components/utils/confirm'
    import toast from 'components/utils/toast'
    import API from 'src/services/api'

    export default {
        data() {
            return {}
        },
        computed: {
            layer() {
                return this.$store.state.showLayer
            }
        },
        components: {
            mfooter,
            mnav,
            alert,
            confirm,
            toast
        },
        created() {

            let _this = this

            Vue.prototype.$alert = (msg, callback) => {
                _this.$refs.alert.show(msg, callback)
            }
            Vue.prototype.$confirm = (msg, callback) => {
                _this.$refs.confirm.show(msg, callback)
            }
            Vue.prototype.$toast = (msg, callback, timer) => {
                _this.$refs.toast.show(msg, callback, timer)
            }

        }
    }

</script>