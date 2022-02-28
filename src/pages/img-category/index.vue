<template>
    <view class="video_play">
        <image :src="videoObj.url"></image>

        <!-- 工具栏 开始 -->
        <view class="video_tool">
            <view
                @click="handleMuted"
                :class="['iconfont', muted ? 'icon-icon-2' : 'icon-pinpaiicon']"
            ></view>
            <view class="iconfont icon-fenxiang">
                <button open-type="share"></button>
            </view>
        </view>
        <!-- 工具栏 结束 -->
        <!-- 视频 开始 -->
        <view class="video_wrap">
            <video :muted="muted" :src="videoObj.video" objectFit="fill"></video>
        </view>
        <!-- 视频 结束 -->

        <!-- 下载 开始 -->
        <view class="download">
            <view class="download_btn" @click="handleDownload">下载高清</view>
        </view>
        <!-- 下载 结束 -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            videoObj: {
                url:
                    "http://img5.adesk.com/61ae09357e978a3aa51aefbb?imageMogr2/thumbnail/!350x540r/gravity/Center/crop/350x540&sign=c205baffe104a5425c8bc4cb1e05c330&t=621c907b",
                video:
                    "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4",
            },
            // 是否静音
            muted: false,
        };
    },
    onLoad() {
        // console.log(getApp().globalData);
    },
    methods: {
        // 开关声音
        handleMuted() {
            this.muted = !this.muted;
        },
        // 下载视频
        async handleDownload() {
            await uni.showLoading({ title: "下载中" });

            // 1 将远程文件 下载到小程序内存中
            const result = await uni.downloadFile({ url: this.videoObj.video });
            // 2 将内存中的文件 下载到本地上
            const { tempFilePath } = result;
            console.log(result);
            await uni.saveVideoToPhotosAlbum({
                filePath: tempFilePath,
            });

            uni.hideLoading();

            await uni.showToast({ title: "下载成功" });
        },
    },
};
</script>

<style lang="scss" scoped>
.video_play {
    position: relative;
    image {
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        // css3 滤镜
        filter: blur(20px);
    }

    .video_tool {
        height: 80rpx;
        display: flex;
        justify-content: flex-end;
        .iconfont {
            width: 80rpx;
            color: #fff;
            font-size: 50rpx;
            border-radius: 40rpx;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 30rpx;
        }
        .icon-fenxiang {
            position: relative;
            button {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                background: $color;
            }
        }
    }

    .video_wrap {
        display: flex;
        justify-content: center;
        video {
            width: 460rpx;
            height: 800rpx;
        }
    }

    .download {
        display: flex;
        justify-content: center;
        margin-top: 30rpx;
        .download_btn {
            width: 360rpx;
            height: 80rpx;
            border-radius: 40rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            border: 1rpx solid #fff;
            background-color: $color;
        }
    }
}
</style>
