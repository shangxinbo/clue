
const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    sms_template_list: API_PRE + '/sms/template_list',
    sms_template_del: API_PRE + '/sms/template_delete',
    customer_select_list: API_PRE + '/sms/client_select',
    tunnel_select_list: API_PRE + '/sms/get_channel_list',
    tunnel_select_by_template:API_PRE + '/sms/get_channels',
    sign_select_list: API_PRE + '/sms/get_sign_list',
    sms_template_detail: API_PRE + '/sms/template_find',
    sms_template_save: API_PRE + '/sms/template_save',
    sms_template_select: API_PRE + '/sms/template_select',
    task_save: API_PRE + '/sms/task_save',
    tast_detail: API_PRE + '/sms/task_info',
    sms_index_list: API_PRE + '/task/messagelist',
    sms_index_status: API_PRE + '/task/messagestatuslist',
    sms_type_list: API_PRE + '/task/messagetasktypelist',
    sms_tunnel_list: API_PRE + '/sms/channel_list',
    sms_customer_list: API_PRE + '/costomer/costomerlist',
    sms_customer_add: API_PRE + '/costomer/createcostomer',
    sms_customer_edit: API_PRE + '/costomer/editcostomer',
    sms_customer_del: API_PRE + '/costomer/deletecostomer',
    sms_certificate_list: API_PRE + '/costomer/qualificationlist',
    sms_certificate_add: API_PRE + '/costomer/qualificationadd',
    sms_certificate_edit: API_PRE + '/costomer/qualificationedit',
    sms_customer_all: API_PRE + '/costomer/getmessagecomtomer',
    goldlib_user: API_PRE + '/smallvault/costomerlist',
    goldlib_user_add: API_PRE + '/smallvault/createcostomer',
    goldlib_user_edit: API_PRE + '/smallvault/editcostomer',
    goldlib_user_del: API_PRE + '/smallvault/deletecostomer',
    models_get: API_PRE + '/model/modecategory',
    models_create: API_PRE + '/model/createmodel',
    model_data_list: API_PRE + '/model/modeldatamanage',
    model_get_sum: API_PRE + '/model/dataowncount',
    model_detail: API_PRE + '/model/modeldetail',
    model_change_weight: API_PRE + '/model/changeweights',
    product_list: API_PRE + '/task/productlist',
    customer_list: API_PRE + '/task/clientlist',
    project_list: API_PRE + '/task/projectlist',
    get_model_task: API_PRE + '/task/modeltask',
    get_product_task: API_PRE + '/task/producttask',
    provider_list: API_PRE + '/task/operatorlist',
    task_create: API_PRE + '/task/createfull',
    task_uploadfile: API_PRE + '/task/uploadfile',
    task_list: API_PRE + '/task/taskmanage',
    task_create_addition: API_PRE + '/task/createadd',
    task_change_status: API_PRE + '/task/changestatus',
    task_edit: API_PRE + '/task/editcommit',
    task_status_list: API_PRE + '/task/taskstatus',
    task_status_detail: API_PRE + '/task/subtaskdetail',
    task_sub_status_score: API_PRE + '/task/subtaskscore',
    task_status_export: API_PRE + '/task/download',
    get_provinces: API_PRE + '/area/getProvince',
    get_citys: API_PRE + '/area/getCity',
    product_index: API_PRE + '/task/productmanage',
    create_product: API_PRE + '/product/createproduct'
}