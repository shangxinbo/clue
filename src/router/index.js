import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const layout = resolve => System.import('components/common/layout.vue')
const error = resolve => System.import('components/common/error.vue')
const product_sms_template_list = resolve => System.import('components/product/sms/template/index')
const product_sms_template_edit = resolve => System.import('components/product/sms/template/edit')
const product_sms_index = resolve => System.import('components/product/sms/index')
const product_sms_push = resolve => System.import('components/product/sms/push')
const product_sms_tunnel = resolve => System.import('components/product/sms/tunnel')
const product_sms_customer_index = resolve => System.import('components/product/sms/customer/index')
const product_sms_certificate_index = resolve => System.import('components/product/sms/certificate/index')
const product_sms_certificate_add = resolve => System.import('components/product/sms/certificate/add')
const product_sms_certificate_edit = resolve => System.import('components/product/sms/certificate/edit')
const product_goldlib_index = resolve => System.import('components/product/goldlib/index')
const product_goldlib_user_list = resolve => System.import('components/product/goldlib/users/index')
const data_index = resolve => System.import('components/data/index')
const task_index = resolve => System.import('components/task/index')
const task_status = resolve => System.import('components/task/status')

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
                { path: '/product/sms/tunnel/', name: 'product_sms_tunnel', component: product_sms_tunnel },
                { path: '/product/sms/customer/index/', name: 'product_sms_customer_index', component: product_sms_customer_index },
                { path: '/product/sms/certificate/index/', name: 'product_sms_certificate_index', component: product_sms_certificate_index },
                { path: '/product/sms/certificate/add/', name: 'product_sms_certificate_add', component: product_sms_certificate_add },
                { path: '/product/sms/certificate/edit/', name: 'product_sms_certificate_edit', component: product_sms_certificate_edit },
                { path: '/product/goldlib/index/', name: 'product_goldlib_index', component: product_goldlib_index },
                { path: '/product/goldlib/user/', name: 'product_goldlib_user_list', component: product_goldlib_user_list },
                { path: '/data/index/', name: 'data_index', component: data_index },
                { path: '/task/index/', name: 'task_index', component: task_index },
                { path: '/task/status/', name: 'task_status', component: task_status },
            ]
        },
        { path: '/error*', name: 'error', component: error },
        { path: '*', redirect: '/error?code=404' }
    ]
})

export default mRouter
