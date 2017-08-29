<template>
    <div class="date-warp">
        <div class="select-warp" :class="{'select-open':select1Show}">
            <p class="all" @click.stop="select1Show=true">
                <span>{{selectedProvince||'请选择'}}</span>
            </p>
            <div class="select-ul">
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <ul>
                        <li v-for="item in province" @click.stop="selectProvince(item)">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="select-warp" :class="{'select-open':select2Show}">
            <p class="all" @click.stop="select2Show=true">
                <span>{{selectedCity.name}}</span>
            </p>
            <div class="select-ul">
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <ul>
                        <li @click="selectCity()">全部</li>
                        <li v-for="item in city" @click.stop="selectCity(item.area_code,item.city)">{{item.city}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <span class="icon add" @click="add"></span>
    </div>
</template>
<script>
    import Vue from 'vue'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                select1Show: false,
                select2Show: false,
                province: [],
                city: [],
                selectedProvince: '',
                selectedCity: {
                    id: '',
                    name: '全部'
                }
            }
        },
        created() {
            this.$ajax({
                url: API.get_provinces,
                data: {},
                success: data => {
                    if (data.code == 200) {
                        this.province = data.data
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        },
        mounted() {
            let _this = this
            Vue.nextTick(() => {
                document.addEventListener('click', () => {
                    _this.select1Show = false
                    _this.select2Show = false
                })
            })
        },
        watch: {
            selectedProvince(newVal, oldVal) {
                this.$ajax({
                    url:API.get_citys,
                    data:{
                        province:newVal
                    },
                    success:data=>{
                        this.city = data.data
                    }
                })
            }
        },
        methods: {
            selectProvince(name) {
                this.selectedProvince = name
                this.select1Show = false
                this.selectedCity = {
                    id: '',
                    name: '全部'
                }
            },
            selectCity(id, name) {
                this.selectedCity = {
                    id: id || '',
                    name: name || '全部'
                }
                this.select2Show = false
            },
            add() {
                if (this.selectedProvince) {
                    this.$emit('add', this.selectedProvince, this.selectedCity)
                }
            }
        }
    }

</script>