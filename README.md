# 2020-Supermap-PD-FrameBS-2D
超图GIS大赛2020命题开发。

## 启动 SuperMap iServer 服务

启动前请确保已安装SuperMap iServer。这里的安装路径为：`D:\SuperMap`。

运行以下路径以启动 SuperMap iServer 服务：

```
D:\SuperMap\SuperMapiServer10i\bin\startup.bat
```

等待服务启动，直至出现如下提示时表示服务启动成功：

```plain
04-Jul-2020 18:37:47.182 信息 [main] org.apache.catalina.startup.Catalina.start Server startup in 85071 ms
```

### 登录 iServer 服务

```
http://localhost:8090/iserver/manager
```

浏览器中输入以上链接定位到管理界面，可进行服务的管理和发布。

### 服务发布

此Web程序需要用到的服务有：地图服务、数据服务、交通网络分析服务。基本信息与接口设置如下：

地图服务：

<img src="res/%E6%9C%8D%E5%8A%A1%E5%8F%91%E5%B8%83_01.png" alt="服务发布_01" style="zoom: 67%;" />

数据服务：

<img src="res/%E6%9C%8D%E5%8A%A1%E5%8F%91%E5%B8%83_02.png" alt="服务发布_02" style="zoom:67%;" />

交通网络分析服务：

<img src="res/%E6%9C%8D%E5%8A%A1%E5%8F%91%E5%B8%83_03.png" alt="服务发布_03" style="zoom:67%;" />

## 运行Web程序

程序存放的根目录为`FrameBS-2D`，使用浏览器打开`index.html`文件即可运行程序，如下。

![运行程序](res/%E8%BF%90%E8%A1%8C%E7%A8%8B%E5%BA%8F.png)

实现功能：参考`题目要求.md`。

## 关闭SuperMap iServer服务

```
D:\SuperMap\SuperMapiServer10i\bin\shutdown.bat
```

