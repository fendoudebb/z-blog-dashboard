<template>
  <div>
    <span class="expand-key">站长邮箱: </span>
    <span class="expand-value">{{ row.webmaster_email }}</span>
    <br>
    <br>
    <span class="expand-key">创建时间: </span>
    <span class="expand-value">{{ row.create_ts }}</span>
    <br>
    <br>
    <span class="expand-key">修改时间: </span>
    <span class="expand-value">{{ row.update_ts }}</span>
    <br>
  </div>
</template>

<script>
  export default {
    name: "link-detail",
    props: {
      row: Object
    }
  }
</script>

<style scoped>

</style>
