/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-02-27 10:35:21
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-27 16:54:23
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import request from "./utils/rquest";
export function createApp() {
    const app = createSSRApp(App);
    app.config.globalProperties.$request = request;
    return {
        app,
    };
}
