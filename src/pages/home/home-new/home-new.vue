<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-27 14:32:16
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-27 16:41:14
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-27 14:32:16
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-27 16:29:40
-->
<template>
    <div class="home-new">home-new</div>
</template>

<script>
export default {
    components: {},
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {
        // 修改页面的标题
        uni.setNavigationBarTitle({ title: "最新" });
    },

    // 页面周期函数--监听页面加载
    onLoad() {},
    // 页面周期函数--监听页面初次渲染完成
    onReady() {},
    // 页面周期函数--监听页面显示(not-nvue)
    onShow() {},
    // 页面周期函数--监听页面隐藏
    onHide() {},
    // 页面周期函数--监听页面卸载
    onUnload() {},
    // 页面处理函数--监听用户下拉动作
    onPullDownRefresh() {
        uni.stopPullDownRefresh();
    },
    // 页面处理函数--监听用户上拉触底
    onReachBottom() {},
    // 页面处理函数--监听页面滚动(not-nvue)
    /* onPageScroll(event) {}, */
    // 页面处理函数--用户点击右上角分享
    /* onShareAppMessage(options) {}, */
};
</script>

<style></style>
