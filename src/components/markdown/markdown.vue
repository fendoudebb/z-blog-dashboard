<template>
    <mavon-editor
                  ref=md
                  :subfield="subfield"
                  :code_style="code_style"
                  :ishljs="true"
                  @imgAdd="uploadImg"
                  @imgDel="delImg"
                  :externalLink="externalLink" v-model="value"></mavon-editor>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import {uploadPostImg} from "@/api/post";

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
          /*markdown_css: function() {
            // 这是你的markdown css文件路径
            return 'https://s.zhangbj.com/lib/github-markdown-css/2.10.0/github-markdown.min.css';
          },*/
          hljs_js: function() {
            // 这是你的hljs文件路径
            return 'https://cdn.staticfile.org/highlight.js/9.15.8/highlight.min.js';
          },
          hljs_css: function() {
            // 这是你的代码高亮配色文件路径
            return 'https://cdn.staticfile.org/highlight.js/9.15.8/styles/atom-one-dark.min.css';
          },
          /*katex_css: function() {
            // 这是你的katex配色方案路径路径
            return 'https://s.zhangbj.com/lib/katex/0.9.0/css/katex.min.css';
          },*/
          katex_css: false,
          katex_js: false
          /*katex_js: function() {
            // 这是你的katex.js路径
            return 'https://s.zhangbj.com/lib/katex/0.9.0/js/katex.min.js';
          },*/
        }
      }
    },
    methods: {
      delImg(pos, $file) {
        console.log($file)
      },
      // https://github.com/hinesboy/mavonEditor/blob/master/doc/cn/upload-images.md
      uploadImg(pos, $file){
        // 第一步.将图片上传到服务器.
        let formdata = new FormData();
        formdata.append('image', $file);
        uploadPostImg(formdata).then(data => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          // $vm.$img2Url 详情见本页末尾
          console.log(JSON.stringify(data));
          this.$refs.md.$img2Url(pos, data.data);
        });
      },
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
