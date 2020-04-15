<template>
  <div>
    <span class="expand-key">IP: </span>
    <span class="expand-value">{{ row.ip_id }}</span>
    <br>
    <br>
    <span class="expand-key">User-Agent: </span>
    <span class="expand-value">{{ row.ua }}</span>
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
