# 2020-Supermap-PD-FrameBS-2D
超图GIS大赛2020命题开发。

## 启动 SuperMap iServer 服务

```
D:\SuperMap\SuperMapiServer10i\bin\startup.bat
```

等待服务启动，直至出现如下提示时表示服务启动成功

```plain
04-Jul-2020 18:37:47.165 信息 [main] org.apache.coyote.AbstractProtocol.start 开始协议处理句柄["http-nio-8090"]
04-Jul-2020 18:37:47.182 信息 [main] org.apache.catalina.startup.Catalina.start Server startup in 85071 ms
```

### 登录 iServer 服务

```
http://localhost:8090/iserver/manager
```

浏览器中输入以上链接定位到管理界面，可进行服务的管理和发布。



## 关闭服务

```
D:\SuperMap\SuperMapiServer10i\bin\shutdown.bat
```

