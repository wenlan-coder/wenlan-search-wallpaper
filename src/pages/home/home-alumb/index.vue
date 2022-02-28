<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-27 14:31:05
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-27 23:41:23
-->
<template>
    <scroll-view class="album_scroll_view" scroll-y @scrolltolower="handleToLower">
        <view>
            <!-- 轮播图 开始 -->
            <view class="alubm_swiper">
                <swiper autoplay indicator-dots circular>
                    <swiper-item v-for="item in banner" :key="item.id">
                        <image :src="item.thumb" mode="widthFix"></image>
                    </swiper-item>
                </swiper>
                <!-- 轮播图 结束 -->
                <!-- 
      
      1 自动轮播 autoplay
      2 指示器 indicator-dots 
      3 衔接轮播 circular

      4 swiper 
        默认的高度 150px
      5 image 
        默认的宽度 320px => 基本样式中 重置了 100%
        默认的高度 240px 
      6 计算图片的宽度和高度的比例
      7 把图片的比例也写到swiper标签样式 
      8 swiper-item 
        100% 
     -->
                <!-- 轮播图 开始 -->
            </view>
            <!-- 轮播图 结束 -->
            <!-- 列表开始 -->
            <view class="alubm_list">
                <navigator
                    class="album_item"
                    v-for="item in album"
                    :key="item.id"
                    :url="`/pages/album/album?id=${item.id}`"
                >
                    <view class="album_img">
                        <image mode="aspectFill" :src="item.cover"></image>
                    </view>
                    <view class="album_info">
                        <view class="album_name">{{ item.name }}</view>
                        <view class="album_desc">{{ item.desc }}</view>
                        <view class="album_btn">
                            <view class="album_attention">关注</view>
                        </view>
                    </view>
                </navigator>
            </view>
            <!-- 列表结束 -->
        </view>
    </scroll-view>
</template>

<script>
export default {
    components: {},
    data: () => ({
        params: {
            limit: 30,
            order: "new",
            skip: 0,
        },
        // 轮播图数字
        banner: [],
        // 列表数组
        album: [],
        // 是否还有分页数据
        hasMore: true,
    }),
    computed: {},
    methods: {
        // 获取接口的数据
        getList() {
            this.$request
                .get("/v1/wallpaper/album", { ...this.params })
                .then(res => {
                    // 判断还有没有下一页数据
                    if (res.res.album.length === 0) {
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有更多数据了",
                            icon: "none",
                        });
                        return;
                    }

                    if (this.album.length === 0) {
                        // 第一次发送的请求
                        // 推荐模块
                        this.banner = res.res.banner;
                    }
                    this.album = [...this.album, ...res.res.album];
                })
                .catch(err => {
                    console.log(err.message);
                });
        },
        // 上拉加载-执行分页
        handleToLower() {
            console.log("武汉加油！！");
            if (this.hasMore) {
                this.params.skip += this.params.limit;
                this.getList();
            } else {
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
        uni.setNavigationBarTitle({
            title: "专辑",
        });
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
.album_scroll_view {
    height: calc(100vh - 36px);
}
.alubm_swiper {
    swiper {
        // 750rpx 326.0869565217392
        height: calc(750rpx / 2.3);
        image {
            height: 100%;
        }
    }
}
.alubm_list {
    padding: 10rpx;
    .album_item {
        padding: 10rpx 0;
        display: flex;
        border-bottom: 1rpx sloid #ccc;

        .album_img {
            flex: 1;
            padding: 10rpx;
            image {
                width: 200rpx;
                height: 200rpx;
            }
        }

        .album_info {
            overflow: hidden;
            flex: 2;
            padding: 0 10rpx;
            .album_name {
                font-size: 30rpx;
                color: #000;
                padding: 10rpx 0;
            }

            .album_desc {
                padding: 10rpx 0;
                font-size: 24rpx;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            .album_btn {
                padding: 10rpx;
                display: flex;
                justify-content: flex-end;
                .album_attention {
                    color: $color;
                    border: 1rpx solid $color;
                    padding: 10rpx;
                }
            }
        }
    }
}
</style>
