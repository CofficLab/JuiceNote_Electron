# 反向代理和 CDN

在前述讨论中，我们始终未考虑用户的差异。

实际上，每个用户的网络情况千差万别。不同地区的用户访问网站时，速度差别也极大。

此时，我们可以想办法让一部分静态资源离用户近一些，CDN 应运而生。

<div class="flex flex-col bg-cyan justify-center gap-8 p-4">
  <div class="flex flex-row gap-2 justify-between">
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center">
      <div class="p-4">
        动态请求
      </div>
      <div class="p-4 text-center text-2xl rotate-90">--></div>
    </div>
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center">
      <div class="p-4">
        静态请求
      </div>
      <div class="flex flex-row">
      <div class="bg-sky p-4 text-center">CDN直接返回</div>
      </div>
    </div>
  </div>
  <div class="flex flex-row gap-2 border border-red-50/10 p-4 justify-center">
      <div class="p-2 text-center">
        负载均衡
      </div>
  </div>
  <div class="flex flex-row gap-2 justify-between">
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center">
      <div class="p-4">
        应用服务器1
      </div>
      <div class="flex flex-row">
      <div class="bg-sky p-4 text-center">应用程序</div>
      <div class="bg-yellow p-4 text-center">本地缓存</div>
      </div>
    </div>
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center">
      ...
    </div>
    <div class="flex flex-col gap-2 border border-red-50/10 p-4 justify-center">
      <div class="p-4">
        应用服务器n
      </div>
      <div class="flex flex-row">
      <div class="bg-sky p-4 text-center">应用程序</div>
      <div class="bg-yellow p-4 text-center">本地缓存</div>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-between">
      <div class="flex flex-col gap-2 border border-red-50/10 p-4">
        <div class="p-4 text-center">文件服务器</div>
        <div class="bg-sky p-4 text-center">文件</div>
      </div>
      <div class="flex flex-col gap-2 border border-red-50/10 p-4">
        <div class="p-4">分布式缓存服务器集群</div>
        <div class="bg-sky p-2 text-center">服务器1</div>
        <div class="bg-sky p-2 text-center">......</div>
        <div class="bg-sky p-2 text-center">服务器n</div>
      </div>
      <div class="flex flex-col gap-2 border border-red-50/10 p-4">
        <div class="p-4 text-center">数据库读写分离</div>
        <div class="bg-sky p-4 text-center">主：处理写操作</div>
        <div class="text-center rotate-90">--></div>
        <div class="bg-sky p-4 text-center">从：处理读操作</div>
      </div>
  </div>
</div>
