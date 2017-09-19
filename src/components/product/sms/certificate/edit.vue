<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">编辑客户资质</span>
            </div>
            <div class="data-property task-box">
                <form>
                    <div class="task-push">
                        <ul class="data-text">
                            <li>
                                <label class="name">资质名称</label>
                                <div class="input-warp">
                                    <p class="text">{{certificate}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">客户名称</label>
                                <div class="input-warp">
                                    <p class="text">{{customer}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">资质图片</label>
                                <div class="input-warp upload-warp">
                                    <input class="text" type="text" v-model="filePath" readonly>
                                    <a class="btn" style="min-width:50px;">
                                        <span>
                                            <i class="icon upload"></i>上传</span>
                                        <input type="file" style="
                                            height: 30px;
                                            width: 70px;
                                            opacity:0;
                                            cursor:pointer;
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            z-index: 1;
                                        " multiple="false" accept=".png,.jpg,.jpeg,.gif" @change="selectFile($event)" />
                                    </a>
                                    <p v-if="file_error" class="tips error">{{file_error}}</p>
                                    <div class="img"><img :src="pic"></div>
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
    export default {
        data() {
            return {
                id:this.$route.query.id,
                certificate: this.$route.query.certificate,
                customer: this.$route.query.customer,
                pic:this.$route.query.pic,
                filePath: '',
                file: '',
                file_error: '',
            }
        },
        methods: {
            selectFile(evt) {
                let file = evt.target.files[0]
                if (file.type.indexOf('image') < 0) {
                    this.file_error = '请上传.png|.jpeg|.gif格式的图片'
                    this.filePath = ''
                    return false
                } else if (file.size > 1024 * 1024 * 10) {
                    this.file_error = '图片不能大于10M'
                    this.filePath = ''
                    return false
                } else {
                    this.file_error = ''
                    this.file = file
                    this.filePath = file.name
                }
            },
            submit() {
                if (!this.file) {
                    this.file_error = '请上传文件'
                    return false
                }
                let data = new FormData()
                data.append('id', this.id)
                data.append('qualification_path', this.file)
                this.$ajax({
                    url: API.sms_certificate_edit,
                    data: data,
                    success: data => {
                        if (data.code == 200) {
                            this.$toast('修改成功', () => {
                                this.$router.replace('/product/sms/certificate/index/')
                            })
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            }
        }
    }

</script>