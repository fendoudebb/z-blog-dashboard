<template>
  <div style="margin: 20px;padding:20px;background-color: white">
    <div style="margin-bottom: 20px" v-if="this.roles.indexOf(`ROLE_ADMIN`) > -1" >
      <Input v-model="searchWord" placeholder="搜索" style="width: 150px;"/>
      <Button type="primary" icon="ios-search" @click="findWord"></Button>
      <Button type="info" @click="resetSearch">重置</Button>

      <Button type="primary" @click="addNewWord" style="float: right">
        添加单词
      </Button>
    </div>
    <Table border stripe :data="wordList" :columns="wordListColumns" :loading="wordListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
      <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
            show-total></Page>
    </div>

    <Modal
      v-model="showAddNewWordModal"
      :title="wordModalTitle"
      @on-ok="onModalOkClick">

      <div>
        英文单词：<Input v-model="word" clearable placeholder="请输入英文单词" style="width: 400px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px">
        英式音标：<Input v-model="english_phonetic" clearable placeholder="请输入英式音标" style="width: 400px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px">
        美式音标：<Input v-model="american_phonetic" clearable placeholder="请输入美式音标" style="width: 400px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px" v-for="(t, index) in translation" :key="index">
        单词翻译：
        <Select v-model="t.property" placeholder="词性" style="width:80px">
          <Option v-for="item in wordProperties" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="t.explanation" placeholder="翻译" style="width: 250px;margin-right: 10px"></Input>
        <Button type="primary" size="small" shape="circle" icon="plus-round" @click="addTranslationInput"></Button>
        <Button type="error" size="small" shape="circle" icon="minus-round" @click="deleteTranslationInput(index)" v-if="index > 0"></Button>
      </div>
<!--      <div style="margin-top: 20px">
        单词翻译：<Input v-model="translation" clearable placeholder="请输入单词翻译" style="width: 250px;margin-right: 10px"></Input>
      </div>-->
      <div style="margin-top: 20px">
        单词例句：<Input v-model="example_sentence" clearable placeholder="请输入单词例句" style="width: 400px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px">
        例句译文：<Input v-model="sentence_translation" clearable placeholder="请输入例句译文" style="width: 400px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px">
        词语来源：<Input v-model="source" clearable placeholder="请输入词语来源" style="width: 400px;margin-right: 10px"></Input>
      </div>
      <div style="margin-top: 20px">
        同义词：<Input v-model="synonyms" clearable placeholder="请输入同义词" style="width: 400px;margin-right: 10px"></Input>
      </div>
    </Modal>
  </div>
</template>

<script>
  import expandRow from './EnglishDetail';
  import {getEnglishList, addEnglish, updateEnglish} from '@/api/english';
  export default {
    name: "english-list",
    components: {expandRow},
    data() {
      return {
        roles: localStorage.getItem('roles'),
        wordProperties: [
          {
            value: 'adj',//adjective
            label: '形容词'
          },
          {
            value: 'n',//noun
            label: '名词'
          },
          {
            value: 'v',//verb
            label: '动词'
          },
          {
            value: 'adv',//adverbial
            label: '副词'
          },
          {
            value: 'prep',//preposition
            label: '介词'
          },
        ],
        searchWord: '',
        word: '',
        synonyms: '',
        english_phonetic: '',
        american_phonetic: '',
        translation: [{'property':'', 'explanation':''}],
        example_sentence: '',
        sentence_translation:'',
        source: '',
        showAddNewWordModal: false,
        wordModalTitle: '',
        modifyWordId: '',
        wordListTableLoading: false,
        wordList: [],
        pageSize: 10,
        totalCount: 1,
        currentPage: 1,
        wordListColumns: [
          {
            type: 'expand', width: 50, render: (h, params) => {
              return h(expandRow, {props: {row: params.row}})
            }
          },
          {title: 'ID', key: '_id', align: 'center', ellipsis: true, minWidth: 200,},
          {title: '单词', key: 'word', align: 'center', ellipsis: true, minWidth: 150,},
          {title: '英文音标', key: 'english_phonetic', align: 'center', ellipsis: true, minWidth: 150,},
          {title: '美式音标', key: 'american_phonetic', align: 'center', ellipsis: true, minWidth: 150,},
          // {title: '翻译', key: 'translation', align: 'center', ellipsis: true, minWidth: 150,},
          {
            title: '操作', key: 'action', align: 'center', ellipsis:true, minWidth: 150,
            render: (h, params) => {
              let action = [];
              //@formatter:off
                let updateWord = h('Button', {props: {type: 'primary', size: 'small',}, style: {marginRight: '5px'}, on: {click: () => {this.updateWord(params.row)}}}, '修改');
                //@formatter:on
              action.push(updateWord);
              return h('div', [action]);
            }
          }
        ]
      }
    },
    methods:{
      resetSearch() {
        this.currentPage = 1;
        this.searchWord = '';
        this.getEnglish();
      },
      findWord() {
        if (!this.searchWord) {
          this.$Message.error("搜索单词不能为空");
          return;
        }
        this.currentPage = 1;
        this.getEnglish();
      },
      addNewWord() {
        this.wordModalTitle = '添加单词';
        this.showAddNewWordModal = true;
        if (this.modifyWordId) {
          this.word = '';
          this.synonyms = '';
          this.english_phonetic = '';
          this.american_phonetic = '';
          this.translation = [{'property':'', 'explanation':''}];
          this.example_sentence = '';
          this.sentence_translation = '';
          this.source = '';
        }
        this.modifyWordId = '';
      },
      updateWord(param) {
        this.wordModalTitle = '修改单词';
        this.showAddNewWordModal = true;
        this.modifyWordId = param._id;
        this.word = param.word;
        this.synonyms = param.synonyms;
        this.english_phonetic = param.english_phonetic;
        this.american_phonetic = param.american_phonetic;
        this.translation = param.translation;
        this.example_sentence = param.example_sentence;
        this.sentence_translation = param.sentence_translation;
        this.source = param.source;
      },
      addTranslationInput() {
        this.translation.push({});
      },
      deleteTranslationInput(index) {
        this.translation.splice(index,1)
      },
      onModalOkClick() {
        if (!this.word) {
          this.$Message.error("单词不能为空!");
          return;
        }

        for(let index in this.translation) {
          if (!this.translation[index].property) {
            this.$Message.error("词性不能为空!");
            return;
          }
          if (!this.translation[index].explanation) {
            this.$Message.error("翻译不能为空!");
            return;
          }
        }
        if (this.modifyWordId) {
          updateEnglish(this.modifyWordId, this.word, this.synonyms, this.english_phonetic, this.american_phonetic, this.translation, this.example_sentence, this.sentence_translation, this.source).then(value => {
            this.$Message.success("修改成功!");
            this.getEnglish();
          })
        } else {
          addEnglish(this.word, this.synonyms, this.english_phonetic, this.american_phonetic, this.translation, this.example_sentence, this.sentence_translation, this.source).then(value => {
            this.$Message.success("添加成功!");
            this.word = '';
            this.synonyms = '';
            this.english_phonetic = '';
            this.american_phonetic = '';
            this.translation = [{'property':'', 'explanation':''}];
            this.example_sentence = '';
            this.sentence_translation = '';
            this.source = '';
            this.getEnglish();
          })
        }
      },
      changePage(index) {
        this.currentPage = index;
        this.getEnglish();
      },
      getEnglish() {
        this.wordListTableLoading = true;
        let word = null;
        if (this.searchWord) {
          word = this.searchWord;
        }
        getEnglishList(word, this.currentPage, this.pageSize).then(res => {
          this.totalCount = res.data.totalCount;
          this.wordList = res.data.english;
          this.wordListTableLoading = false;
        }).catch(err => {
          this.wordListTableLoading = false;
          this.$Message.error(err);
        });
      },
    },
    created() {
      this.getEnglish();
    },
  }
</script>

<style scoped>

</style>
