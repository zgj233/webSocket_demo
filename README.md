### 关于webSocket在node中的实现
 这个Demo 要正常运行，你需要一个Mysql数据库创建一张user表 包含uid,name，pwd，token 等等字段
 一个Redis本地服务器

没有的话，请自行下载。

Redis 和 数据库 的配置我写在Conf 文件夹里面了

#### 实现流程

前端访问index.html登录页面，输入帐号和密码之后，会去k8s_ecs这个数据库里面访问user表，通过name 与 pwd 判断用户是否具有登录权限。
如果有，将name 从 k8s_ecs 里面取出来，传给前端，前端使用Cookie保存。页面跳转到 chat.html。

chat.html 会在页面创建时与服务器建立一个webSocket连接，这时会生成一个 Socket_ID （凭证）。我们将SocketID保存至 Redis ，方便以后使用。
比如你想重启webSocket 或 实现 webSocket 推送消息给某个特定用户，都离不开Socket_ID.

![flow chat](https://github.com/zgj233/webSocket_demo/blob/master/public/flow/webSocket%E5%AE%9E%E7%8E%B0%E6%B5%81%E7%A8%8B.png)