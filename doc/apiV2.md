## 抢鞋 API 接口设计

## 概述

-   使用 HTTPS 协议

## api 域名及服务器地址: DOMAIN

-   生产：https://qapi.little-box.com.cn/api/

#### 返回

    {
        "code": 0,
        "message": "OK",
        "data": {

        }
    }

以下所有返回内容都是 data 对象

## Email 模块

### 1. 创建邮箱

    path：`${DOMAIN}create_email`

#### 请求类型

POST

#### 参数

| 参数     | 类型   | 说明     |
| :------- | :----- | :------- |
| email    | string | 邮箱地址 |
| nickname | string | 昵称     |

#### 请求示例

body 内容

```JSON
{
    "email": "asdasd",
    "nickname": "test"
}
```

#### 返回

    true or false

### 2. 删除邮箱

    path：`${DOMAIN}delete_email`

#### 请求类型

POST

#### 参数

| 参数  | 类型   | 说明     |
| :---- | :----- | :------- |
| email | string | 邮箱地址 |

#### 请求示例

body 内容

```JSON
{
    "email": "asdasd"
}
```

#### 返回

    true or false

### 3. 获取所有临时邮箱（未固化）

    path：`${DOMAIN}get_emails`

#### 请求类型

GET

#### 返回

```JSON
[
    {
        "email": "asdasd@little-box.com.cn", // 邮箱地址
        "password": "FXXqamXMJj48RjBb", // 邮箱密码
        "domain": "https://exmail.qq.com/" // 如需登录邮箱，请至该地址
    }
]
```

### 4. 根据邮箱地址获取该邮箱内所有邮件的列表

    path：`${DOMAIN}get_specified_email_mail_list`

#### 请求类型

POST

#### 参数

| 参数       | 类型   | 说明                                       |
| :--------- | :----- | :----------------------------------------- |
| email      | string | 邮箱地址                                   |
| begin_date | string | 开始时间，格式 YYYY-MM-DD，例如 2019-08-01 |
| end_date   | string | 截止时间，格式 YYYY-MM-DD，例如 2019-08-26 |

#### 请求示例

body 内容

```JSON
{
    "email": "qqq@little-box.com.cn",
    "begin_date": "2019-08-01",
    "end_date": "2019-08-26"
}
```

#### 返回

```JSON
[
    {
        "sender": "zx603852402@gmail.com", // 发件人
        "subject": "testa", // 主题
        "time": "2019-08-26 21:49:30" // 收件时间
    }
]
```

### 5. 固化邮箱地址

    path：`${DOMAIN}solidify_email`

#### 请求类型

POST

#### 参数

| 参数     | 类型   | 说明     |
| :------- | :----- | :------- |
| email    | string | 邮箱地址 |
| password | string | 密码     |

#### 请求示例

body 内容

```JSON
{
    "email": "qqq@little-box.com.cn",
    "password": "FXXqamXMJj48RjBb"
}
```

#### 返回

```JSON
[
    {
        "sender": "zx603852402@gmail.com", // 发件人
        "subject": "testa", // 主题
        "time": "2019-08-26 21:49:30" // 收件时间
    }
]
```

### 6. 删除固化邮箱地址

    path：`${DOMAIN}remove_solidify_email`

#### 请求类型

POST

#### 参数

| 参数     | 类型   | 说明     |
| :------- | :----- | :------- |
| email    | string | 邮箱地址 |
| password | string | 密码     |

#### 请求示例

body 内容

```JSON
{
    "email": "qqq@little-box.com.cn",
    "password": "FXXqamXMJj48RjBb"
}
```

#### 返回

    true or false

### 7. 获取所有固化邮箱

    path：`${DOMAIN}get_solidify_emails`

#### 请求类型

GET

#### 返回

```JSON
[
    {
        "email": "asdasd@little-box.com.cn", // 邮箱地址
        "password": "FXXqamXMJj48RjBb", // 邮箱密码
        "created_at": "2019-08-01 10:00:00", // 创建时间
        "updated_at": "2019-08-01 10:00:00" // 更新时间
    }
]
```

## Ip 模块

### 1. 获取可用代理地址

    path：`${DOMAIN}get_ips`

#### 请求类型

GET

#### 返回

```JSON
[
    {
        "ip": "113.121.164.212", // ip地址
        "port": 42236, // 端口号
        "location": "山东省莱芜市 电信", // 该代理所在位置和运营商名称
        "expire": "2019-08-26 23:44:51", // 失效时间
        "username": "201908261927018578", // 用户名
        "password": "77579323" // 密码
    }
]
```
