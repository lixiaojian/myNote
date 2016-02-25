# 移动Web开发技巧汇总
### META相关
1. 添加到主屏后的标题（IOS）
```html
<meta name="apple-mobile-web-app-title" content="标题">
```
2. 启用 WebApp 全屏模式（IOS）

	当网站添加到主屏幕后再点击进行启动时，可隐藏地址栏（从浏览器跳转或输入链接进入并没有此效果）

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-touch-fullscreen" content="yes" />
```
3. 百度禁止转码

	通过百度手机打开网页时，百度可能会对你的网页进行转码，往你页面贴上它的广告，非常之恶心。不过我们可以通过这个meta标签来禁止它：
```html
<meta http-equiv="Cache-Control" content="no-siteapp" />
```
[百度SiteApp转码声明](http://m.baidu.com/pub/help.php?pn=22&ssid=0&from=844b&bd_page_type=1)

4.设置状态栏的背景颜色（IOS）

	设置状态栏的背景颜色，只有在 `"apple-mobile-web-app-capable" content="yes"`时生效
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

>content 参数：
* default ：状态栏背景是白色
* black ：状态栏背景是黑色。
* black-translucent ：状态栏背景是半透明。 如果设置为 default 或 black ,网页内容从状态栏底部开始。 如果设置为 black-translucent ,网页内容充满整个屏幕，顶部会被状态栏遮挡

5. 移动端手机号码识别（IOS）

	在 iOS Safari （其他浏览器和Android均不会）上会对那些看起来像是电话号码的数字处理为电话链接，比如：

* 7位数字，形如：1234567
* 带括号及加号的数字，形如：(+86)123456789
* 双连接线的数字，形如：00-00-00111
* 11位数字，形如：13800138000

**可能还有其他类型的数字也会被识别。我们可以通过如下的meta来关闭电话号码的自动识别：**
```html
<meta name="format-detection" content="telephone=no" />
```
**开启电话功能**
```html
<a href="tel:123456">123456</a>
```
**开启短信功能：**
```html
<a href="sms:123456">123456</a>
```
6. 移动端邮箱识别（Android）

与电话号码的识别一样，在安卓上会对符合邮箱格式的字符串进行识别，我们可以通过如下的meta来管别邮箱的自动识别：
```html
<meta content="email=no" name="format-detection" />
```
同样地，我们也可以通过标签属性来开启长按邮箱地址弹出邮件发送的功能：
```html
<a mailto:dooyoe@gmail.com">dooyoe@gmail.com</a>
```
7. 添加智能 App 广告条 Smart App Banner（IOS 6+ Safari）
```html
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
```
8. IOS Web app启动动画

由于iPad 的启动画面是不包括状态栏区域的。所以启动图片需要减去状态栏区域所对应的方向上的20px大小，相应地在retina设备上要减去40px的大小
```html
<!-- iPhone -->
<link href="apple-touch-startup-image-320x460.png" media="(device-width: 320px)" rel="apple-touch-startup-image">
<!-- iPhone (Retina) -->
<link href="apple-touch-startup-image-640x960.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<!-- iPad (portrait) -->
<link href="apple-touch-startup-image-768x1004.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image">
<!-- iPad (landscape) -->
<link href="apple-touch-startup-image-748x1024.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image">
<!-- iPad (Retina, portrait) -->
<link href="apple-touch-startup-image-1536x2008.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<!-- iPad (Retina, landscape) -->
<link href="apple-touch-startup-image-2048x1496.png" media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
```
`（landscape：横屏 | portrait：竖屏）`

9. 添加到主屏后的APP图标

指定web app添加到主屏后的图标路径，有两种略微不同的方式：
```html
<!-- 设计原图 -->
<link href="short_cut_114x114.png" rel="apple-touch-icon-precomposed">
<!-- 添加高光效果 -->
<link href="short_cut_114x114.png" rel="apple-touch-icon">
```
* apple-touch-icon：在IOS6及以下的版本会自动为图标添加一层高光效果（IOS7开始已使用扁平化的设计风格）
* apple-touch-icon-precomposed：使用“设计原图图标”
效果：
![pic](http://7u2qrr.com1.z0.glb.clouddn.com/blog_142325268767880.png)

**图标尺寸：**

可通过指定size属性来为不同的设备提供不同的图标（但通常来说，我们只需提供一个114 x 114 pixels大小的图标即可 ）

官方说明如下
>Create different sizes of your app icon for different devices. If you’re creating a universal app, you need to supply app icons in all four sizes.
>For iPhone and iPod touch both of these sizes are required:
>57 x 57 pixels
>114 x 114 pixels (high resolution)
>For iPad, both of these sizes are required:
>72 x 72 pixels
>144 x 144 (high resolution)

10. 优先使用最新版本 IE 和 Chrome
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
```
11. viewport模板
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<meta content="yes" name="apple-mobile-web-app-capable">
		<meta content="black" name="apple-mobile-web-app-status-bar-style">
		<meta content="telephone=no" name="format-detection">
		<meta content="email=no" name="format-detection">
		<title>标题</title>
		<link rel="stylesheet" href="index.css">
	</head>
	<body>
	这里开始内容
	</body>
</html>
```

### 常见问题
1. 移动端如何定义字体font-family
>三大手机系统的字体：

**ios 系统**
* 默认中文字体是Heiti SC
* 默认英文字体是Helvetica
* 默认数字字体是HelveticaNeue
* 无微软雅黑字体

**android 系统**
* 默认中文字体是Droidsansfallback
* 默认英文和数字字体是Droid Sans
* 无微软雅黑字体




