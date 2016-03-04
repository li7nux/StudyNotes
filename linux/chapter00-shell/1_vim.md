# vim

## 零、 起步

一般linux系统都自带vim，如果没有，就前往官网下载安装。`http://www.vim.org/`

## 一、 简单入门

熟悉一下命令就可以使用 `vim` 进行文本操作了 :

1. `vim` 中有两种模式，`insert模式` 和 `normal模式`， 按 `i` 进入 `insert模式`， 按 `esc` 进入 `normal`;
2. `normal模式` 下 按`x` : 删除当前光标所在的一个字符;
3. `normal模式` 下 按`dd` : 删除当前行，并把删除的行存到剪贴板里
4. `normal模式` 下 键入 `:wq` : 存盘 + 退出 (`:w` 存盘, `:q` 退出, `:w` 后可以跟文件名另存为）
5. `normal模式` 下 键入 `p` : 粘贴剪切板
6. `normal模式` 下 键入 `hjkl` : 分别代表鼠标向 左、下、上、右 移动
7. `normal模式` 下 键入 `:help <command>` : 查询该 `command` 的帮助文档, `:q` 退出帮助  
