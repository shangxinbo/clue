<template>
    <div class="input-warp">
        <div class="select-warp" :class="[{'select-open':show}, addClass]">
            <p class="all" @click="showSelect($event)">
                <span>{{selected.name}}</span>
            </p>
            <div class="select-ul">
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <ul>
                        <li v-for="(item,index) in list" @click.stop="change(item)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <p v-if="error" class="error">{{error}}</p>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                selected: { id: '', name: '' },
                list: [],     //item {id,name}
                show: false
            }
        },
        props: ['api', 'param', 'id', 'name', 'initlist', 'error', 'addClass', 'hideAll', 'disabled'],
        watch: {
            id(newVal, oldVal) {
                this.choose(newVal)
            },
            name(newVal, oldVal) {
                this.choose('', newVal)
            },
            initlist(newVal, oldVal) {
                this.init()
            }
        },
        created() {
            this.init()
        },
        mounted() {
            let _this = this
            Vue.nextTick(() => {
                document.addEventListener('click', () => {
                    _this.show = false
                })
            })
        },
        methods: {
            showSelect(event) {
                event.stopPropagation()
                event.preventDefault()
                // 关掉其他的select
                let allSelect = document.querySelectorAll('.select-open')
                allSelect.forEach(item=>{
                    item.className = item.className.replace('select-open','')
                })
                if (this.disabled) return false
                if (this.show) {
                    this.show = false
                } else {
                    this.show = true
                }
            },
            change(obj) {
                if (obj) {
                    this.selected = obj
                } else {
                    this.selected = {
                        id: '',
                        name: '请选择'
                    }
                }
                this.$emit('change', this.selected)
                this.show = false
            },
            choose(id, name) {
                let finded = false
                this.list.find((value, index) => {
                    if (id !== '' && id == value.id) {
                        this.selected = value
                        finded = true
                    }
                    if (name !== '' && name == value.name) {
                        this.selected = value
                        finded = true
                    }
                })

                if (!finded) {
                    if (this.hideAll) {
                        this.selected = this.list.length > 0 ? this.list[0] : { id: '', name: '' }
                    } else {
                        this.selected = {
                            id: '',
                            name: '请选择'
                        }
                    }
                }
                this.$emit('change', this.selected)
            },
            init(callback) {
                if (this.initlist) {
                    this.list = this.initlist  //保证initlist 是合规的
                    this.choose(this.id, this.name)

                    if (callback) callback()

                } else if (this.api) {
                    let obj = this.param ? this.param : {}
                    this.$ajax({
                        url: this.api,
                        data: obj,
                        success: data => {
                            let arr = []
                            let list = data.data
                            if (list instanceof Array) {
                                list.forEach((item, index) => {
                                    arr.push({
                                        id: (item.id == undefined) ? ((item.code == undefined) ? index + 1 : item.code) : item.id,
                                        name: item.name || item.desc || item.user || item.costomer_name || item.model_name || item
                                    })
                                })
                            } else {
                                for (let i in list) {
                                    arr.push({
                                        id: i,
                                        name: list[i]
                                    })
                                }
                            }
                            // arr.sort((p, n) => {
                            //     return parseInt(n.id) - parseInt(p.id)
                            // })

                            this.list = arr
                            this.choose(this.id, this.name)
                            if (callback) callback()
                        }
                    })
                }
            }
        }
    }

</script>