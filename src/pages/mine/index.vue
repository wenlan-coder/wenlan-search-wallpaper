<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-27 11:56:59
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-28 22:47:30
-->
<template>
    <view class="login-container">
        <template v-if="Object.keys(userInfo).length === 0">
            <!-- 提示登录的图标 -->
            <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
            <!-- 登录按钮 -->
            <button type="primary" class="btn-login" @click="getUserInfo">
                一键登录
            </button>
            <!-- 登录提示 -->
            <view class="tips-text">登录后尽享更多权益</view>
        </template>
        <template class="login-container" v-if="Object.keys(userInfo).length > 0">
            <view>
                <text>{{ userInfo.nickName }}</text>
                <image :src="userInfo.avatarUrl" class="image_container" mode="widthFix"></image>
            </view>
        </template>
    </view>
</template>

<script>
export default {
    data: () => ({
        userInfo: {},
    }),
    methods: {
        // 获取微信用户的基本信息
        getUserInfo() {
            console.log("this执", this);
            let that = this;
            // console.log('微信授权弹窗');
            uni.getSetting({
                success(res) {
                    // console.log("授权：", res);
                    uni.showModal({
                        title: "授权提醒",
                        content: "请授权头像等信息，以便为您提供更好的服务",
                        cancelText: "随便逛逛",
                        confirmText: "确认授权",
                        success: function(showres) {
                            if (showres.confirm) {
                                // console.log('用户点击确定');
                                console.log("this执", this);
                                uni.getUserProfile({
                                    desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                                    lang: "zh_CN",
                                    success: infoRes => {
                                        console.log("授权信息", infoRes);
                                        that.userInfo = { ...infoRes.userInfo };
                                        uni.login({
                                            provider: "weixin",
                                            success: res1 => {
                                                //在这里调取后台登录接口
                                                console.log(res1);
                                                console.log("code", res1.code);
                                            },
                                            fail: () => {
                                                uni.showToast({
                                                    title: "微信登录授权失败",
                                                    icon: "none",
                                                });
                                            },
                                        });
                                    },
                                });
                            } else if (showres.cancel) {
                                uni.showToast({
                                    title: "用户取消授权",
                                    icon: "none",
                                });
                            }
                        },
                    });
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.image_container {
    width: 130rpx;
}
.login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
        content: " ";
        display: block;
        position: absolute;
        width: 100%;
        height: 40px;
        left: 0;
        bottom: 0;
        background-color: white;
        border-radius: 100%;
        transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
        width: 90%;
        border-radius: 100px;
        margin: 15px 0;
        background-color: $color;
    }

    // 按钮下方提示消息的样式
    .tips-text {
        font-size: 12px;
        color: gray;
    }
}
</style>
