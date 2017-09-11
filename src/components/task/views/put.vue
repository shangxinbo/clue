<template>
    <div class="cutover-task01" style="display:block">
        <ul class="data-text">
            <li>
                <label class="name">选择模型</label>
                <mselect ref="modelSelect" :api="modelApi" :hideAll="true"></mselect>
            </li>
            <li>
                <label class="name">选择产品</label>
                <mselect ref="productSelect" :api="productApi" :hideAll="true" @change="linkCustomer"></mselect>
            </li>
            <li>
                <label class="name">选择客户</label>
                <mselect ref="customerSelect" :api="customerApi" :hideAll="true" :param="customerParam" @change="linkProject"></mselect>
            </li>
            <li v-show="showProjectSelect">
                <label class="name">选择项目</label>
                <mselect ref="projectSelect" :api="projectApi" :hideAll="true" :param="projectParam"></mselect>
            </li>
            <li>
                <label class="name">优先级</label>
                <div class="input-warp">
                    <input class="text" v-model.number="priority">
                    <p class="tips">从1开始的正整数，数字越小，优先级越高</p>
                    <p v-if="priority_error" class="tips error">{{priority_error}}</p>
                </div>
            </li>
            <li>
                <label class="name">数据量</label>
                <div class="input-warp">
                    <input class="text" v-model.number="dataCout" type="text">
                    <p v-if="dataCount_error" class="tips error">{{dataCount_error}}</p>
                </div>
            </li>
            <li>
                <label class="name">运营商</label>
                <div class="input-warp">
                    <ul class="check-warp">
                        <li v-for="item in providers" :class="{'active':inSelect(item.code)}" @click="toggleSelect(item.code)">
                            <i class="icon"></i>
                            <span>{{item.desc}}</span>
                        </li>
                    </ul>
                    <p v-if="providers_error" class="tips error">{{providers_error}}</p>
                </div>
            </li>
            <li>
                <label class="name">地域</label>
                <div class="input-warp">
                    <label class="radio-warp" :class="{'radio-active':areaType==1}" for="areaAll">
                        <input type="radio" name="areaAll" class="radio">
                        <i class="icon" @click="areaType=1"></i>
                        <span class="radioname">全国</span>
                    </label>
                    <label class="radio-warp" :class="{'radio-active':areaType==2}" for="areaProvince">
                        <input type="radio" name="areaProvince" class="radio">
                        <i class="icon" @click="areaType=2"></i>
                        <span class="radioname"></span>
                        <div class="select-current">
                            <p v-for="(item,index) in selected_citys">
                                <span>{{index}}</span>
                                <span v-for="city in item">{{city.name}}</span>
                                <i class="icon" @click="removeSelectedCitys(index)"></i>
                            </p>
                        </div>
                        <areaSelect ref="areaSelect1" @add="addSelectCitys"></areaSelect>
                    </label>
                    <label class="radio-warp" :class="{'radio-active':areaType==3}" for="areaShield">
                        <input type="radio" name="areaShield" class="radio">
                        <i class="icon" @click="areaType=3"></i>
                        <span class="radioname">屏蔽</span>
                        <div class="select-current">
                            <p v-for="(item,index) in unselected_citys">
                                <span>{{index}}</span>
                                <span v-for="city in item">{{city.name}}</span>
                                <i class="icon" @click="removeUnSelectedCitys(index)"></i>
                            </p>
                        </div>
                        <areaSelect ref="areaSelect2" @add="addUnSelectCitys"></areaSelect>
                    </label>
                    <p v-if="area_error" class="tips error">{{area_error}}</p>
                </div>
            </li>
            <li class="li-radio">
                <label class="name">投放日期</label>
                <div class="input-warp">
                    <label class="radio-warp" :class="{'radio-active':dateType==1}" for="sendDay">
                        <input type="radio" name="sendDay" class="radio" checked="checked">
                        <i class="icon" @click="dateType=1"></i>
                        <span class="radioname">每天</span>
                    </label>
                    <label class="radio-warp" :class="{'radio-active':dateType==2}" for="sendWeekly">
                        <input type="radio" name="sendWeekly" class="radio">
                        <i class="icon" @click="dateType=2"></i>
                        <span class="radioname">每周</span>
                        <ul class="screening-weekly">
                            <li v-for="item in dateWeek" :class="{active:item.checked}">
                                <i class="icon" @click="item.checked=!item.checked"></i>
                                <span>{{item.name}}</span>
                            </li>
                        </ul>
                    </label>
                    <label class="radio-warp" :class="{'radio-active':dateType==3}" for="sendChoose">
                        <input type="radio" name="sendChoose" class="radio">
                        <i class="icon" @click="dateType=3"></i>
                        <span class="radioname">选择日期</span>
                        <div id="datepicker" class="auto-kal"></div>
                    </label>
                    <p v-if="date_error" class="tips error">{{date_error}}</p>
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
    import areaSelect from './area'
    import Vue from 'vue'
    export default {
        data() {
            return {
                modelApi: API.models_get,
                productApi: API.product_list,
                customerApi: API.customer_list,
                projectApi: API.project_list,
                customerParam: {
                    product_id: ''
                },
                projectParam: {
                    product_id: '',
                    client_id: ''
                },
                showProjectSelect: false,
                priority: '',
                priority_error: '',
                dataCout: '',
                dataCount_error: '',
                providers: [],
                providers_error: '',
                selected_providers: [],
                selected_citys: {},
                area_error: '',
                unselected_citys: {},
                areaType: 1,
                datepicker: null,
                dateType: 1,
                dateWeek: [
                    { id: 1, name: '周一', checked: false },
                    { id: 2, name: '周二', checked: false },
                    { id: 3, name: '周三', checked: false },
                    { id: 4, name: '周四', checked: false },
                    { id: 5, name: '周五', checked: false },
                    { id: 6, name: '周六', checked: false },
                    { id: 7, name: '周日', checked: false }
                ],
                date_error: ''
            }
        },
        created() {
            this.$ajax({
                url: API.provider_list,
                data: {},
                success: data => {
                    if (data.code == 200) {
                        this.providers = data.data
                        this.providers.forEach((item,index)=>{
                            this.selected_providers.push(item.code)
                        })
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        },
        mounted() {
            /* eslint-disable no-undef */
            this.datepicker = new Kalendae('datepicker', {
                months: 3,
                mode: 'multiple',
                direction: 'today-future'
            })
        },
        methods: {
            linkCustomer(selected) {
                this.customerParam.product_id = selected.id
                this.$refs.customerSelect.init()
                if (selected.id == 2) {
                    this.showProjectSelect = false
                } else {
                    this.showProjectSelect = true
                }
            },
            linkProject(selected) {
                this.projectParam.client_id = selected.id
                this.projectParam.product_id = 2
                this.$refs.projectSelect.init()
            },
            inSelect(id) {
                let tag = false
                this.selected_providers.forEach((item, index) => {
                    if (item == id) tag = true
                })
                return tag
            },
            toggleSelect(id) {
                if (this.inSelect(id)) {
                    this.selected_providers.forEach((item, index) => {
                        if (item == id) {
                            this.selected_providers.splice(index, 1)
                        }
                    })
                } else {
                    this.selected_providers.push(id)
                }
            },
            addSelectCitys(province, city) {
                if (this.selected_citys.hasOwnProperty(province)) {
                    if (this.selected_citys[province].length > 0) {
                        if (city.id) {
                            let m = this.selected_citys[province]
                            let index = m.findIndex((item, index) => {
                                return item.id == city.id
                            })
                            if (index < 0) {
                                this.selected_citys[province].push(city)
                            }
                        } else {
                            Vue.set(this.selected_citys, province, [])
                        }
                    }
                } else {
                    if (city.id) {
                        Vue.set(this.selected_citys, province, [city])
                    } else {
                        Vue.set(this.selected_citys, province, [])
                    }
                }

            },
            addUnSelectCitys(province, city) {
                if (this.unselected_citys.hasOwnProperty(province)) {
                    if (this.unselected_citys[province].length > 0) {
                        if (city.id) {
                            let m = this.unselected_citys[province]
                            let index = m.findIndex((item, index) => {
                                return item.id == city.id
                            })
                            if (index < 0) {
                                this.unselected_citys[province].push(city)
                            }
                        } else {
                            Vue.set(this.unselected_citys, province, [])
                        }
                    }
                } else {
                    if (city.id) {
                        Vue.set(this.unselected_citys, province, [city])
                    } else {
                        Vue.set(this.unselected_citys, province, [])
                    }
                }
            },
            removeSelectedCitys(province) {
                Vue.delete(this.selected_citys, province)
            },
            removeUnSelectedCitys(province) {
                Vue.delete(this.unselected_citys, province)
            },
            submit() {
                if (!this.priority) {
                    this.priority_error = '请填写优先级'
                    return false
                } else {
                    let reg = /^[1-9]\d*$/
                    if (!reg.test(this.priority)) {
                        this.priority_error = '优先级格式不对'
                        return false
                    }
                }
                if (!this.dataCout) {
                    this.dataCount_error = '请填写数据量'
                    return false
                } else {
                    let reg = /^[1-9]\d*$/
                    if (!reg.test(this.dataCout)) {
                        this.dataCount_error = '数据量格式不对'
                        return false
                    }
                }
                if (this.selected_providers.length <= 0) {
                    this.providers_error = '请选择运营商'
                    return false
                }

                let yao = [], unyao = []
                if (this.areaType == 2) {
                    let tag = 0
                    for (let i in this.selected_citys) {
                        tag++
                        let city = []
                        this.selected_citys[i].forEach(item => {
                            city.push(item.id)
                        })
                        yao.push({
                            province: i,
                            city: city
                        })
                    }
                    if (tag == 0) {
                        this.area_error = '请选择地域'
                        return false
                    }
                    unyao = ''
                } else if (this.areaType == 3) {
                    let tag = 0
                    for (let i in this.unselected_citys) {
                        tag++
                        let city = []
                        this.unselected_citys[i].forEach(item => {
                            city.push(item.id)
                        })
                        unyao.push({
                            province: i,
                            city: city
                        })
                    }
                    if (tag == 0) {
                        this.area_error = '请选择地域'
                        return false
                    }
                    yao = ''
                } else {
                    yao = 'all'
                    unyao = ''
                }

                let dates = this.datepicker.getSelected()
                let sendTime = ''
                if (this.dateType == 2) {
                    let tag = false
                    console.log(this.dateWeek)
                    this.dateWeek.forEach((item, index) => {
                        if (item.checked) tag = true
                    })
                    if (!tag) {
                        this.date_error = '请选择日期'
                        return false
                    }
                    sendTime = []
                    this.dateWeek.forEach((item, index) => {
                        if (item.checked) {
                            sendTime.push(item.id)
                        }
                    })
                } else if (this.dateType == 3) {
                    if (!dates) {
                        this.date_error = '请选择日期'
                        return false
                    }
                    sendTime = dates.split(',')
                }


                this.$ajax({
                    url: API.task_create,
                    data: {
                        model_id: this.$refs.modelSelect.selected.id,
                        product_id: this.$refs.productSelect.selected.id,
                        client_id: this.$refs.customerSelect.selected.id,
                        project_id: this.$refs.projectSelect.selected.id,
                        include_area_id: yao,
                        delete_area_id: unyao,
                        weights: this.priority,
                        data_num: this.dataCout,
                        operator_id: this.selected_providers.join(','),
                        send_type: parseInt(this.dateType) - 1,
                        send_time: sendTime
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
            }
        },
        components: {
            mselect,
            areaSelect
        }
    }

</script>