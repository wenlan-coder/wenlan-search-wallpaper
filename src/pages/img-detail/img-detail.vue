<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-28 09:35:42
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-28 14:22:39
-->
<template>
    <div class="img-detail">
        <!-- 用户信息 开始 -->
        <!-- <view class="user_info">
            <view class="user_icon">
                <image :src="imgDetail.user.avatar" mode="widthFix"></image>
            </view>
            <view class="user_desc">
                <view class="user_name">{{ imgDetail.user.name }}</view>
                <view class="user_time">{{ imgDetail.cnTime }}</view>
            </view>
        </view> -->
        <!-- 用户信息 结束 -->
        <!-- 高清大图 开始 -->
        <view class="high_img">
            <swiper-action @swiperAction="handleSwiperAction">
                <image mode="widthFix" :src="imgDetail.thumb"></image>
            </swiper-action>
        </view>
        <!-- 高清大图 结束 -->

        <!-- 点赞 开始 -->
        <view class="user_rank">
            <view class="rank">
                <text class="iconfont icon-icon">{{ imgDetail.rank }}</text>
            </view>
            <view class="user_collect">
                <text class="iconfont icon-shoucang">收藏</text>
            </view>
        </view>
        <!-- 点赞 结束 -->
        <!-- 专辑 开始 -->
        <view class="album_wrap">
            <!-- 标题 -->
            <view class="album_title">相关</view>
            <!-- 内容 -->
            <view class="album_list">
                <view class="album_item" v-for="item in album" :key="item.id">
                    <view class="album_cover">
                        <image :src="item.cover" mode="aspectFill"></image>
                    </view>
                    <!-- 右边 -->
                    <view class="album_info">
                        <view class="album_info_text">专辑</view>
                        <view class="album_name">{{ item.name }}</view>
                        <text class="iconfont iconiconfontjiantou4"></text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 专辑 结束 -->

        <!-- 最热评论 comment hot -->
        <view class="comment hot">
            <view class="comment_title">
                <text class="iconfont icon-pinpaiicon"></text>
                <text class="comment_text">最热评论</text>
            </view>
            <view class="comment_list">
                <view class="comment_item" v-for="item in hot" :key="item.id">
                    <!-- 用户信息 -->
                    <view class="comment_user">
                        <!-- 用户头像 -->
                        <view class="user_icon">
                            <image mode="widthFix" :src="item.user.avatar"></image>
                        </view>
                        <!-- 用户名称 -->
                        <view class="user_name">
                            <view class="user_nickname">{{ item.user.name }}</view>
                            <view class="user_time">{{ item.cnTime }}</view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="user_badge">
                            <image
                                v-for="item2 in item.user.title"
                                :key="item2.icon"
                                :src="item2.icon"
                            ></image>
                        </view>
                    </view>
                    <!-- 评论数据 -->
                    <view class="comment_desc">
                        <view class="comment_content">{{ item.content }}</view>
                        <view class="comment_like">
                            <text class="iconfont ">{{ item.size }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 最新评论 comment new -->
        <view class="comment new">
            <view class="comment_title">
                <text class="iconfont icon-icon-11"></text>
                <text class="comment_text">最新评论</text>
            </view>
            <view class="comment_list">
                <view class="comment_item" v-for="item in comment" :key="item.id">
                    <!-- 用户信息 -->
                    <view class="comment_user">
                        <!-- 用户头像 -->
                        <view class="user_icon">
                            <image mode="widthFix" :src="item.user.avatar"></image>
                        </view>
                        <!-- 用户名称 -->
                        <view class="user_name">
                            <view class="user_nickname">{{ item.user.name }}</view>
                            <view class="user_time">{{ item.cnTime }}</view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="user_badge">
                            <image
                                v-for="item2 in item.user.title"
                                :key="item2.icon"
                                :src="item2.icon"
                            ></image>
                        </view>
                    </view>
                    <!-- 评论数据 -->
                    <view class="comment_desc">
                        <view class="comment_content">{{ item.content }}</view>
                        <view class="comment_like">
                            <text class="iconfont icondianzan">{{ item.size }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 下载开始 -->
        <view class="download">
            <view class="download_btn" @click="handleDownLoad">下载图片</view>
        </view>
        <!-- 下载结束 -->
    </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn"); // 全局使用简体中文
dayjs.extend(relativeTime);
import swiperAction from "../../components/swiper-action.vue";
export default {
    components: {
        swiperAction,
    },
    data: () => ({
        // 图片信息对象 包含着用户头像。。
        imgDetail: {},
        // 专辑数据 数组
        album: [],
        // 最热评论
        hot: [],
        // 最新评论
        comment: [],
        // 图片的索引
        imgIndex: 0,
    }),
    computed: {},
    methods: {
        // 给当前页面赋值
        getData() {
            const { imgList } = getApp().globalData;
            this.imgDetail = imgList[this.imgIndex];
            console.log(this.imgDetail);

            // xxx年前的数据
            this.imgDetail.cnTime = dayjs(this.imgDetail.atime * 1000).fromNow();
            console.log("时间", this.imgDetail.cnTime);

            // 获取图片详情的id
            // this.imgDetail.id
            this.getComments(this.imgDetail.id);
        },
        getComments(id) {
            this.$request.get(`/v2/wallpaper/wallpaper/${id}/comment`).then(result => {
                this.album = result.res.album;

                // 给hot数组中的对象添加一个时间属性 xxx月前
                result.res.hot.forEach(v => (v.cnTime = dayjs(v.atime * 1000).fromNow()));
                result.res.comment.forEach(v => (v.cnTime = dayjs(v.atime * 1000).fromNow()));

                this.hot = result.res.hot;
                this.comment = result.res.comment;
         
            });
        },
        // 滑动事件
        handleSwiperAction(e) {
            /*
     1 用户 左滑 imgIndex++
     2 用户 右滑 imgIndex--
     3 判断 数组是否越界问题！！
     4 左滑 e.direction==="left"&&this.imgIndex<imgList.length-1
     5 右滑 e.direction==="right"&&this.imgIndex>0
      */
            const { imgList } = getApp().globalData;
            if (e.direction === "left" && this.imgIndex < imgList.length - 1) {
                //  可以进行 左滑 加载下一页
                this.imgIndex++;
                this.getData();
            } else if (e.direction === "right" && this.imgIndex > 0) {
                // 右滑 加载上一页
                this.imgIndex--;
                this.getData();
            } else {
                uni.showToast({
                    title: "没有数据了",
                    icon: "none",
                });
            }
        },
        //下载
        async handleDownLoad() {
            await uni.showLoading({
                title: "下载中",
            });
            //将远程文件下载到小程序的内存中 tempFilePath
            const result = await uni.downloadFile({ url: this.imgDetail.img });
            console.log("小程序内存", result);
            const { tempFilePath } = result;
            //  2 将小程序内存中的临时文件下载到本地上
            const result2 = await uni.saveImageToPhotosAlbum({ filePath: tempFilePath });
            console.log(result2);
            uni.hideLoading();
            await uni.showToast({
                title: "下载成功",
                // icon
            });
        },
    },

    watch: {},

    // 页面周期函数--监听页面加载
    onLoad() {
        const { imgIndex } = getApp().globalData;
        this.imgIndex = imgIndex;
        //请求数据
        this.getData();
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
// 下载
.download {
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .download_btn {
        width: 90%;
        height: 80%;
        background-color: $color;
        color: #fff;
        font-size: 20rpx;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
// 专辑
.album_wrap {
    padding: 20rpx;
    .album_title {
        padding: 10rpx 0;
    }

    .album_list {
        .album_item {
            display: flex;
            padding: 10rpx 0;
            border-bottom: 10rpx solid #eee;
            .album_cover {
                flex: 1;
                image {
                    width: 180rpx;
                    height: 180rpx;
                }
            }

            .album_info {
                flex: 3;
                padding-left: 20rpx;
                position: relative;
                .album_info_text {
                    width: 100rpx;
                    height: 50rpx;
                    background-color: $color;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .album_name {
                    padding: 10rpx 0;
                    color: #888;
                }
                .iconfont {
                    font-size: 40rpx;
                    position: absolute;
                    top: 50%;
                    // css3 变换 转换
                    transform: translateY(-50%);
                    right: 10%;
                    color: #000;
                }
            }
        }
    }
}
.high_img {
    image {
        border-bottom: 1rpx solid #eee;
    }
}
.user_info {
    display: flex;
    padding: 20rpx;
    .user_icon {
        padding: 0 20rpx;
        image {
            width: 88rpx;
            border-radius: 50%;
        }
    }

    .user_desc {
        .user_name {
            color: #000;
            font-weight: 600;
        }

        .user_time {
            color: #ccc;
            font-size: 24rpx;
            padding: 10rpx 0;
        }
    }
}
.user_rank {
    display: flex;
    height: 80rpx;
    border-bottom: 5rpx solid #eee;
    .rank {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    .user_collect {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
// 最热评论
.comment {
    .comment_title {
        padding: 15rpx;
        .iconfont {
            color: red;
            font-size: 40rpx;
        }

        .comment_text {
            font-weight: 600;
            font-size: 28rpx;
            color: #666;
            margin-left: 10rpx;
        }
    }

    .comment_list {
        .comment_item {
            border-bottom: 15rpx solid #eee;
            // 用户信息
            .comment_user {
                display: flex;
                padding: 20rpx 0;
                .user_icon {
                    width: 15%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    image {
                        width: 90%;
                    }
                }

                .user_name {
                    flex: 1;
                    .user_nickname {
                        color: #777;
                    }

                    .user_time {
                        color: #ccc;
                        font-size: 24rpx;
                        padding: 5rpx;
                    }
                }

                .user_badge {
                    image {
                        width: 40rpx;
                        height: 40rpx;
                        display: inline-block;
                    }
                }
            }
            // 评论数据
            .comment_desc {
                display: flex;
                padding: 30rpx 0;
                .comment_content {
                    flex: 1;
                    padding-left: 15%;
                    color: #000;
                }

                .comment_like {
                    text-align: right;
                }
            }
        }
    }
}

// 最新评论
.new {
    .iconpinglun {
        color: aqua !important;
    }
}

// 下载
.download {
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .download_btn {
        width: 90%;
        height: 80%;
        background-color: $color;
        color: #fff;
        font-size: 50rpx;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
// 专辑
.album_wrap {
    padding: 20rpx;
    .album_title {
        padding: 10rpx 0;
    }

    .album_list {
        .album_item {
            display: flex;
            padding: 10rpx 0;
            border-bottom: 10rpx solid #eee;
            .album_cover {
                flex: 1;
                image {
                    width: 180rpx;
                    height: 180rpx;
                }
            }

            .album_info {
                flex: 3;
                padding-left: 20rpx;
                position: relative;
                .album_info_text {
                    width: 100rpx;
                    height: 50rpx;
                    background-color: $color;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .album_name {
                    padding: 10rpx 0;
                    color: #888;
                }
                .iconfont {
                    font-size: 40rpx;
                    position: absolute;
                    top: 50%;
                    // css3 变换 转换
                    transform: translateY(-50%);
                    right: 10%;
                    color: #000;
                }
            }
        }
    }
}
</style>
