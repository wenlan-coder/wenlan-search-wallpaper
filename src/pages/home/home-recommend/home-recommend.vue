<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-27 14:32:49
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-28 09:49:49
-->
<template>
    <!-- 推荐开始 -->
    <scroll-view
        scroll-y
        v-if="recommends.length > 0"
        @scrolltolower="handleToLower"
        class="recommend_view"
    >
        <view class="recommend_wrap">
            <navigator
                class="recommend_item"
                v-for="item in recommends"
                :key="item.id"
                :url="`/pages/album/album?id=${item.target}`"
            >
                <image mode="widthFix" :src="item.thumb"></image>
            </navigator>
        </view>
        <!-- 推荐结束 -->
        <!-- 月份开始 -->
        <view class="month_wrap">
            <view class="month_title">
                <view class="month_title_info">
                    <text>{{ monthes.DD }} /</text>
                    {{ monthes.MM }} 月
                </view>
                <view class="monthes_text">{{ monthes.title }}</view>
                <view class="monthes_title_more">更多 ></view>
            </view>
            <view class="monthes_content">
                <view class="monthes_item" v-for="(item, index) in monthes.items" :key="item.id">
                    <go-detail :index="index" :list="monthes.items">
                        <image
                            :src="item.thumb + item.rule.replace('$<Height>', 360)"
                            mode="aspectFill"
                        ></image>
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 月份结束 -->
        <!-- 热门开始 -->
        <view class="hots_wrap">
            <view class="hots_title">
                <text>热门</text>
            </view>
            <view class="hots_content">
                <view class="hot_item" v-for="(item, index) in hots" :key="item.id">
                    <go-detail :index="index" :list="hots">
                        <image mode="widthFix" :src="item.thumb"></image>
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 热门结束 -->
    </scroll-view>
</template>

<script>
import goDetail from "@/components/go-detail.vue";
import dayjs from "dayjs";
export default {
    components: {
        goDetail,
    },
    data: () => ({
        // 推荐列表
        recommends: [],
        // 月份
        monthes: {},
        // 热门
        hots: [],
        // 请求的参数
        params: {
            // 要获取几条
            limit: 30,
            // 关键字
            order: "hot",
            // 要跳过几条
            skip: 0,
        },
        // 是否还有下一页
        hasMore: true,
    }),
    computed: {},
    methods: {
        // 获取接口的数据
        getList() {
            this.$request
                .get("/v3/homepage/vertical", { ...this.params })
                .then(res => {
                    // 判断还有没有下一页数据
                    if (res.res.vertical.length === 0) {
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有更多数据了",
                            icon: "none",
                        });
                        return;
                    }

                    if (this.recommends.length === 0) {
                        // 第一次发送的请求
                        // 推荐模块
                        this.recommends = res.res.homepage[1].items;
                        // 月份模块
                        this.monthes = res.res.homepage[2];
                        this.monthes.MM = dayjs(this.monthes.stime).format("MM");
                        this.monthes.DD = dayjs(this.monthes.stime).format("DD");
                        console.log(this.monthes);
                    }
                    // 获取热门数据的列表
                    this.hots = [...this.hots, ...res.res.vertical];
                    console.log("@@", this.hots);
                })
                .catch(err => {
                    console.log(err.message);
                });
        },
        // 滚动条触底事件
        handleToLower() {
            //
            // 1 修改参数  skip+=limit;
            // 2 重新发送请求 getList()
            // 3 请求回来成功  hots 数据的叠加
            //
            if (this.hasMore) {
                this.params.skip += this.params.limit;
                this.getList();
            } else {
                // 弹窗提示用户
                uni.showToast({
                    title: "没有数据了",
                    icon: "none",
                });
            }
        },
    },
    watch: {},
    mounted() {
        // 修改页面的标题
        uni.setNavigationBarTitle({ title: "推荐" });
        //请求数据
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
.recommend_view {
    // height：屏幕的高度 -  头部标题的高度
    height: calc(100vh - 40px);
}
.recommend_wrap {
    // flex布局
    display: flex;
    flex-wrap: wrap;
    .recommend_item {
        width: 50%;
        border: 5rpx solid #fff;
    }
}
.monthes_content {
    display: flex;
    flex-wrap: wrap;
    .monthes_item {
        width: 33.33%;
        border: 5rpx solid #fff;
    }
}
.month_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .month_title_info {
        color: $uni-color-success;
        font-size: 30rpx;
        font-weight: 600;
        display: flex;
    }

    .monthes_text {
        font-size: 34rpx;
        font-weight: 600;
        color: #666;
        margin-left: 30rpx;
    }

    .monthes_title_more {
        font-size: 24rpx;
        color: $uni-color-success;
    }
}
.hots_wrap {
    .hots_title {
        padding: 20rpx;
        text {
            border-left: 20rpx solid $uni-color-success;
            padding-left: 20rpx;
            font-size: 34rpx;
            font-weight: 600;
        }
    }

    .hots_content {
        display: flex;
        flex-wrap: wrap;
        .hot_item {
            width: 33.33%;
            border: 5rpx solid #fff;
        }
    }
}
</style>
