# 安装MariaDB

> 本笔记记录的是`root`用户权限安装MariaDB的过程，非`root`权限用户需要使用`sudo`前缀提升权限。

*MariaDB 是流行的跨平台的数据库管理系统MySQL的一个分支，被认为是一个可以替换MySQL的完整简易的产品。*

## 开始之前

#### 1. 确保你遵循了服务器的入门和保护想到，Linode的主机名设置

```
hostname       #显示你主机名
hostname -f    #显示完全限定域名(FQDN)
```

#### 2. Update your system:

```
sudo yum update
```

## 安装和启动MariaDB

```
sudo yum install mariadb-server
```

![install-mariadb1](../../pic/linux/chapter01/4-01.png)

此处选择 `y` :

![install-mariadb2](../../pic/linux/chapter01/4-02.png)

安装完成 :

![install-mariadb3](../../pic/linux/chapter01/4-03.png)

将MariaDB设置为开机启动，然后启动服务:


```
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

如图 :

![install-mariadb4](../../pic/linux/chapter01/4-04.png)


## 强化MySQL Server

#### 1. 运行 `ysql_secure_installation`脚本，以解决在默认的MySQL安装一些安全问题。

```
sudo mysql_secure_installation
```

![install-mariadb5](../../pic/linux/chapter01/4-05.png)

> 您将有选择更改MySQL的root密码，删除匿名用户帐户，禁止本地主机之外的root用户登录，并删除测试数据库。建议你回答 `Yes `这些选项。你可以在MySQL参考手册中读到更多关于脚本。

全部选择 `y` :

![install-mariadb6](../../pic/linux/chapter01/4-06.png)

完成配置 :

![install-mariadb7](../../pic/linux/chapter01/4-07.png)

## 使用MySQL

对于与MySQL进行交互的标准工具是MySQL客户端，已经在mysql-server中安装了。MySQL的客户端是通过命令终端使用的。

## Root 登录

#### 1. 通过root用户登录MySQL

```
mysql -u root -p
```

#### 2. 按照提示，输入你之前在执行`mysql_secure_installation`脚本运行时设置的root密码。
验证通过之后你会看到MiaraDB提示，如图：

![install-mariadb8](../../pic/linux/chapter01/4-08.png)

#### 3 输入`\h`，就会生成MySQL的命令提示列表。如图 :

![install-mariadb9](../../pic/linux/chapter01/4-09.png)

## 创建一个新的MySQL用户和数据库

#### 1. 在下面的例子中，`testdb`是数据库名字，`testuser`是用户名，`password`是用户密码

```
create database testdb;
create user 'testuser'@'localhost' identified by 'password';
grant all on testdb.* to 'testuser' identified by 'password';
```

![install-mariadb10](../../pic/linux/chapter01/4-10.png)

你可以缩短 这个过程，在配置数据库权限的同时创建用户：

```
create database testdb;
grant all on testdb.* to 'testuser' identified by 'password';
```

#### 2. 退出MariaDB

```
exit
```

![install-mariadb11](../../pic/linux/chapter01/4-11.png)

## 创建一个简单的表 :

#### 1. 以 `testuser` 用户登录：

```
mysql -u testuser -p
```

![install-mariadb12](../../pic/linux/chapter01/4-12.png)

#### 2. 创建一个名为`customers`的简单表，创建客户的`ID` 类型为`INT `型整数，是自动增长的用于主键，以及用于存储客户姓和名的两个字段。

```
use testdb;
create table customers (customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, first_name TEXT, last_name TEXT);
```

![install-mariadb13](../../pic/linux/chapter01/4-13.png)


查看所有表，查看表结构，确认表已建立 :

```
show tables;
desc customers;

```

![install-mariadb14](../../pic/linux/chapter01/4-14.png)


#### 3. 退出MySQL
```
exit
```

![install-mariadb15](../../pic/linux/chapter01/4-15.png)

## 重置 MySQL root 密码

> 如果你忘记了MySQL的root密码，可将其重置。

#### 1. 停止当前的MySQL服务器，然后启用一个参数不需要输入密码重启它。

```
sudo systemctl stop mariadb
sudo mysqld_safe --skip-grant-tables &
```

#### 2. 重新使用MySQL root账户 登录MySQL服务器

![install-mariadb16](../../pic/linux/chapter01/4-16.png)

#### 3. 使用以下命令重置root的密码。使用强密码替换之前的密码 : `password`。

```
use mysql;
update user SET PASSWORD=PASSWORD("password") WHERE USER='root';
flush privileges;
```

![install-mariadb15](../../pic/linux/chapter01/4-17.png)

```
MariaDB [mysql]> update user SET PASSWORD=PASSWORD("rootpwd") WHERE USER='root';
```

![install-mariadb18](../../pic/linux/chapter01/4-18.png)

`flush privileges;`

![install-mariadb19](../../pic/linux/chapter01/4-19.png)


#### 4. 重启 MySQL

![install-mariadb20](../../pic/linux/chapter01/4-20.png)

使用新密码登录root账号，此时密码为`rootpwd` :

![install-mariadb21](../../pic/linux/chapter01/4-21.png)


## Tune NySQL

> Tune NySQL 是一个Perl脚本，可以连接到MySQL的运行实例，提供了基于工作负载的配置建议。理想情况下，MySQL实例在运行tuner之前，至少应该已经运作了24小时以上。该实例已经运行了很长的时间，Tuner会给MySQL提供更多的调整建议。

#### 1. 下载MySQL Tuner 到你的主目录下：

```
wget https://raw.githubusercontent.com/major/MySQLTuner-perl/master/mysqltuner.pl
```

![install-mariadb21](../../pic/linux/chapter01/4-22.png)

#### 2. 运行

```
perl ./mysqltuner.pl
```

你会被要求提供NySQL的root用户名和密码

![install-mariadb23](../../pic/linux/chapter01/4-23.png)

将会显示两个有用的输出：一般建议和变量进行调整。

![install-mariadb24](../../pic/linux/chapter01/4-24.png)


MySQL的调节器基于一个很好的出发点，以优化MySQL服务器，但要谨慎的配置量身定做的程序，在你的linode利用MySQL中执行额外的研究。


## 卸载

#### 1. 查看安装版本

```
yum list installed mariadb*
```

![install-mariadb25](../../pic/linux/chapter01/4-25.png)

或者

```
 rpm -qa | grep mariadb
```

![install-mariadb26](../../pic/linux/chapter01/4-26.png)

```
yum remove mysql-server mysql-libs mysql-devel mysql*
```

![install-mariadb27](../../pic/linux/chapter01/4-27.png)


## 附 :

远程连接:

首先查看root用户设置的链接地址：

![install-mariadb28](../../pic/linux/chapter01/4-28.png)

由图可见，都是本地的账户。所以，配置下 MariaDB 允许 root 账号在任意账号登录:

```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;
```

![install-mariadb29](../../pic/linux/chapter01/4-29.png)


## 更多信息

你不妨参考以下资源有关此主题的其他信息，不一定是最新版，是当前最新版。

[MySQL 5.7 Reference Manual](http://dev.mysql.com/doc/refman/5.7/en/)

[MySQL Tuner Tutorial](http://www.debiantutorials.com/tuning-mysql-with-mysqltuner-to-increase-efficiency-and-performance/)

---ENF
