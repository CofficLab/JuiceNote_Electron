# NoSQL 与搜索引擎

随着网站业务越来越复杂，对数据存储和检索的需求也越来越复杂，网站需要采用一些非关系数据库技术如 NoSQL 和非数据库查询技术如搜索引擎。

<div class="flex flex-col bg-cyan justify-center gap-8 p-4">
  <div class="flex flex-row gap-2 justify-between">
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center bg-cyan">
      <div class="p-4">
        动态请求
      </div>
      <div class="p-4 text-center text-2xl rotate-90">--></div>
    </div>
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center bg-cyan">
      <div class="p-4">
        静态请求
      </div>
      <div class="flex flex-row">
      <div class="bg-sky p-4 text-center">CDN直接返回</div>
      </div>
    </div>
  </div>
  <div class="flex flex-row gap-2 border border-red-50/10 p-4 justify-center bg-cyan">
      <div class="p-2 text-center">
        负载均衡
      </div>
  </div>
  <div class="flex flex-row gap-2 justify-between">
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center bg-cyan">
      <div class="p-4">
        应用服务器1
      </div>
      <div class="flex flex-row">
      <div class="bg-sky p-4 text-center">应用程序</div>
      <div class="bg-yellow p-4 text-center">本地缓存</div>
      </div>
    </div>
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center bg-cyan">
      ...
    </div>
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center bg-cyan">
      <div class="p-4">
        应用服务器n
      </div>
      <div class="flex flex-row">
      <div class="bg-sky p-4 text-center">应用程序</div>
      <div class="bg-yellow p-4 text-center">本地缓存</div>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-between bg-cyan gap-2">
      <div class="flex flex-col gap-2 border border-red-50/10 p-4  bg-cyan">
        <div class="p-4 text-center">分布式文件服务器集群</div>
        <div class="bg-sky p-2 text-center">文件服务器1</div>
        <div class="bg-sky p-2 text-center">......</div>
        <div class="bg-sky p-2 text-center">文件服务器n</div>
      </div>
      <div class="flex flex-col gap-2 border border-red-50/10 p-4  bg-cyan">
        <div class="p-4">分布式缓存服务器集群</div>
        <div class="bg-sky p-2 text-center">服务器1</div>
        <div class="bg-sky p-2 text-center">......</div>
        <div class="bg-sky p-2 text-center">服务器n</div>
      </div>
      <div class="flex flex-col gap-2 border border-red-50/10 p-4  bg-cyan">
        <div class="p-4 text-center">数据库读写分离</div>
        <div class="bg-sky p-4 text-center">主：处理写操作</div>
        <div class="text-center rotate-90">--></div>
        <div class="bg-sky p-4 text-center">从：处理读操作</div>
      </div>
      <div class="flex flex-col gap-2 border border-red-50/10 p-4 bg-cyan">
        <div class="p-4 text-center">NoSQL</div>
      </div>
      <div class="flex flex-col gap-2 border border-red-50/10 p-4 bg-cyan">
        <div class="p-4 text-center">搜索引擎</div>
      </div>
  </div>
</div>
