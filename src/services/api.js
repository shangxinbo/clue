
const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    sms_template_list: API_PRE + '/sms/template_list',
    sms_template_del: API_PRE + '/',
    customer_select_list: API_PRE + '/sms/client_select',
    tunnel_select_list:API_PRE + '/sms/get_channel_list',
    sign_select_list:API_PRE + '/sms/get_sign_list',
    sms_template_detail: API_PRE + '/sms/template_find',
    sms_template_save: API_PRE + '/sms/template_save'
}