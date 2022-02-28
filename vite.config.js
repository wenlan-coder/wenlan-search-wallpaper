/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-02-27 10:35:21
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-28 11:17:15
 */
import { defineConfig } from "vite";
const path = require("path");
import uni from "@dcloudio/vite-plugin-uni";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
