<!--
 * @Descripttion: 
 * @version: 
 * @Author: wenlan
 * @Date: 2022-02-27 10:35:21
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-28 13:50:40
-->
<template>
    <view class="home_tab">
        <view class="home_tab_title">
            <view class="title_inner">
                <uni-segmented-control
                    styleType="text"
                    class="segmented"
                    :current="current"
                    :values="items.map(v => v.title)"
                    @clickItem="onClickItem"
                    activeColor="#4cd964"
                ></uni-segmented-control>
            </view>
            <view class="iconfont_container">
                <image src="../../static/search.png" mode="widthFix"></image>
            </view>
        </view>
        <view class="home_tab_content">
            <view v-if="current === 0">
                <home-recommend></home-recommend>
            </view>
            <view v-if="current === 1">
                <home-category></home-category>
            </view>
            <view v-if="current === 2">
                <home-new></home-new>
            </view>
            <view v-if="current === 3">
                <home-alumb></home-alumb>
            </view>
        </view>
    </view>
</template>

<script>
import homeAlumb from "./home-alumb";
import homeCategory from "./home-category/home-category.vue";
import homeNew from "./home-new/home-new.vue";
import homeRecommend from "./home-recommend/home-recommend.vue";
export default {
    components: {
        homeAlumb,
        homeCategory,
        homeNew,
        homeRecommend,
    },
    data() {
        return {
            items: [{ title: "推荐" }, { title: "分类" }, { title: "最新" }, { title: "专辑" }],
            current: 0,
        };
    },
    methods: {
        onClickItem(e) {
            if (this.current != e.currentIndex) {
                this.current = e.currentIndex;
            }
        },
    },
};
</script>

<style lang="scss">
.home_tab {
    .home_tab_title {
        margin-top: 20rpx;
        position: relative;
        .title_inner {
            width: 75%;
            margin: 0 auto;
            border: none;
        }
        .iconfont_container {
            width: 25px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 5%;
        }
    }
}
</style>
