<template>
  <div>
    <span class="expand-key">关键词: </span>
    <span class="expand-value">{{ row.keywords }}</span>
    <br>
    <br>
    <span class="expand-key">描述: </span>
    <span class="expand-value">{{ row.description }}</span>
    <br>
    <br>
    <span class="expand-key">分类: </span>
    <span class="expand-value">{{ row.categoryAlias }}</span>
    <br>
    <br>
    <span class="expand-key">最后更新时间: </span>
    <span class="expand-value">{{ row.updateTime }}</span>

  </div>
</template>

<script>
  export default {
    name: "article-detail",
    props: {
      row: Object
    }
  }
</script>

<style scoped>

</style>
