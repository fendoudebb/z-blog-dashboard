<template>
  <div>
    <span class="expand-key">ID: </span>
    <span class="expand-value">{{ row.id }}</span>
    <br>
    <br>
    <span class="expand-key">IP: </span>
    <span class="expand-value">{{ row.ip }}</span>
    <br>
    <br>
    <span class="expand-key">留言内容: </span>
    <span class="expand-value">{{ row.content }}</span>
    <br>
    <br>
    <span class="expand-key">User-Agent: </span>
    <span class="expand-value">{{ row.userAgent }}</span>
    <br>
    <br>
    <div v-for="(reply, index) in row.reply" :key="index">
      <span class="expand-key">回复内容: </span><span class="expand-value">{{ reply.content }}</span>
      <br>
      <span class="expand-key">时间: </span><span class="expand-value">{{new Date(reply.commentTime.$date.$numberLong * 1000).toLocaleString()}}</span>
      <br>
      <span class="expand-key">浏览器: </span><span class="expand-value">{{ reply.browser }}</span>
      <br>
      <span class="expand-key">ip: </span><span class="expand-value">{{ reply.ip }}</span>
      <br>
      <br>
    </div>

  </div>
</template>

<script>
  export default {
    name: "message-detail",
    props: {
      row: Object
    }
  }
</script>

<style scoped>

</style>
