<template>
  <div>
    <span class="expand-key">Referer: </span>
    <span class="expand-value">{{ row.referer }}</span>
    <br>
    <br>
    <span class="expand-key">User-Agent: </span>
    <span class="expand-value">{{ row.userAgent }}</span>
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
