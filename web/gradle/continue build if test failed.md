# 当test有失败的时候，如何继续gradle build ？

在默认情况下，使用 `gradle build`命令构建工程的时候，如果存在单元测试失败的情况，构建过程将停止。但是在特殊情况下，如何忽略那些失败的单元测试，让项目构建继续进行呢？

## 1. 忽略失败的单元测试

在 `build.gradle` 文件中设置 `ignoreFailures` :

```
test {
	ignoreFailures = true
}
```

通过这样配置以后，`gradle build`命令执行时遇到单元测试失败的情况仍然会执行。

## 2. 排除失败的单元测试

在执行完 `gradle build` 命令以后，会提示哪些单元测试是失败的。可以在 `gradle.build` 文件中排除这些单元测试。

### 2.1 排除某个包下的单元测试

使用正则表达式排除某个包下面的所有单元测试，如 `cc.openscanner.test` :

**build.gradle**

```
test {
  exclude 'cc/openscanner/test/**'
}
```
> 注意使用 `/` 而不是 `.`

### 2.2 排除包含某些字段的类

如果你需要排除类名中包含 `Controller` 关键字的类，那么你需要在 `build.gradle` 中配置类名正则表达式`*Controller*`:

```
test {
    exclude '**/*Controller*'
}
```

> 注意严格区分大小写

### 2.3 排除某个单元测试

如果你需要排除某一个指定的单元测试，那么你需要在 `build.gradle` 中配置，如排除`cc.openscanner.test`包下的`TestController`,你有两种方式可以选择 :

```
test {
    exclude '**/TestController.class'
}
```

或者

```
test {
    exclude 'cc/openscanner/test/TestController.class'
}
```
