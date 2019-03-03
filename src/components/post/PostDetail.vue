<template>
  <div>
    <span class="expand-key">作者: </span>
    <span class="expand-value">{{ row.sysUser.username }}</span>
    <br>
    <br>
    <span class="expand-key">创建时间: </span>
    <span class="expand-value">{{ row.postTime }}</span>
    <br>
    <br>
    <span class="expand-key">是否原创: </span>
    <span class="expand-value">{{ row.isCopy ? '转载' : '原创' }}</span>
    <br>
    <br>
    <span class="expand-key">是否公开: </span>
    <span class="expand-value">{{ row.isPrivate ? '个人' : '公开' }}</span>
    <br>
    <br>
    <span class="expand-key">分类: </span>
    <span class="expand-value">{{ row.topics }}</span>


  </div>
</template>

<script>
  export default {
    name: "post-detail",
    props: {
      row: Object
    }
  }
</script>

<style scoped>

</style>
