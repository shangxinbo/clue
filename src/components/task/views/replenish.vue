<template>
    <div class="cutover-task02" style="display:block">
        <ul class="data-text">
            <li>
                <label class="name">上传文件</label>
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
                        " multiple="false" accept=".txt" @change="selectFile($event)" />
                    </button>
                    <p v-if="file_error" class="tips error">{{file_error}}</p>
                </div>
            </li>
            <li>
                <label class="name">选择客户</label>
                <mselect ref="customerSelect" :api="customerApi" :hideAll="true" :param="customerParam"></mselect>
            </li>
            <li>
                <label class="name">选择产品</label>
                <div class="input-warp">
                    <p class="text">短信营销</p>
                </div>
            </li>
            <li class="li-btn">
                <div class="input-warp">
                    <button class="btn confirm" type="button" @click="submit">确认</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    export default {
        data() {
            return {
                filePath: '',
                file: '',
                file_error: '',
                customerApi: API.customer_list,
                customerParam: {
                    product_id: 2
                },
            }
        },
        methods: {
            selectFile(evt) {
                let file = evt.target.files[0]
                if (file.type.indexOf('text/plain') < 0) {
                    this.file_error = '只支持上传txt文件'
                    this.filePath = ''
                    return false
                } else if (file.size > 1024 * 1024 * 20) {
                    this.file_error = '文件不能大于20M'
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
                data.append('file', this.file)
                this.$ajax({
                    url: API.task_uploadfile,
                    data: data,
                    success: data => {
                        let mdata = JSON.parse(data.replace('#',''))
                        if (mdata.code == 200) {
                            this.$ajax({
                                url: API.task_create_addition,
                                data: {
                                    file_task_id: mdata.data.file_task_id,
                                    file_data_id: mdata.data.file_data_id,
                                    client_id: this.$refs.customerSelect.selected.id
                                },
                                success: data => {
                                    if (data.code == 200) {
                                        this.$toast('创建成功', () => {
                                            this.$router.replace('/task/index/')
                                        })
                                    } else {
                                        this.$toast(data.message)
                                    }
                                }
                            })
                        } else {
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