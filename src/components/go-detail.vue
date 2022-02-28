<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-28 09:35:01
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-28 09:51:49
-->
<template>
    <view @click="handleClick">
        <slot></slot>
    </view>
</template>

<script>
export default {
    props: {
        list: Array,
        index: Number,
    },
    methods: {
        handleClick() {
            // 1 将数据缓存下拉
            getApp().globalData.imgList = this.list;
            getApp().globalData.imgIndex = this.index;
            // 2 再实现点击跳转页面
            uni.navigateTo({
                url: "/pages/img-detail/img-detail",
            });
        },
    },
};
</script>

<style></style>
