<template>
  <div>
    <span class="expand-key">User-Agent: </span>
    <span class="expand-value">{{ row.userAgent }}</span>
    <br>
    <br>
    <span class="expand-key">留言内容: </span>
    <span class="expand-value">{{ row.content }}</span>

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
