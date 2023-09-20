# Discord Builder

디스코드 서버 제작을 간편하게 해주는 봇입니다.  
또한 변경 사항을 빠르게 서버에 적용시킵니다.

# Concept

## Channel

```
builder_category
└── builder_logs
```

`builder_category`: 해당 카테고리 안의 채널들은 [Group](#group)입니다.  
`builder_logs`: Discord Builder 명령어의 결과를 기록하는 채널입니다.

_위 채널들과 **같은 이름의 채널**을 만들거나 임의로 **변경**, **삭제**할 시 기능이 제대로 동작하지 않을 수 있습니다._

## Group

`Group`은 중복된 권한의 카테고리들을 생성, 변경하기 위해 고안되었습니다.  
`builder_category`에 채널을 추가하여 만들 수 있습니다.  
`Group`에 원하는 채널 권한을 작성하고, 그 권한을 동기화할 채널을 `Group`에 멘션하면 됩니다.

## Role

다음과 같은 일반적인 역할 컨셉을 정의합니다.

`ADMINISTOR`: 서버의 모든 것을 통제할 수 있습니다.  
`MANAGER`: 맴버를 벤하거나, 채널을 관리하는 등의 역할을 수행합니다.  
`SUPPORTER`: 메시지들을 관리하는 등 `MANAGER`를 돕습니다.  
`MEMBER`: 일반적인 채널의 맴버입니다.  
`VIEWER`: 서버의 채널들을 볼 수만 있습니다.  
`EMPTY`: 아무 권한도 없는 역할입니다.

# Command

## Design

> ```
> /designinit
> ```
>
> Discord Builder를 사용하기 위한 첫 명령어  
> `builder_category`와 그 안에 포함된 `builder_logs`를 생성합니다.

> ```
> /designbuild
> ```
>
> `builder_category`의 [Group](#group)을 각각의 카테고리에 적용합니다.

## Create

> ```
> /createchannel [type: 채널의 종류] [name: 채널의 이름] [category: 채널의 카테고리]
> ```
>
> 새로운 채널을 생성합니다.
>
> ```
> /createcategory [name: 카테고리의 이름]
> ```
>
> 새로운 카테고리를 생성합니다.
>
> ```
> /createrole [concept: 역할의 컨셉] [name: 역할의 이름] [hoist: 역할을 다른 맴버와 분리] [position: 역할의 위치]
> ```
>
> 새로운 역할을 생성합니다.  
> 역할의 컨셉은 [Role](#role)을 참고하세요.
