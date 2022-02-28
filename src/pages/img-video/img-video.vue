<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-28 15:13:04
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-28 15:41:50
-->
<template>
    <div class="img-video">
        <view class="category_tab">
            <view class="category_tab_title">
                <view class="title_inner">
                    <uni-segmented-control
                        :values="items.map(v => v.title)"
                        :current="current"
                        @clickItem="onClickItem"
                        style-type="text"
                        active-color="#4cd964"
                    ></uni-segmented-control>
                </view>
                <view class="iconfont iconsearch"></view>
            </view>
            <scroll-view
                @scrolltolower="handleScrolltolower"
                enable-flex
                scroll-y
                class="category_tab_content"
            >
                <view class="cate_item" v-for="item in vertical" :key="item.id">
                    <image :src="item.thumb" mode="widthFix"></image>
                </view>
            </scroll-view>
        </view>
    </div>
</template>

<script>
export default {
    components: {},
    data: () => ({
        items: [
            { title: "最新", order: "new" },
            { title: "热门", order: "hot" },
        ],
        current: 0,
        params: {
            limit: 30,
            skip: 0,
            order: "new",
        },
        id: 0,
        // 页面显示数据的数组
        vertical: [],
        hasMore: true,
    }),
    onLoad(options) {
        this.id = options.id;
        this.getList();
    },

    computed: {},
    methods: {
        onClickItem(e) {
            /*
      1 根据被点击的标题 切换标题
      2 切换order
      3 重新发送请求
       */

            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            } else {
                // 点击的是相同的标题
                return;
            }
            this.params.order = this.items[e.currentIndex].order;
            this.params.skip = 0;
            this.vertical = [];
            this.getList();
        },
        getList() {
            this.$request
                .get(`/v1/vertical/category/${this.id}/vertical`, {
                    ...this.params,
                })
                .then(result => {
                    console.log(result);
                    if (result.res.vertical.length === 0) {
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有更多数据了",
                            icon: "none",
                        });
                        return;
                    }

                    this.vertical = [...this.vertical, ...result.res.vertical];
                });
        },
        // 加载下一页数据
        handleScrolltolower() {
            if (this.hasMore) {
                this.params.skip += this.params.limit;
                this.getList();
            } else {
                uni.showToast({
                    title: "没有更多数据了",
                    icon: "none",
                });
            }
        },
    },
    watch: {},

    // 页面周期函数--监听页面加载
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
.category_tab {
    .category_tab_title {
        position: relative;
        .title_inner {
            width: 60%;
            margin: 0 auto;
        }
        .iconsearch {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 5%;
        }
    }
    .category_tab_content {
        display: flex;
        flex-wrap: wrap;
        height: calc(100vh - 40px);
        .cate_item {
            width: 33.33%;
            border: 5rpx solid #fff;
        }
    }
}
</style>
