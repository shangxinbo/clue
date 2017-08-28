<template>
    <div class="cutover-task01">
        <ul class="data-text">
            <li>
                <label class="name">选择模型</label>
                <mselect ref="modelSelect" :api="modelApi"></mselect>
            </li>
            <li>
                <label class="name">选择产品</label>
                <mselect ref="productSelect" :api="productApi"></mselect>
            </li>
            <li>
                <label class="name">选择客户</label>
                <div class="input-warp">
                    <div class="select-warp ">
                        <!-- 在div上加上class（select-open）显示出ul列表 -->
                        <p class="all">
                            <span>请选择</span>
                        </p>
                        <div class="select-ul">
                            <div class="scroll-warp scrollBar">
                                <ul>
                                    <li>平安</li>
                                    <li>融之家</li>
                                    <li>叮当贷</li>
                                    <li>微盟</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <label class="name">选择项目</label>
                <div class="input-warp">
                    <div class="select-warp ">
                        <!-- 在div上加上class（select-open）显示出ul列表 -->
                        <p class="all">
                            <span>请选择</span>
                        </p>
                        <div class="select-ul">
                            <div class="scroll-warp scrollBar">
                                <ul>
                                    <li>平安</li>
                                    <li>融之家</li>
                                    <li>叮当贷</li>
                                    <li>微盟</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <label class="name">优先级</label>
                <div class="input-warp">
                    <input class="text" type="text">
                    <p class="tips">从1开始的正整数，数字越小，优先级越高</p>
                    <!--<p class="tips error">输入错误</p>-->
                </div>
            </li>
            <li>
                <label class="name">数据量</label>
                <div class="input-warp">
                    <input class="text" type="text">
                </div>
            </li>
            <li>
                <label class="name">运营商</label>
                <div class="input-warp">
                    <ul class="check-warp">
                        <li class="active">
                            <i class="icon"></i>
                            <span>电信</span>
                        </li>
                        <li>
                            <i class="icon"></i>
                            <span>联通</span>
                        </li>
                        <li>
                            <i class="icon"></i>
                            <span>移动</span>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <label class="name">地域</label>
                <div class="input-warp">
                    <label onclick="payCutover(this)" class="radio-warp radio-active" for="areaAll">
                        <input type="radio" name="areaAll" class="radio" id="areaAll" value="sendBatch" checked="checked">
                        <i class="icon"></i>
                        <span class="radioname">全国</span>
                    </label>
                    <label onclick="payCutover(this)" class="radio-warp" for="areaProvince">
                        <input type="radio" name="areaProvince" class="radio" id="areaProvince" value="sendSingle">
                        <i class="icon"></i>
                        <span class="radioname"></span>
                        <div class="select-current">
                            <p>
                                <span>河北省</span>
                                <span>石家庄</span>
                                <i class="icon"></i>
                            </p>
                            <p>
                                <span>河北省</span>
                                <span>张家口</span>
                                <i class="icon"></i>
                            </p>
                        </div>
                        <div class="date-warp">
                            <div class="select-warp ">
                                <!-- 在div上加上class（select-open）显示出ul列表 -->
                                <p class="all">
                                    <span>请选择</span>
                                </p>
                                <div class="select-ul">
                                    <div class="scroll-warp scrollBar">
                                        <ul>
                                            <li>北京市</li>
                                            <li>河北省</li>
                                            <li>山东省</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="select-warp ">
                                <!-- 在div上加上class（select-open）显示出ul列表 -->
                                <p class="all">
                                    <span>全部</span>
                                </p>
                                <div class="select-ul">
                                    <div class="scroll-warp scrollBar">
                                        <ul>
                                            <li>全部</li>
                                            <li>北京市</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <span class="icon add"></span>
                        </div>
                    </label>
                    <label onclick="payCutover(this)" class="radio-warp" for="areaShield">
                        <input type="radio" name="areaShield" class="radio" id="areaShield" value="sendSingle">
                        <i class="icon"></i>
                        <span class="radioname">屏蔽</span>
                        <div class="select-current" id="demo1" style="display: none">
                            <p>
                                <span>北京市</span>
                                <i class="icon"></i>
                            </p>
                        </div>
                        <div class="date-warp" id="demo2">
                            <div class="select-warp ">
                                <!-- 在div上加上class（select-open）显示出ul列表 -->
                                <p class="all">
                                    <span>请选择</span>
                                </p>
                                <div class="select-ul">
                                    <div class="scroll-warp scrollBar">
                                        <ul>
                                            <li>北京市</li>
                                            <li>河北省</li>
                                            <li>山东省</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="date-warp" id="demo3" style="display: none">
                            <div class="select-warp ">
                                <!-- 在div上加上class（select-open）显示出ul列表 -->
                                <p class="all">
                                    <span>请选择</span>
                                </p>
                                <div class="select-ul">
                                    <div class="scroll-warp scrollBar">
                                        <ul>
                                            <li>北京市</li>
                                            <li>河北省</li>
                                            <li>山东省</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="select-warp ">
                                <!-- 在div上加上class（select-open）显示出ul列表 -->
                                <p class="all">
                                    <span>全部</span>
                                </p>
                                <div class="select-ul">
                                    <div class="scroll-warp scrollBar">
                                        <ul>
                                            <li>全部</li>
                                            <li>北京市</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <span class="icon add"></span>
                        </div>
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
    export default {
        data(){
            return {
                modelApi: API.models_get,
                productApi:API.product_list,
            }
        },
        components:{
            mselect
        }
    }
</script>