
const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    sms_template_list: API_PRE + '/sms/template_list',
    sms_template_del: API_PRE + '/sms/template_delete',
    customer_select_list: API_PRE + '/sms/client_select',
    tunnel_select_list: API_PRE + '/sms/get_channel_list',
    sign_select_list: API_PRE + '/sms/get_sign_list',
    sms_template_detail: API_PRE + '/sms/template_find',
    sms_template_save: API_PRE + '/sms/template_save',
    sms_template_select: API_PRE + '/sms/template_select',
    task_save: API_PRE + '/sms/task_save',
    tast_detail: API_PRE + '/sms/task_info',
    sms_tunnel_list: API_PRE + '/sms/channel_list',
    sms_customer_list: API_PRE + '/costomer/costomerlist',
    sms_customer_add:API_PRE + '/costomer/createcostomer',
    sms_customer_edit:API_PRE + '/costomer/editcostomer',
    sms_customer_del:API_PRE + '/costomer/deletecostomer',
    goldlib_user: API_PRE + '/smallvault/costomerlist',
    goldlib_user_add: API_PRE + '/smallvault/createcostomer',
    goldlib_user_del: API_PRE + '/smallvault/deletecostomer'
}