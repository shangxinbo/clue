
const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    sms_template_list: API_PRE + '/sms/template_list'
}