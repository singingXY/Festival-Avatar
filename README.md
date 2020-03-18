# Festival-Avatar

## 技术栈

vue + vue/cli + vant + canvas + fabric.js
使用 fabric.js 可以让对 canvas 的操作更简单。

## 功能预览

上传图片在线制作节日头像

![image](https://raw.githubusercontent.com/singingXY/mypic/master/makeAvatar/1.png)

点击贴纸素材添加到头像上，素材可调整大小旋转角度，添加多个素材时为方便操作可将素材锁定位置。

![image](https://raw.githubusercontent.com/singingXY/mypic/master/makeAvatar/2.png)

制作完成后保存

![image](https://raw.githubusercontent.com/singingXY/mypic/master/makeAvatar/3.png)

## 在线预览地址

[点我查看](http://singingxy.gitee.io/festival-avatar/)

## 项目运行

```
git clone git@github.com:singingXY/Festival-Avatar.git

npm install

npm run serve
```

## 目录说明

```
Festival-Avatar
├─ .eslintrc.js                     // eslint配置
├─ .gitignore                       // git忽略文件
├─ README.md                        // 项目说明
├─ babel.config.js                  // babel配置
├─ dist                             // 输出目录
├─ node_modules                     // Node.js 模块
├─ package-lock.json                // 依赖包版本固定
├─ package.json                     // 项目配置文件
├─ public                           // 资源文件
│   ├─ favicon.ico                  // 图标
│   ├─ img                          // 图片资源
│   └─ index.html                   // 入口html文件
├─ src                              // 源码目录
│   ├─ App.vue                      // 页面入口文件
│   ├─ components                   // 组件
│   │   └─ main.vue                 // 总页面
│   └─ main.js                      // 程序入口文件
└─ vue.config.js                    // vue配置文件
```
