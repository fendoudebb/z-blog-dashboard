<template>
  <div>
    <span class="expand-key">ID: </span>
    <span class="expand-value">{{ row.id }}</span>
    <br>
    <br>
    <span class="expand-key">Referer: </span>
    <span class="expand-value">{{ row.referer }}</span>
    <br>
    <br>
    <span class="expand-key">User-Agent: </span>
    <span class="expand-value">{{ row.ua }}</span>
    <br>
    <br>
    <span class="expand-key">请求参数: </span>
    <span class="expand-value">{{ row.req_param }}</span>
  </div>
</template>

<script>
  export default {
    name: "page-view-detail",
    props: {
      row: Object
    }
  }
</script>

<style scoped>

</style>
