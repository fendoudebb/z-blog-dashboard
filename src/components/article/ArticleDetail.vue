<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">关键词: </span>
      <span class="expand-value">{{ row.keywords }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">描述: </span>
      <span class="expand-value">{{ row.description }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">分类: </span>
      <span class="expand-value">{{ row.category }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
      <span class="expand-key">最后更新时间: </span>
      <span class="expand-value">{{ row.updateTime }}</span>
      </Col>
      <Col span="8">

      </Col>
      <Col span="8">

      </Col>
    </Row>
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
  .expand-row {
    margin-bottom: 16px;
  }
</style>
