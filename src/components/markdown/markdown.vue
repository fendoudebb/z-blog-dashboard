<template>
    <mavon-editor :subfield="subfield"
                  :code_style="code_style"
                  :ishljs="true"
                  :externalLink="externalLink" v-model="value"></mavon-editor>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "MarkdownEditor",
    components: {
      mavonEditor
    },
    data() {
      return {
        value:'',
        subfield: true,
        code_style: 'solarized-dark',
        externalLink: {
          markdown_css: function() {
            // 这是你的markdown css文件路径
            return 'https://s.zhangbj.com/lib/github-markdown-css/2.10.0/github-markdown.min.css';
          },
          hljs_js: function() {
            // 这是你的hljs文件路径
            return 'https://s.zhangbj.com/lib/highlight/9.12.0/js/highlight.min.js';
          },
          hljs_css: function() {
            // 这是你的代码高亮配色文件路径
            return 'https://s.zhangbj.com/lib/highlight/9.12.0/css/androidstudio.min.css';
          },
          katex_css: function() {
            // 这是你的katex配色方案路径路径
            return 'https://s.zhangbj.com/lib/katex/0.9.0/css/katex.min.css';
          },
          katex_js: function() {
            // 这是你的katex.js路径
            return 'https://s.zhangbj.com/lib/katex/0.9.0/js/katex.min.js';
          },
        }
      }
    },
    methods: {
      getValue() {
        return this.value;
      },
      setValue(value) {
        this.value = value;
      }
    }
  }
</script>

<style>
  .markdown-body .highlight pre, .markdown-body pre {
    padding: 0 !important;
  }
</style>
