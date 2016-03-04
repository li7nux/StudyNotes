### 安装 Git

1. 安装
```
vagrant@vagrant-ubuntu-trusty-64:/etc/apt$ sudo apt-get install git
```
2. 查看
```
vagrant@vagrant-ubuntu-trusty-64:/etc/apt$ git --version
git version 1.9.1
```
3. 配置 git

最简单的方式，通过 git config 命令

```
- git config --global user.name "Your Name"
- git config --global user.email "youremail@domain.com"
```

如 :
```
vagrant@vagrant-ubuntu-trusty-64:/etc/apt$ git config --list
vagrant@vagrant-ubuntu-trusty-64:/etc/apt$ git config --global user.name "li7nux"
vagrant@vagrant-ubuntu-trusty-64:/etc/apt$ git config --global user.email "li7nux@gmail.com"
vagrant@vagrant-ubuntu-trusty-64:/etc/apt$ git config --list
user.name=li7nux
user.email=li7nux@gmail.com
```

由上可见，配置信息存储在文件里，所以也可以直接通过修改配置文件的形式添加用户信息。

```
vagrant@vagrant-ubuntu-trusty-64:/etc/apt$ git config --list
[user]
        name = li7nux
        email = li7nux@gmail.com
```
