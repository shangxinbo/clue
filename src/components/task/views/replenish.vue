<template>
    <div class="cutover-task02">
        <ul class="data-text">
            <li>
                <label class="name">上传文件</label>
                <div class="input-warp upload-warp">
                    <input class="text" type="text">
                    <button class="btn" type="button">
                        <span>
                            <i class="icon upload"></i>上传</span>
                    </button>
                </div>
            </li>
            <li>
                <label class="name"></label>
                <div class="input-warp upload-warp">
                    <input class="text" type="text">
                    <img src="" width="18" height="18" alt="上传中" title="上传中">
                </div>
            </li>
            <li>
                <label class="name"></label>
                <div class="input-warp upload-warp">
                    <input class="text" type="text">
                    <span class="icon succ" style="display: block"></span>
                    <button class="btn afresh" type="button">
                        <span>
                            <i class="icon afresh"></i>重新上传</span>
                    </button>
                </div>
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
                <label class="name">选择产品</label>
                <div class="input-warp">
                    <p class="text">短信营销</p>
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