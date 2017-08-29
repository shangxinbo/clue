<template>
    <div class="date-warp">
        <div class="select-warp" :class="{'select-open':select1Show}">
            <p class="all" @click.stop="select1Show=true">
                <span>{{selectedProvince.name}}</span>
            </p>
            <div class="select-ul">
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <ul>
                        <li v-for="item in province" @click.stop="selectProvince(item.id,item.name)">{{item.name}}</li>
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
                        <li v-for="item in pieceCity" @click.stop="selectCity(item.id,item.name)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <span class="icon add" @click="add"></span>
    </div>
</template>
<script>
    import province from 'assets/js/province.json'
    import city from 'assets/js/city.json'
    import Vue from 'vue'
    export default {
        data() {
            return {
                select1Show: false,
                select2Show: false,
                province: province,
                city: city,
                pieceCity: [],
                selectedProvince: {
                    id: '',
                    name: '请选择'
                },
                selectedCity: {
                    id: '',
                    name: '全部'
                }
            }
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
                this.pieceCity = this.city[newVal.id]
            }
        },
        methods: {
            selectProvince(id, name) {
                this.selectedProvince = {
                    id: id,
                    name: name
                }
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
                if(this.selectedProvince.id){
                    this.$emit('add',this.selectedProvince,this.selectedCity)
                }
            }
        }
    }

</script>