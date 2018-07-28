<template>
  <div>
    <markdown-editor v-model="content"></markdown-editor>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/markdown'

  export default {
    name: "publish",
    components: {
      MarkdownEditor
    },
    data () {
      return {
        content: ''
      }
    }
  }
</script>

<style scoped>

</style>
