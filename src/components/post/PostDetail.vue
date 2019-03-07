<template>
  <div>
    <span class="expand-key">作者: </span>
    <span class="expand-value">{{ row.sysUser.username }}</span>
    <br>
    <br>
    <span class="expand-key">评论数: </span>
    <span class="expand-value">{{ row.commentCount }}</span>
    <br>
    <br>
    <span class="expand-key">点赞数: </span>
    <span class="expand-value">{{ row.likeCount }}</span>
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
    <span class="expand-value">
      <Tag closable color="green" type="border" v-for="topic in row.topics" :key="topic" :name="topic" @on-close="handleClose2">{{ topic }}</Tag>

    </span>


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
