# auto-exercises

> 仅供技术交流学习，开发者不承担任何责任。
>
> 脚本不保证使用效果，使用后请自行登录官方平台查看结果。

重庆邮电大学软件工程编程基础自动刷题脚本

## how to use it?

把你从各种渠道收集来的答案放到`data.txt`中,像这样:

~~~
Ch002_001
DABBDADDBB
Ch002_002
DCDDDCBBCB
Ch002_003
ABDDAA
Ch002_004
BCCCCABBAB
Ch002_005
ABCABABACB
...
~~~

然后在`config.js`填写你的cookie和开始和结束的章节(cookie的获取在后面讲解):

~~~js
export const cookie = "ASP.NET_SessionId=3rwmnn45ch2sce45wwlrgo45"
~~~

然后执行

> npm install

> npm run start

即可愉快的刷题了~