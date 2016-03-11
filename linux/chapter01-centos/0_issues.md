# 遇到的一些问题

### 1. `-bash: ifconfig: command not found`

+ 运行 `ifconfig` 命令, 提示命令不存在
+ 解决方案 : 安装 `net-tools`, 命令 ` yum install net-tools`
+ 也可以尝试 `yum provides ifconfig`命令和 `yum whatprovides ifconfig`, 此处有惊喜
