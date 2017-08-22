<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">
                <span class="name">创建模板</span>
            </div>
            <div class="data-property task-box">
                <form>
                    <div class="task-push">
                        <ul class="data-text">
                            <li>
                                <label class="name">模板名称</label>
                                <div class="input-warp">
                                    <input class="text" type="text">
                                </div>
                            </li>
                            <li>
                                <label class="name">客户名称</label>
                                <div class="input-warp">
                                    <div class="select-warp ">
                                        <!-- 在div上加上class（select-open）显示出ul列表 -->
                                        <p class="all">
                                            <span>请选择</span>
                                        </p>
                                        <div class="select-ul">
                                            <div class="scroll-warp scrollBar">
                                                <ul>
                                                    <li>名称1</li>
                                                    <li>名称2</li>
                                                    <li>名称3</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label class="name">项目名称</label>
                                <div class="input-warp">
                                    <div class="select-warp ">
                                        <!-- 在div上加上class（select-open）显示出ul列表 -->
                                        <p class="all">
                                            <span>请选择</span>
                                        </p>
                                        <div class="select-ul">
                                            <div class="scroll-warp scrollBar">
                                                <ul>
                                                    <li>名称1</li>
                                                    <li>名称2</li>
                                                    <li>名称3</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label class="name">短信文本</label>
                                <div class="input-warp">
                                    <textarea></textarea>
                                    <p class="tips">最多录入70个字符，已经输入0个字符</p>

                                </div>
                            </li>
                            <li>
                                <label class="name">短信链接</label>
                                <div class="input-warp">
                                    <input class="text" type="text">
                                    <p class="tips">如有短信链接，务必在短信文本中对应位置加入链接占位符#url#</p>
                                    <!--<p class="tips error">请输入正确的链接</p>-->
                                </div>
                            </li>
                            <li>
                                <label class="name">发送渠道</label>
                                <div class="input-warp">
                                    <div class="select-warp ">
                                        <!-- 在div上加上class（select-open）显示出ul列表 -->
                                        <p class="all">
                                            <span>请选择</span>
                                        </p>
                                        <div class="select-ul">
                                            <div class="scroll-warp scrollBar">
                                                <ul>
                                                    <li>渠道1</li>
                                                    <li>渠道2</li>
                                                    <li>渠道3</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label class="name">短信签名</label>
                                <div class="input-warp">
                                    <div class="select-warp ">
                                        <!-- 在div上加上class（select-open）显示出ul列表 -->
                                        <p class="all">
                                            <span>请选择</span>
                                        </p>
                                        <div class="select-ul">
                                            <div class="scroll-warp scrollBar">
                                                <ul>
                                                    <li>签名1</li>
                                                    <li>签名2</li>
                                                    <li>签名3</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="li-btn">
                                <div class="input-warp">
                                    <button class="btn confirm" type="button" onclick="getWindow('newSucc','tips-succ');">提交</button>
                                </div>
                            </li>
                        </ul>
                        <div class="sms-phone">
                            <div class="inrr">
                                <i class="bg-up"></i>
                                <i class="bg-down"></i>
                                <p>【集奥聚合】</p>
                                <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                                    <a href="">http://www.GEOtmt.com/ </a> 退订TD</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>