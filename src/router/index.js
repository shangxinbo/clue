import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const layout = resolve => System.import('components/common/layout.vue')
const error = resolve => System.import('components/common/error.vue')
const product_sms_template_list = resolve => System.import('components/product/sms/template/index')
const product_sms_template_edit = resolve => System.import('components/product/sms/template/edit')
const product_sms_index = resolve => System.import('components/product/sms/index')
const product_sms_push = resolve => System.import('components/product/sms/push')

let mRouter = new Router({
    routes: [
        {
            path: '/',
            component: layout,
            children: [
                { path: '/product/sms/template/list', name: 'product_sms_template_list', component: product_sms_template_list },
                { path: '/product/sms/template/add', name: 'product_sms_template_add', component: product_sms_template_edit },
                { path: '/product/sms/template/edit/:id', name: 'product_sms_template_edit', component: product_sms_template_edit },
                { path: '/product/sms/index/', name: 'product_sms_index', component: product_sms_index },
                { path: '/product/sms/push/', name: 'product_sms_push', component: product_sms_push },
            ]
        },
        { path: '/error*', name: 'error', component: error },
        { path: '*', redirect: '/error?code=404' }
    ]
})

export default mRouter
