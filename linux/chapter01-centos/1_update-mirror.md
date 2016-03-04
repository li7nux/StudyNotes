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
