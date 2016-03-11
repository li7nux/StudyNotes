### 更新 CentOS7 163源

#### 操作流程 :

1. 首先备份 `/etc/yum.repos.d/CentOS-Base.repo`
  ```
  mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
  ```
2. 下载对应版本repo文件, 放入/etc/yum.repos.d/(操作前请做好相应备份)

  [CentOS7](http://mirrors.163.com/.help/CentOS7-Base-163.repo)
3. 运行以下命令生成缓存
  ```
  yum clean all
  yum makecache
  ```
4. 或者使用 阿里源
```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum makecache
```  
5. 问题 : linux下yum命令出现 `Loaded plugins: fastestmirror Determining fastest mirrors`

  解决方案 :
  fastestmirror是yum的一个加速插件，这里是插件提示信息是插件不能用了。

  不能用就先别用呗，禁用掉，先yum了再说。

  **1.修改插件的配置文件**

  ```
  # vi  /etc/yum/pluginconf.d/fastestmirror.conf
  ```
  ```
  enabled = 1//由1改为0，禁用该插件
  ```

  **2.修改yum的配置文件**

  ```
  # vi /etc/yum.conf

  plugins=1//改为0，不使用插件

  ```
