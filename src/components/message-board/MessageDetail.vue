<template>
  <div>
    <span class="expand-key">ID: </span>
    <span class="expand-value">{{ row.id }}</span>
    <br>
    <br>
    <span class="expand-key">User-Agent: </span>
    <span class="expand-value">{{ row.userAgent }}</span>
    <br>
    <br>
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
