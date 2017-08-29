<template>
    <div class="cutover-task01">
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
                    <input class="text" v-model="priority" type="text">
                    <p class="tips">从1开始的正整数，数字越小，优先级越高</p>
                    <p v-if="priority_error" class="tips error">{{priority_error}}</p>
                </div>
            </li>
            <li>
                <label class="name">数据量</label>
                <div class="input-warp">
                    <input class="text" v-model="dataCout" type="text">
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
                            <p v-for="item in selected_citys">
                                <span>{{item.province.name}}</span>
                                <span v-if="item.city.id">{{item.city.name}}</span>
                                <i class="icon"></i>
                            </p>
                        </div>
                        <areaSelect ref="areaSelect1" @add="addSelectCitys"></areaSelect>
                    </label>
                    <label class="radio-warp" :class="{'radio-active':areaType==3}" for="areaShield">
                        <input type="radio" name="areaShield" class="radio">
                        <i class="icon" @click="areaType=3"></i>
                        <span class="radioname">屏蔽</span>
                        <div class="select-current">
                            <p v-for="item in unselected_citys">
                                <span>{{item.province.name}}</span>
                                <span v-if="item.city.id">{{item.city.name}}</span>
                                <i class="icon"></i>
                            </p>
                        </div>
                        <areaSelect ref="areaSelect2" @add="addUnSelectCitys"></areaSelect>
                    </label>
                </div>
            </li>
            <li class="li-radio">
                <label class="name">投放日期</label>
                <div class="input-warp">
                    <label onclick="payCutover(this)" class="radio-warp radio-active" for="sendDay">
                        <input type="radio" name="sendDay" class="radio" id="sendDay" value="sendBatch" checked="checked">
                        <i class="icon"></i>
                        <span class="radioname">每天</span>
                    </label>
                    <label onclick="payCutover(this)" class="radio-warp" for="sendWeekly">
                        <input type="radio" name="sendWeekly" class="radio" id="sendWeekly" value="sendSingle">
                        <i class="icon"></i>
                        <span class="radioname">每周</span>
                        <ul class="screening-weekly">
                            <li class="active">
                                <i class="icon"></i>
                                <span>周一</span>
                            </li>
                            <li>
                                <i class="icon"></i>
                                <span>周二</span>
                            </li>
                            <li>
                                <i class="icon"></i>
                                <span>周三</span>
                            </li>
                            <li>
                                <i class="icon"></i>
                                <span>周四</span>
                            </li>
                            <li>
                                <i class="icon"></i>
                                <span>周五</span>
                            </li>
                            <li>
                                <i class="icon"></i>
                                <span>周六</span>
                            </li>
                            <li>
                                <i class="icon"></i>
                                <span>周日</span>
                            </li>
                        </ul>
                    </label>
                    <label onclick="payCutover(this)" class="radio-warp" for="sendChoose">
                        <input type="radio" name="sendChoose" class="radio" id="sendChoose" value="sendSingle">
                        <i class="icon"></i>
                        <span class="radioname">选择日期</span>
                        <div class="auto-kal" data-kal="months:3,mode:'multiple',direction:'today-future'"></div>
                    </label>
                </div>
            </li>
            <li class="li-btn">
                <div class="input-warp">
                    <button class="btn confirm" type="button" onclick="getWindow('newSucc','tips-succ');">确认</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import areaSelect from './area'
    export default {
        data() {
            return {
                modelApi: API.models_get,
                productApi: API.product_list,
                customerApi: API.customer_list,
                projectApi: API.project_list,
                customerParam: {
                    id: ''
                },
                projectParam: {
                    project_id: '',
                    client_id: ''
                },
                showProjectSelect: false,
                priority: '',
                priority_error: '',
                dataCout: '',
                dataCount_error: '',
                providers: [],
                selected_providers: [],
                selected_citys: [],
                unselected_citys: [],
                areaType: 1
            }
        },
        created() {
            this.$ajax({
                url: API.provider_list,
                data: {},
                success: data => {
                    if (data.code == 200) {
                        this.providers = data.data
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        },
        methods: {
            linkCustomer(selected) {
                this.customerParam.id = selected.id
                this.$refs.customerSelect.init()
                if (selected.id == 2) {
                    this.showProjectSelect = true
                } else {
                    this.showProjectSelect = false
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
                let tag = false
                for (let i = 0; i < this.selected_citys.length; i++) {
                    let s = this.selected_citys[i]
                    if (province.id == s.province.id && city.id == s.city.id) {
                        tag = true
                    }
                }
                if (!tag) {
                    this.selected_citys.push({
                        province: province,
                        city: city
                    })
                }
            },
            addUnSelectCitys(province, city) {
                let tag = false
                for (let i = 0; i < this.unselected_citys.length; i++) {
                    let s = this.unselected_citys[i]
                    if (province.id == s.province.id && city.id == s.city.id) {
                        tag = true
                    }
                }
                if (!tag) {
                    this.unselected_citys.push({
                        province: province,
                        city: city
                    })
                }
            }
        },
        components: {
            mselect,
            areaSelect
        }
    }

</script>