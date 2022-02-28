<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-27 14:31:38
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-28 15:15:19
-->
<template>
    <view class="home_category">
        <navigator
            class="cate_item"
            v-for="item in category"
            :key="item.id"
            :url="`/pages/img-video/img-video?id=${item.id}`"
        >
            <image mode="aspectFill" :src="item.cover"></image>
            <view class="cate_name">{{ item.name }}</view>
        </navigator>
    </view>
</template>

<script>
export default {
    components: {},
    data: () => ({
        category: [],
    }),
    computed: {},
    methods: {
        getList() {
            this.$request.get("/v1/vertical/category").then(result => {
                this.category = result.res.category;
            });
        },
    },
    watch: {},
    mounted() {
        // 修改页面的标题
        uni.setNavigationBarTitle({ title: "分类" });
        this.getList();
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

<style lang="scss" scoped>
.home_category {
    display: flex;
    flex-wrap: wrap;
    .cate_item {
        width: 33.33%;
        position: relative;
        border: 5rpx solid #fff;
        image {
            height: 240rpx;
        }

        .cate_name {
            position: absolute;
            width: 100%;
            height: 50rpx;
            left: 0;
            bottom: 0;
            color: #fff;
            // css3 渐变
            background-image: linear-gradient(to right top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
            font-size: 40rpx;
            display: flex;
            align-items: center;
            padding-left: 20rpx;
        }
    }
}
</style>
