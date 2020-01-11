<template>
  <div>
    <div v-for="(t, index) in row.translation" :key="index" class="expand-value">
      <span class="expand-key">{{ t.property }}.</span>
      <span class="expand-value" style="margin-left: 5px">{{ t.explanation }}</span>
    </div>
    <br>
    <div v-if="row.synonyms">
      <span class="expand-key">同义词: </span>
      <span class="expand-value">{{ row.synonyms }}</span>
      <br>
      <br>
    </div>
    <span class="expand-key">例句: </span>
    <span class="expand-value">{{ row.example_sentence }}</span>
    <br>
    <br>
    <span class="expand-key">译文: </span>
    <span class="expand-value">{{ row.sentence_translation }}</span>
    <br>
    <br>
    <span class="expand-key" >来源: </span>
    <span class="expand-value"><a target="_blank" :href="row.source" :title="row.source">{{ row.source }}</a></span>
    <br>
  </div>
</template>

<script>
  export default {
    name: "english-detail",
    props: {
      row: Object
    }
  }
</script>

<style scoped>

</style>
