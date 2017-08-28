<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">创建客户资质</span>
            </div>
            <div class="data-property task-box">
                <form>
                    <div class="task-push">
                        <ul class="data-text">
                            <li>
                                <label class="name">资质名称</label>
                                <mselect ref="certificateSelect" :initlist="types" hideAll="true"></mselect>
                            </li>
                            <li>
                                <label class="name">客户名称</label>
                                <mselect ref="customerSelect" :api="customerApi" hideAll="true"></mselect>
                            </li>
                            <li>
                                <label class="name">资质图片</label>
                                <div class="input-warp upload-warp">
                                    <input class="text" type="text" v-model="filePath" readonly>
                                    <button class="btn" type="button">
                                        <span>
                                            <i class="icon upload"></i>上传</span>
                                        <input type="file" style="
                                            height: 30px;
                                            width: 80px;
                                            opacity:0;
                                            cursor:pointer;
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            z-index: 1;
                                        " multiple="false" accept=".png,.jpg,.jpeg,.gif" @change="selectFile($event)" />
                                    </button>
                                </div>
                            </li>

                            <li class="li-btn">
                                <div class="input-warp">
                                    <button class="btn confirm" type="button" @click="submit">提交</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    let types = [{ id: 1, name: '营业执照' }, { id: 2, name: '授权书' }, { id: 3, name: '其他' }]
    export default {
        data() {
            return {
                certificate: '',
                customer: '',
                types: types,
                filePath:'',
                file:'',
                customerApi: API.sms_customer_all
            }
        },
        methods: {
            selectFile(evt){
                this.file = evt.target.files[0]
                this.filePath = this.file.name
            },
            submit(){
                let data = new FormData()
                data.append('customer_id', this.selectedId)
                data.append('qualification_path', this.file)
                this.$ajax({
                    url:API.sms_certificate_add,
                    data:data,
                    success:data=>{
                        if(data.code==200){
                            this.$toast('添加成功',()=>{
                                this.router.replace('/product/sms/certificate/index/')
                            })
                        }else{
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