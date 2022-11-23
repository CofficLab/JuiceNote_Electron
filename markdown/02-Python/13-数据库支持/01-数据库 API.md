# 数据库 API

使用简单的纯文本文件可实现的功能有限。诚然，使用它们可做很多事情，但有时可能还需 要额外的功能。你可能希望能够自动完成序列化，此时可求助于 shelve(参见第 10 章)和 pickle (类似于 shelve)。不过你可能需要比这更强大的功能。例如，你可能想自动支持数据并发访问， 即允许多位用户读写磁盘数据，而不会导致文件受损之类的问题。还有可能希望同时根据多个数 据字段或属性进行复杂的搜索，而不是采用 shelve 提供的简单的单键查找。尽管可供选择的解决 方案有很多，但如果要处理大量的数据，并希望解决方案易于其他程序员理解，选择较标准的数
据库可能是个不错的主意。 本章讨论 Python 数据库 AP(I 一种连接到 SQL 数据库的标准化方式)，并演示如何使用这个 API
来执行一些基本的 SQL。最后，本章将讨论其他一些数据库技术。 这里不会提供关系型数据库和 SQL 语言教程。通过阅读有关数据库(如 PostgreSQL、MySQL
或本章使用的 SQLite)的文档，就应该能够学到你需要知道的知识。如果你以前没有使用过关系 型数据库，可参阅www.sqlcourse.com或在网上搜索相关的主题，也可参阅Clare Churcher 的著作 Beginning SQL Queries, 2nd ed(Apress, 2016)。
本章使用的是简单数据库 SQLite，但显然绝非只能使用它。有多种流行的商用数据库，如 Oracle 和 Microsoft SQL Server，还有一些使用广泛而且可靠的开源数据库，如 MySQL、PostgreSQL 和 Firebird。有关 Python 支持的数据库清单，请参阅https://wiki.python.org/moin/DatabaseInterfaces。 数据库也并非只有关系型(SQL)这一种，还有对象数据库[如 Zope Object Database(ZODB， http://zodb.org)]、基于表格的紧凑数据库[如 Metakit(http://equi4.com/metakit)]、更简单的 键  值数据库[如 UNIX DBM(https://docs.python.org/3/library/dbm.html)]。另外，还有日益流行 的各种 NoSQL 数据库，如 MongoDB(http://mongodb.com)、Cassandra(http://cassandra.apache.org) 和 Redis(http://redis.io)，这些数据库都可使用Python来访问。
本章的重点是低级的数据库交互，但有一些高级库能够让你轻松地完成复杂的工作，要获悉 这方面的信息，可参阅http://sqlalchemy.org或http://sqlobject.org，也可在网上搜索Python对象关 系映射器。

前面说过，有各种 SQL 数据库可供选择，其中很多都有相应的 Python 客户端模块(有些数据库甚至有多个)。所有数据库的大多数基本功能都相同，因此从理论上说，对于使用其中一种数 据库的程序，很容易对其进行修改以使用另一种数据库。问题是即便不同模块提供的功能大致相 同，它们的接口(API)也是不同的。为解决 Python 数据库模块存在的这种问题，人们一致同意 开发一个标准数据库 API(DB API)。这个 API 的最新版本(2.0)是在 PEP 249(Python Database API Specification v2.0)中定义的，网址为http://python.org/peps/pep-0249.html。
本节概述有关该 API 的基础知识。这里不会涉及其可选部分，因为它们并不适用于所有数据 库。有关该 API 的详细信息，可参阅前面提到的 PEP，也可参阅 Python 官方维基百科中的数据库编 程指南(http://wiki.python.org/moin/DatabaseProgramming)。如果你对这个API的细节不感兴趣， 可跳过本节。

## 全局变量

所有与 DB API2.0 兼容的数据库模块都必须包含三个全局变量，它们描述了模块的特征。这 样做的原因是，这个 API 设计得很灵活，无需进行太多包装就能配合多种不同的底层机制使用。 如果要让程序能够使用多种不同的数据库，可能会比较麻烦，因为需要考虑众多不同的可能性。 在很多情况下，一种更现实的做法是检查这些变量，看看给定的模块是否是程序能够接受的。如 果不是，就显示合适的错误消息并退出或者引发异常。表 13-1 总结了这些全局变量。
API 级别(apilevel)是一个字符串常量，指出了使用的 API 版本。DB API 2.0 指出，这个变 10 量的值为'1.0'或'2.0'。如果没有这个变量，就说明模块不与 DB API 2.0 兼容，应假定使用的是
DB API 1.0。编写代码时，允许这个变量为其他值也没有害处，因为说不定什么时候 DB API 3.0 就出来了。
线程安全程度(threadsafety)是一个 0~3(含)的整数。0 表示线程不能共享模块，而 3 表 示模块是绝对线程安全的。1 表示线程可共享模块本身，但不能共享连接(参见 13.1.3 节)，而 2 表示线程可共享模块和连接，但不能共享游标。如果你不使用线程(在大多数情况下可能不会是 这样的)，就根本不用关心这个变量。
参数风格(paramstyle)表示当你执行多个类似的数据库查询时，如何在 SQL 查询中插入参 数。'format'表示标准字符串格式设置方式(使用基本的格式编码)，如在要插入参数的地方插 入%s。'pyformat'表示扩展的格式编码，即旧式字典插入使用的格式编码，如%(foo)s。除这些 Python 风格外，还有三种指定待插入字段的方式:'qmark'表示使用问号，'numeric'表示使用:1 和:2 这样的形式表示字段(其中的数字是参数的编号)，而'named'表示使用:foobar 这样的形式表示字段(其中 foobar 为参数名)。如果你觉得参数样式令人迷惑，也不用担心。编写简单程序时，
不会用到它们。如果需要明白特定的数据库是如何处理参数的，可参阅相关的文档。

## 异常

DB API 定义了多种异常，让你能够细致地处理错误。然而，这些异常构成了一个层次结构， 因此使用一个 except 块就可捕获多种异常。当然，如果你觉得一切都正常运行，且不介意出现不 太可能出现的错误时关闭程序，可以根本不考虑这些异常。
表 13-2 说明了这个异常层次结构。异常应该在整个数据库模块中都可用。有关这些异常的深 入描述，请参阅 DB API 规范(前面提到的 PEP)。

## 连接和游标

要使用底层的数据库系统，必须先连接到它，为此可使用名称贴切的函数 connect。这个函 数接受多个参数，具体是哪些取决于要使用的数据库。作为指南，DB API 定义了表 13-3 所示的参 数。推荐将这些参数定义为关键字参数，并按表 13-3 所示的顺序排列。这些参数都应该是字符串。

<script>
function run(target) {
    if (window.runner == undefined) {
        alert('在APP版本中才可以运行')
        return
    }

    if (target.innerHTML == '收起') {
        target.innerHTML = '运行'
        target.parentElement.getElementsByTagName('pre').item(0).style.display = 'none'
    } else {
        target.innerHTML = '收起'
        code = target.parentElement.parentElement.getElementsByTagName('code').item(0).innerText
        result = window.runner(code,'python')
        target.parentElement.getElementsByTagName('code').item(0).innerHTML = result
        target.parentElement.getElementsByTagName('pre').item(0).style.display = 'block'
    }
}
</script>
