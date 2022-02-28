<template>
    <view class="album_bg">
        <!-- 专辑背景 开始 -->
        <view class="album_bg">
            <image mode="widthFix" :src="album.cover"></image>
            <view class="album_info">
                <view class="album_name">{{ album.name }}</view>
                <view class="album_btn">关注专辑</view>
            </view>
        </view>
        <!-- 专辑背景 结束 -->
        <!-- 专辑作者 开始 -->
        <view class="album_author">
            <view class="album_author_info">
                <image mode="widthFix" :src="album.user.avatar"></image>
                <view class="author_name">{{ album.user.name }}</view>
            </view>
            <view class="album_author_desc">
                <!-- text 使用 b站  -->
                <text>{{ album.desc }}</text>
            </view>
        </view>
        <!-- 专辑作者 结束 -->
        <!-- 图片列表 开始 -->
        <view class="album_list">
            <view class="album_item" v-for="(item, index) in wallpaper" :key="item.id">
                <go-detail :list="wallpaper" :index="index">
                    <image
                        mode="aspectFill"
                        :src="item.thumb + item.rule.replace('$<Height>', 360)"
                    ></image>
                </go-detail>
            </view>
        </view>
        <!-- 图片列表 结束 -->
    </view>
</template>

<script>
export default {
    components: {},
    data: () => ({
        params: {
            limit: 30,
            order: "new",
            skip: 0,
            // 1 返回值中 有 album对象 表示第一次请求数据
            // 0 返回值中 只有 wallpaper 数组  不是第一次请求数据
            first: 1,
        },
        id: -1,
        album: {},
        wallpaper: [],
        hasMore: true,
    }),
    computed: {},
    methods: {
        getList() {
            this.$request
                .get(`/v1/wallpaper/album/${this.id}/wallpaper`, { ...this.params })
                .then(res => {
                    console.log(res);
                    //第一次请求 避免数据重新刷新
                    if (Object.keys(this.album).length === 0) {
                        this.album = res.res.album;
                    }
                    //判断wallpapaer部分
                    if (res.res.wallpaper.length === 0) {
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有更多数据了",
                            icon: "none",
                        });
                        return;
                    }
                    this.wallpaper = [...this.wallpaper, ...res.res.wallpaper];
                })
                .catch(err => {
                    console.log(err.message);
                });
        },
        // 页面触底 上拉加载下一页事件
        onReachBottom() {
            console.log("我也是有底线的");
            if (this.hasMore) {
                this.params.first = 0;
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
    onLoad(options) {
        console.log(options);
        this.id = options.id;
        //请求数据
        this.getList();
    },
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
.album_bg {
    position: relative;
    .album_info {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        height: 80rpx;
        align-items: center;
        color: #fff;
        padding: 0 15rpx;
        .album_name {
            font-size: 40rpx;
        }
        .album_btn {
            background-color: $color;
            width: 152rpx;
            height: 60rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10rpx;
        }
    }
}
.album_author {
    margin-left: 10rpx;
    padding: 10rpx;
    .album_author_info {
        padding: 10rpx 0;
        display: flex;
        image {
            width: 50rpx;
        }

        .author_name {
            color: #000;
            margin-left: 15rpx;
        }
    }
}
</style>
