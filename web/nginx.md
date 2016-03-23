---
title: Nginx 入门
tags: CentOS,Nginx
grammar_cjkRuby: true
---

## 下载和安装Nginx之准备先决条件

我们下载源代码包并且手动编译，而不是使用包管理工具，例如Yum，Aptitude等来安装。这么做有两个原因。首先，在Linux发布版本中，该包可能无效，实际上，很少有提供下载和自动安装的仓库，即使有，大部分包含的也是过期的版本。其次，更重要的是，有一个不得不提的事实，我们需要在编译时对多种重要的选项进行配置，也正是基于这种情况，才有了不得不手动编译安装的需求，因此也就致使你需要在系统上安装些工具和库文件，在Nginx编译时根据需要进行处理。在这里，我们将指导你安装最常见的工具和库，例如**GCC**，**PCRE**，**zlib**和**OpenSSL**。

### GCC-GNU编译器集合

Nginx是一个由C语言编写的程序，因此首先需要在系统上安装一个编译工具，例如GNU的GCC，GCC通常由大多数Linux的发行版本安装，但如果因为某种原因没有安装，那么这一步必须进行。

首先确定系统上是否已经安装GCC：

```
$ gcc
```

如果有下面的输出，则表明GCC已经正确安装在系统上：

```
gcc : no input files
```

```
[root@iZ25rooet9rZ ~]# gcc
gcc: fatal error: no input files
compilation terminated.
```

如果收到下面的消息，则必须安装和编译GCC：

```
-bash : gcc : command not found
```

GCC可以使用默认包管理器的仓库（repositories）来安装，包管理器的选择依赖于你使用的Linux发布版本，包管理器有不同的实现：yum是基于Red Hat的发布版本；apt用于Debian和Ubuntu；yast用于SuSE Linux等等。

RedHat中安装GCC：

```
# yum install gcc
```

Ubuntu中安装GCC：
```
# apt-get install gcc
```
### PCRE库

Nginx编译需要PCRE（Perl Compatible Regular Expression），因为Nginx的Rewrite模块和HTTP核心模块会使用到PCRE正则表达式语法。这里需要安装两个安装包pcre和pcre-devel。第一个安装包提供编译版本的库，而第二个提供开发阶段的头文件和编译项目的源代码，这正是我们需要的理由。

RedHat中安装：

```
# yum install pcre pcre-devel
```

或者安装与PCRE相关的所有安装包：

```
# yum install pcre*
```

Ubuntu中安装：

```
# apt-get install libpcre3 libpcre3-dev
```
### zlib库

zlib库提供了开发人员的压缩算法，在Nginx的各种模块中需要使用gzip压缩。如同安装PCRE一样，同样需要安装库和它的源代码：zlib和zlib-devel。

RedHat中安装：
```
# yum install zlib zlib-devel
```

Ubuntu中安装：

```
# apt-get install zlib1g zlib1g-dev
```
### OpenSSL

在Nginx中，如果服务器提供安全网页时则会用到OpenSSL库，我们需要安装库文件和它的开发安装包（openssl和openssl-devel）。

```
# yum install openssl openssl-devel
```
Ubuntu中安装（注：Ubuntu14.04的仓库中没有发现openssl-dev）：

```
# apt-get install openssl openssl-dev
```

## 下载和安装Nginx之下载Nginx

Nginx官网：http://nginx.org/

我们从这里下载最新的，稳定的源代码安装包。当前最新的stable版本为1.8：nginx-1.8.0.tar.gz。

下载并解压
```
$ mkdir nginx && cd nginx
$ wget http://nginx.org/download/nginx-1.8.0.tar.gz
$ tar zxf nginx-1.8.0.tar.gz
```
在用户home目录创建文件夹来存储下载并解压的Nginx文件。


## 下载和安装Nginx之配置选项

你已经成功下载并解压了Nginx安装包。现在，为了适应操作系统，为了获得二进制的运行，要对Nginx进行编译配置处理。创建一个应用程序通常分为三步：从源代码到配置，编译和安装编译。配置步骤允许你选择许多选项，这些选项在完成程序的建立安装后不可编辑，因此它直接影响该项目的二进制文件。所以，这一步非常重要，如果想在后来避免意外，必须仔细。

该过程是添加某些开关选项（switch）到配置（configure）脚本，该脚本本来就在源代码安装包中，在下面的内容中我们将了解到，可以激活的开关选项有三种类型，但我们首先研究最容易的。


### 容易的方法

如果是因为某种原因，你不想打扰配置步骤，例如只是测试或者是简单的安装，因为将来还会重新编译安装该程序，所以你只是简单地使用configure脚本，而并没有使用任何开关选择。执行下列三个命令就可以建立和安装工作版（能够进行web服务）的Nginx：

```
# ./configure
```

运行了该命令之后，就开始了一个长时间的程序验证过程，以便确定系统包含所有必要的组成成分。如果配置过程失败，请再次检测先决条件，现在看来，它是引发错误的最常见原因。

```
# make
```

命令make对应用程序进行编译，如果配置部分运行良好，那么这一部分不会出现任何错误。

```
# make install
```

这是最后一步，复制编译后的文件（也包括资源文件）到安装目录，默认情况下是目录：“**/usr/local/nginx**”，这一步可能需要以root的身份登录系统，然后来执行安装的操作。为此，如果你没有经过自定义配置就创建了该应用程序，那么你的这个冒险便会错过很多功能，例如可选择的模块和我们即将认识的其他模块。

### 路径选择

在运行configure脚本命令的时候，可能开启一些开关选项，例如，需要对Nginx各种组成成分指定目录或文件路径。可以运行命令：

```
# ./configure --help
```

列出有效的开关变量，以便于安装选择。典型的做法是使用开关命令在命令行添加一些文本，例如，使用开关选项 --conf-path:

```
# ./configure --conf-path=/etc/nginx/nginx.conf
```

下表中，全部列出配置时的开关选项：

<table>
    <tbody>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192); font-size: 12px;"><strong>选项      <br></strong></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192); font-size: 12px;"><strong>用法                             <br></strong></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192); font-size: 12px;"><strong>默认值<br></strong></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--prefix=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定安装Nginx的基础目录<br></span></td>
            <td style="word-break: break-all;">
                <p><span style="color: rgb(255, 0, 0);">/usr/local/nginx, 注意：如果你在配置时使用了相对路径，则连接到基础目录。示例：</span></p>
                <p><span style="color: rgb(255, 0, 0);">指定--conf-path=conf/nginx.conf 则配置文件会在目录：/usr/local/nginx/conf/nginx.conf<br></span></p>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--sbin-path=...
                <br>
            </td>
            <td style="word-break: break-all;">Nginx二进制文件安装的路径
                <br>
            </td>
            <td style="word-break: break-all;"><prefix>/sbin/nginx
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--conf-path=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">主要配置文件放置目录<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);"><prefix>/conf/nginx.conf<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--error-log-path=...
                <br>
            </td>
            <td style="word-break: break-all;">错误日志存放的路径。错误日志在配置文件中须配置得非常正确，该路径只应用于你在配置文件中没有指定任何错误的日志指令时
                <br>
            </td>
            <td style="word-break: break-all;"><prefix>/logs/error.log
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--pid-path=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定Nginx的pid文件的路径。可以在配置文件中指定pid文件的路径，如果没有具体的指定，则使用在这里对该选项指定的该路径<br></span></td>
            <td style="word-break: break-all;">
                <p><span style="color: rgb(255, 0, 0);"><prefix>/logs/nginx.pid</span></p>
                <p><span style="color: rgb(255, 0, 0);">注意：该pid文件是一个简单的文件文件，它包含进程的标识符。该文件应该放置在一个清晰可见的位置，以便其他应用程序能够很容易找到运行该程序的pid<br></span></p>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--lock-path=...
                <br>
            </td>
            <td style="word-break: break-all;">锁文件（lock file）的存放路径。同样，该文件也可以在配置文件中指定，但是，如果在配置文件中没有指定，则使用该值
                <br>
            </td>
            <td style="word-break: break-all;">
                <p><prefix>/logs/nginx.lock</p>
                <p>注意：锁文件允许其他应用程序确定是否一个程序在运行，就Nginx来说，它用于确定该进程没有被启动两次
                    <br>
                </p>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-perl_modules_path=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">定义Perl模块的路径。如果需要包含另外的Perl模块，必须定义该参数<br></span></td>
            <td>
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-perl=...
                <br>
            </td>
            <td style="word-break: break-all;">Perl二进制文件的路径。用于执行Perl脚本。如果想执行一个Perl脚本，必须设置该路径
                <br>
            </td>
            <td>
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--http-log-path=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">定义被访问文件的日志文件存放路径。该路径只用于在配置文件中没有定义访问日志的情况<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);"><prefix>/logs/access.log<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--http-client-body-temp-path=...
                <br>
            </td>
            <td style="word-break: break-all;">该目录用于存储客户端请求产生的临时文件
                <br>
            </td>
            <td style="word-break: break-all;"><prefix>/client_body_temp
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--http-proxy-temp-path=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">该目录用于代理存储临时文件<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);"><prefix>/proxy_temp<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--http-fastcgi-temp-path=...
                <br>
            </td>
            <td style="word-break: break-all;">指定用于HTTP FastCGI模块使用的临时文件的存放路径
                <br>
            </td>
            <td style="word-break: break-all;"><prefix>/fastcgi_temp
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--builddir=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定创建应用程序的位置<br></span></td>
            <td>
                <br>
            </td>
        </tr>
    </tbody>
</table>


### 先决条件选项

先决条件的格式有库文件和二进制文件。到现在，你应该已经把它们安装在系统中了，然而即使它们已经安装在系统中，可能有时候配置脚本还是不能找到它们的位置。原因有多种，例如，如果它们安装在非标准路径中。为了修复这些问题，可以使用下表所列的开关项来指出它们所在的路径。

<table>
    <tbody>
        <tr>
            <td style="word-break: break-all;"><strong><span style="color: rgb(0, 112, 192);">编译选项</span></strong>
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-cc=...                           <br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定一个备用的C编译器的位置<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-cpp=...
                <br>
            </td>
            <td style="word-break: break-all;">指定一个备用的C预处理器的位置
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-cc-opt=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">定义额外的选项，然后在命令行传递给C编译器<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-ld-opt=...
                <br>
            </td>
            <td style="word-break: break-all;">定义额外的选项，然后在命令行传递给C连接器
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-cpu-opt=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定不同的目标处理器结构，可以是下列值：pentium，pentiumpro，pentium3，pentium4，athlon，opteron，sparc32，sparc64和ppc64<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><strong><span style="color: rgb(0, 112, 192);">PCRE选项</span></strong>
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--without-pcre<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">不使用PCRE库。这个设置不推荐使用，因为它会移除对正则表达式的支持，从而使Rewrite模块失去作用。<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-pcre
                <br>
            </td>
            <td style="word-break: break-all;">强制作用PCRE库
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-pcre=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">允许指定PCRE库的源代码<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-pcre-opt=...
                <br>
            </td>
            <td style="word-break: break-all;">用于建立PCRE库的另外的选项
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>MD5选项</strong></span>
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-md5=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定MD5库源代码的路径<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-md5-opt=...
                <br>
            </td>
            <td style="word-break: break-all;">用于建立MD5库的另外选项
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-md5-asm<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">为建MD5库使用汇编语言源代码<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>SHA1选项</strong></span>
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-sha1=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定SHA1库的源代码<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-sha1-opt=...
                <br>
            </td>
            <td style="word-break: break-all;">用于建立SHA1库的另外选项
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-sha1-asm<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">为建立SHA1库使用汇编语言源代码<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>zlib选项</strong></span>
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-zlib=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定zlib库的源代码<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-zlib-opt=...
                <br>
            </td>
            <td style="word-break: break-all;">用于建立zlib库的另外的选项
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-zlib-asm=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">使用汇编语言最大限度地优化下列目标结构：Pentium, pentiumpro<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>OpenSSL选项</strong></span>
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">--with-openssl=...<br></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(255, 0, 0);">指定OpenSSL库的源代码路径<br></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-openssl-opt=...
                <br>
            </td>
            <td style="word-break: break-all;">为建立OpenSSL库的另外的选项
                <br>
            </td>
        </tr>
    </tbody>
</table>

### 模块选择

在编译Nginx之前需要对模块进行选择，一些模块默认是开启的，有些模块需要手动开启。

<table>
    <tbody>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>默认开启的模块                                     <br></strong></span></td>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>描述<br></strong></span></td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http-charset_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Charset模块，该模块用于对网页重新编码
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http-gzip_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Gzip压缩模块
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_ssi_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用服务器端包含模块
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_access_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用访问模块，对于指定的IP段，允许访问配置
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_userid_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用用户ID模块。该模块为用户通过cookie验证身份
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_auth_basic_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用基本的认证模块
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_autoindex_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用自动索引模块
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_geo_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Geo模块，该模块允许你定义依赖于IP地址段的变量
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_map_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Map模块，该模块允许你声明map区段
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_referer_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Referer控制模块
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_rewrite_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Rewrite模块
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_proxy_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用代理模块。该模块用于向其他服务器传输请求
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_fastcgi_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用FastCGI模块。该模块是用于与FastCGI进程配合工作
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_memcached_module               
                <br>
            </td>
            <td style="word-break: break-all;">禁用Memcached模块。该模块是用于与memcached守护进程配合工作
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_limit_zone_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Limit Zone模块。该模块是用于根据定义的zone来限制约束对资源的使用。
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_limit_req_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Limit Requests模块。该模块允许你限制每个用户请求的总数
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_empty_gif_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Empty Gif模块。该模块用于在内存中提供一个空白的GIF图像
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_browser_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Browser模块。该模块用于解释用户代理字符串
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http_upstream_ip_hash_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用Upstream模块。该模块用于配置负载均衡结构
                <br>
            </td>
        </tr>
    </tbody>
</table>

<table>
 <tbody>
  <tr>
   <td style="word-break: break-all;"><strong><span style="color: rgb(0, 112, 192);">默认禁用的模块                                                                                            <br></span></strong></td>
   <td style="word-break: break-all;"><strong><span style="color: rgb(0, 112, 192);">描述 <br></span></strong></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_ssl_module<br></td>
   <td style="word-break: break-all;">开启SSL模块，支持使用HTTPS协议的网页<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_realip_module<br></td>
   <td style="word-break: break-all;">开启Real IP的支持，该模块用于从客户请求的头数据中读取real IP地址<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_addition_module<br></td>
   <td style="word-break: break-all;">开启Addition模块，该模块允许你追加或前置数据（prepend data）到响应的主体部分<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_xslt_module<br></td>
   <td style="word-break: break-all;">开启XSLT模块的支持，该模块实现XSLT转化为XML文档<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_image_filter_module<br></td>
   <td style="word-break: break-all;">开启Image Filter模块，该模块是让你修改图像。注意：如果想编译该模块，需要在系统中安装libgd库<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_geoip_module<br></td>
   <td style="word-break: break-all;">开启GeoIP模块，该模块通过使用MaxMind's GeoI 二进制数据库来获取客户端在地理上的分布。注意：如果希望编译该模块，需要在系统中安装libgeoip库。<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_sub_module<br></td>
   <td style="word-break: break-all;">开启Substitution模块，该模块用于在网页中替换文本<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_dav_module<br></td>
   <td style="word-break: break-all;">开启WebDAV模块<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_flv_module<br></td>
   <td style="word-break: break-all;">开启FLV模块，该模块用于专门处理.flv(flash视频)文件<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_gzip_static_module <br></td>
   <td style="word-break: break-all;">开启Gzip静态模块，该模块用于发送预压缩的文件</td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_random_index_module <br></td>
   <td style="word-break: break-all;">开启Random Index模块。该模块用于挑选一个随机的文件作为该目录的index<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_secure_link_module<br></td>
   <td style="word-break: break-all;">开启Secure Link模块，该模块用于在URL中检测关键字的存在<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-http_stub_status_module<br></td>
   <td style="word-break: break-all;">开启Stub Status模块，该模块会产生一个服务器状态和信息页<br></td>
  </tr>
  <tr>
   <td style="word-break: break-all;">--with-google_perftools_module                  <br></td>
   <td style="word-break: break-all;">开启google性能工具模块<br></td>
  </tr>
 </tbody>
</table>

### 杂项

<table>
    <tbody>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>邮件服务代理</strong></span>                                                            
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-mail
                <br>
            </td>
            <td style="word-break: break-all;">开启邮件服务代理（mail server proxy）模块，支持POP3，IMAP4和SMTP。该功能默认禁用
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-mail_ssl_module
                <br>
            </td>
            <td style="word-break: break-all;">开启邮件代理服务对SSL的支持。该功能默认禁用
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-mail_pop3_module
                <br>
            </td>
            <td style="word-break: break-all;">在邮件代理下禁用POP3功能。在开启邮件代理模块后该功能默认启用
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-mail_imap_module
                <br>
            </td>
            <td style="word-break: break-all;">对邮件代理服务器禁用IMAP4模块，在开启邮件代理模块后该功能默认启用
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-mail_smtp_module
                <br>
            </td>
            <td style="word-break: break-all;">对于邮件代理服务器禁用SMTP模块，在开启邮件代理模块后该功能默认启用
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>事件管理</strong></span>
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-rtsig_module
                <br>
            </td>
            <td style="word-break: break-all;">开启rtsig模块，使用rtsig作为事件通知机制
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-select_module
                <br>
            </td>
            <td style="word-break: break-all;">开启select模块，使用select作为事件通知机制。默认情况下，该模块是开启的，除非系统有一种更好的方式发现——kqueue, epoll, rtsig 或 poll
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-select_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用select模块
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-poll_module
                <br>
            </td>
            <td style="word-break: break-all;">开启poll模块，该模块使用poll作为事件通知机制。默认情况下，如果有效，该模块是开启的，除非系统上有一种更好的方式发现——kqueue, epoll或rtsig
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-poll_module
                <br>
            </td>
            <td style="word-break: break-all;">禁用poll模块
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>用户和组选项</strong></span>
                <br>
            </td>
            <td style="word-break: break-all;">
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--user=...
                <br>
            </td>
            <td style="word-break: break-all;">指定启动Nginx进程的默认用户。这个设置仅用于在配置文件中省略user指令来指定用户的情况
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--group=...
                <br>
            </td>
            <td style="word-break: break-all;">指定启动Nginx进程默认的用户组。这个设置仅用于在配置文件中省略使用group指令来指定用户的情况
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;"><span style="color: rgb(0, 112, 192);"><strong>其它选项</strong></span>
                <br>
            </td>
            <td>
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-ipv6
                <br>
            </td>
            <td style="word-break: break-all;">开启对IPv6的支持
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http
                <br>
            </td>
            <td style="word-break: break-all;">禁用HTTP服务
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--without-http-cache
                <br>
            </td>
            <td style="word-break: break-all;">禁用HTTP缓冲功能
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--add-module=PATH
                <br>
            </td>
            <td style="word-break: break-all;">通过指定的路径编译添加第三方模块。如果希望编译多个模块，那么该选项可以无限次使用
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">--with-debug
                <br>
            </td>
            <td style="word-break: break-all;">开启记录额外的调试信息
                <br>
            </td>
        </tr>
    </tbody>
</table>

** 关于prefix开关选项 **

在配置期间，应该特别注意--prefix开关选项，将来许多配置指令都基于你在这时选择的路径。记住，一旦二进制文件编译完成。prefix就不能再变，然而这并不是一个决定性的问题，因为仍然可以使用绝对路径。

如果你打算与时俱进，想要升级Nginx，以便使用一个新的发布版，默认的prefix（如果没有通过使用--prefix开关选项去覆盖）是/usr/local/nginx——一个不包含版本号的路径，因此，升级Nginx的时候，如果没有指定不同的prefix，新安装的文件就会覆盖先前安装的文件，这种做法可能存在其他问题，因为这有可能会清除你的配置文件和正在运行的二进制文件。因此，推荐使用不同的prefix，利用prefix指明每一个版本号，例如：

```
# ./configure --prefix=/usr/local/nginx-1.8.0
```

另外，为了使将来简单一些，可以为/usr/local/nginx建立一个符号链接来指向/usr/local/nginx-1.8.0，一旦升级，该链接便会指向新的/usr/local/nginx-newer.version。

```
[root@localhost local]# ln -s nginx-1.9.12 nginx
```

## 下载和安装Nginx之普通的HTTP和HTTPS服务器

第一个例子描述的是这样一种情况，为HTTP服务开启HTTPS服务，并包含最重要的功能和模块，而与邮件相关的选项都被禁用：

`# ./configure --user=www-data --group=www-data    `
`--with-http_ssl_module     `
`--with-http_realip_module`

可以看出，命令行相当简单，大多数开关选项都被省略。原因是：默认的配置是相当高效的，并且大多数模块已被启用。你只需要为HTTPS协议包含http_ssl模块即可。考虑Nginx服务器可能被用作后端运行，所以顺便又添加了“real IP”模块，该模块用于检索访问者的IP地址。

### 开启所有模块

以下这一种情况：整个安装包，开启所有的模块支持，由自己来决定是否在运行时使用它们：

`# ./configure --user=www-data --group=www-data    `
`--with-http_ssl_module    `
`--with-http_realip_module    `
`--with-http_addition_module    `
`--with-http_xslt_module    `
`--with-http_image_filter_module    `
`--with-http_geoip_module    `
`--with-http_sub_module    `
`--with-http_dav_module    `
`--with-http_flv_module    `
`--with-http_gzip_static_module    `
`--with-http_random_index_module    `
`--with-http_secure_link_module    `
`--with-http_stub_status_module`

这种配置开启了最广泛的配置选择，在这种安装下，所有可选模块都被开启，因此需要安装额外的库，以在**RedHat**上为例，例如**GeoIP.x86_64**，**GeoIP-devel.x86_64**（用于Geo IP模块），**gd-devel.x86_64**（用于Image Filter模块），**xml2.x86_64**（用于XSLT模块）。

注意：在前面列出的命令中，www-data用于运行Nginx进程的用户和组（user和group），所以工作进程将以此组合来运行。因此，系统上必须有这样的用户和用户组。

### 建立配置的问题

在某些情况下，configure命令可能会失败——在一个很长的检查列表后，你可能会在终端上收到一些错误的信息，很多情况下（但不是全部），这些错误与丢失先决条件或没有指定路径相关。

在这种情况下，需要继续下面的工作。即仔细校验，以确保有所有需要编译的应用程序，并且要随时翻阅objs/autoconf.err文件，该文件详细记录了编译出错的相关问题，它是在configure进程进行期间产生的，它会详细告诉你进程在哪里出了问题。

### 请确保先决条件

基本的四个先决条件是：GCC，PCRE，zlib和OpenSSL。最后是三个库，针对每个库，必须安装两个安装包：一个是库自身，另一个是开发源代码。确定你已经安装两者。注意其它先决条件，例如其他的扩展模块可能需要LibXML2或LibXSLT，例如HTTP XSLT模块。

### 目录的存在和可写性

一定记得检查明显的错误，每一个人迟早都会犯一些最初级的错误。确定一下对于存放Nginx文件的目录，运行配置和编译脚本的用户是否有读和写的权限，也要确定一下在配置脚本各个开关项中指定的路径是否存在，是否有效。

这是问题都解决后的检查结果。

### 编译和安装

配置过程相当重要——它会产生一个makefile，依赖于应用程序所选择的开关项，会根据需求在系统上执行一个较长时间的检查。一旦configure脚本成功执行，你就可以继续编译安装Nginx：

`# make && make install`

## 下载和安装Nginx之控制Nginx服务

眼下，你应该成功安装并建立了Nginx，默认的位置为/usr/local/nginx，因此我们将来的例子都将基于这个目录。

### 守护进程和服务

下一步，显然是执行Nginx。计算机应用程序有两个类型——有的需要用户在前端输入命令后立即运行；有的则不然，运行于后台。**Nginx属于后者**，即经常提及的作为守护进程运行的那种程序。守护进程的名称后通常带有“**d**”字样。这里有几个例子——httpd是HTTP服务器的守护进程；named是域名服务器的守护进程；然而，需要注意，Nginx不是这种情况。从命令行启动Nginx的时候，守护进程会立即返回到命令行提示符，在大多数情况下，用不着向终端屏幕输出数据。因此，启动Nginx的时候，屏幕上不会出现任何文本信息，并且提示符会立即返回。

### 用户和组

一个最普通的麻烦来源是，对Nginx设置的是一个无效的访问权限的时候——由于用户或用户组的错误配置，经常会报告“403 Forbidden”错误，因为Nginx不能访问你需要的文件。根据进程的功能，可能需要两个不同级别的进程权限：

1.  Nginx的master进程，由root启动，在大多数类Unix系统上，由root帐户开启的进程允许在开放任何端口的的TCP套接字，但是其他用户启动的程序只能监听在1024以上的端口。如果不是以root帐户启动Nginx，将无法得到标准的端口（如80或443），即无法启动。而且，通过user指令在配置文件中指定的用户和组用于工作进程，在这里不考虑。

2.  Nginx的工作进程，由配置文件中user指令指定的帐户开始运行，配置文件中的设置优先于在配置时使用configure脚本开关选项指定的用户。如果没有做任何指定，工作进程将以用户nobody开始，用户组为nobody组。

### Nginx命令行开关项

Nginx二进制文件接收命令行参数，用于执行各种操作，控制后台进程。为了获取该命令的全部参数列表，可以请求help帮助：

`# cd /usr/local/nginx/sbin`
`# ./nginx -h`


下面将描述这些开关项的作用，一些用于控制守护进程，一些用于在应用配置上执行各种操作。

### 启动和停止守护进程

可以通过不带任何参数的Nginx二进制文件来启动Nginx。如果该守护进程已经运行，就会有一条消息指出已经有一个套接字在指定端口监听：

`# ./nginx`

如果有守护进程已经在运行，结果如下：

![](http://static.oschina.net/uploads/space/2015/0901/200122_ykUO_168814.png)

除了这一点，你可以控制这个守护进程，可以停止它，重启它，或只是重新载入配置文件，控制是通过**nginx -s** 命令向进程发送信号来实现的：

<table>
    <tbody>
        <tr>
            <td style="word-break: break-all;">命令                                                             
                <br>
            </td>
            <td style="word-break: break-all;">描述
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">nginx -s stop
                <br>
            </td>
            <td style="word-break: break-all;">立即停止守护进程（使用TERM信号）
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">nginx -s quit
                <br>
            </td>
            <td style="word-break: break-all;">温和地停止守护进程（使用QUIT信号）
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">nginx -s reopen
                <br>
            </td>
            <td style="word-break: break-all;">重新打开日志文件
                <br>
            </td>
        </tr>
        <tr>
            <td style="word-break: break-all;">nginx -s reload
                <br>
            </td>
            <td style="word-break: break-all;">重新载入配置文件
                <br>
            </td>
        </tr>
    </tbody>
</table>

**注意，在开始运行这个守护进程，停止它或执行前面说的任何操作时，会首先解析和确认配置文件，如果配置文件无效，不管提交什么命令，都会失败，甚至是试图停止一个守护进程。换句话说，如果配置文件无效，兴许无法停止Nginx服务。**

有一种替代方法可以终止该进程，只适用于危急情况，即使用kill或killall命令：

`# killall nginx`

### 测试配置文件

在配置文件中，任何不起眼的错误都可能导致你丧失对服务的控制权——可能无法以正常的方式停止服务，显而易见，服务拒绝运行。

因此，在很多情况下，下列命令是很有用的，可以检测语法，合法性和配置文件的完整性：

`# /usr/local/nginx/sbin/nginx -t`

开关选项 -t 代表测试配置文件。Nginx将重新解析配置文件，让你知道配置文件是否有效。如下图：

![](http://static.oschina.net/uploads/space/2015/0902/225716_Fqfn_168814.png)

开关选项 -t 代表测试配置文件。Nginx将重新解析配置文件，让你知道配置文件是否有效。如下图：

显而易见，必须能够熟练控制配置文件。生产环境中的服务器，这样做是很危险的，要不惜任何代价避免这种情况。既然这样，一个最好的实践是将新配置放在一个单独的临时文件中，然后再对该文件进行测试。Nginx提供了一个 -c 选项，便可进行这种测试：

`# ./nginx -t -c /home/alex/test.conf`

该命令将解析配置文件 /home/alex/test.conf，确定它作为Nginx配置文件的有效性。此后，再覆盖原来配置文件，然后重新载入服务器配置文件：

`# cp   /home/alex/test.conf   /usr/local/nginx/conf/nginx.conf`
`# ./nginx -s reload`

### 其他开关选项

其他开关选项在许多情况下迟早都会用到：** -V 选项**，不但会告诉你当前Nginx的版本号，更重要的是还会提醒你在configure脚本那一步所添加的开关选项，换句话说，该开关选项将显示你在使用运行configure脚本配置的各种开关选项。

[![](http://static.oschina.net/uploads/space/2015/0902/231425_wJp9_168814.png)](http://static.oschina.net/uploads/space/2015/0902/231425_wJp9_168814.png)

## 下载和安装Nginx之添加Nginx作为系统服务（CentOS7为例）

我们以CentOS7为例。

服务有系统（system）和用户（user）之分。如果需要开机没有登录情况下就能运行的程序，存在于系统服务（system）里，即：

`/lib/systemd/system/`

反之，用户登录后才能运行的程序，存在于用户服务（user)里：

`/lib/systemd/user/`

注意：服务以.service结尾。

### 建立Nginx服务文件

`# vim /lib/systemd/system/nginx.service`

添加：

`[Unit]`
`Description=nginx.service`
`After=network.target`
`[Service]`
`Type=forking`
`ExecStart=``/usr/local/nginx/sbin/nginx`
`ExecReload=``/usr/local/nginx/sbin/nginx` `-s reload`
`ExecStop=``/usr/local/nginx/sbin/nginx` `-s stop`
`PrivateTmp=``true`
`[Install]`
`WantedBy=multi-user.target`

以754的权限保存：

`#  chmod 754 nginx.service`

### 设置开机启动

`# systemctl enable nginx.service`

```
[root@localhost system]# chmod 754 nginx.service
[root@localhost system]# systemctl enable nginx.service
Created symlink from /etc/systemd/system/multi-user.target.wants/nginx.service to /usr/lib/systemd/system/nginx.service.
```

到这里就OK了！！
