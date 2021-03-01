<template>
  <div>
    <Row>
      <Col span="5"  style="height: 120px;padding-bottom: 10px;">
        <info-card shadow :color="postInfo.color" :icon="postInfo.icon" :icon-size="36" :left="30">
          <count-to :end="postInfo.count" count-class="count-style"/>
          <p>{{ postInfo.title }}</p>
        </info-card>
      </Col>
      <Col span="5" offset="1" style="height: 120px;padding-bottom: 10px;">
        <info-card shadow :color="ipInfo.color" :icon="ipInfo.icon" :icon-size="36" :left="30">
          <count-to :simplify=true :end="ipInfo.count" count-class="count-style"/>
          <p>{{ ipInfo.title }}</p>
        </info-card>
      </Col>
      <Col span="5" offset="1" style="height: 120px;padding-bottom: 10px;">
        <info-card shadow :color="pvInfo.color" :icon="pvInfo.icon" :icon-size="36" :left="30">
          <count-to :simplify=true :end="pvInfo.count" count-class="count-style"/>
          <p>{{ pvInfo.title }}</p>
        </info-card>
      </Col>
      <Col span="5" offset="1" style="height: 120px;padding-bottom: 10px;">
        <info-card shadow :color="linksInfo.color" :icon="linksInfo.icon" :icon-size="36" :left="30">
          <count-to :end="linksInfo.count" count-class="count-style"/>
          <p>{{ linksInfo.title }}</p>
        </info-card>
      </Col>
    </Row>

    <Row style="margin-top: 30px">
      <Col span="8">
        <Card style="width:350px">
          <p slot="title">
            <Icon type="podium"></Icon>
            阅读排行榜
          </p>
          <span slot="extra">
        阅读量
      </span>
          <ul class="rank">
            <li v-for="(item,index) in rankPost" :key="index">
              <a :href="`/p/${item.id}/.html`" target="_blank">
                <div style="width: 80%" :title="item.title">{{index + 1}}. {{ item.title }}</div>
                <div style="max-width:15%;float: right" :title="item.pv">{{ item.pv }}</div>
              </a>
            </li>
          </ul>
        </Card>
      </Col>
      <Col span="8">
        <Card style="width:350px">
          <p slot="title">
            <Icon type="podium"></Icon>
            点赞排行榜
          </p>
          <span slot="extra">
        点赞数
      </span>
          <ul class="rank">
            <li v-for="(item,index) in rankLike" :key="index">
              <a :href="item.url" target="_blank" style="">
                <div style="width: 80%" :title="item.title">{{index + 1}}. {{ item.title }}</div>
                <div style="max-width:15%;float: right" :title="item.like_count">{{ item.like_count }}</div>
              </a>
            </li>
          </ul>
        </Card>
      </Col>
      <Col span="8">
        <Card style="width:350px">
          <p slot="title">
            <Icon type="podium"></Icon>
            评论排行榜
          </p>
          <span slot="extra">
        评论数
      </span>
          <ul class="rank">
            <li v-for="(item,index) in rankComment" :key="index">
              <a :href="item.url" target="_blank" style="">
                <div style="width: 80%" :title="item.title">{{index + 1}}. {{ item.title }}</div>
                <div style="max-width:15%;float: right" :title="item.comment_count">{{ item.comment_count }}</div>
              </a>
            </li>
          </ul>
        </Card>
      </Col>
    </Row>
  </div>


</template>

<script>
  import InfoCard from '@/components/info-card'
  import CountTo from '@/components/count-to'
  import axios from '@/libs/axios'
  import {webInfoUrl} from '@/api/url';
export default {
  name: 'home',
  components: {
    InfoCard,
    CountTo,
  },
  data() {
    return {
      postInfo: { title: '文章数', icon: 'ios-book', count:0, color: '#19BE6B' },
      ipInfo: { title: '访客数', icon: 'ios-people',count:0, color: '#E46CBB' },
      pvInfo: { title: '浏览量', icon: 'android-locate', count:0, color: '#319AFF' },
      linksInfo: { title: '友链数', icon: 'link', count:0, color: '#9A66E4' },
      rankPost: null,
      rankLike: null,
      rankComment: null,
    }
  },
  created() {
    const data = {
      token: localStorage.getItem('token')
    };
    axios.request({
      url: webInfoUrl,
      data,
      method: 'post'
    }).then(value => {
      if (value.code === 0) {
        this.postInfo.count = value.data[2][0].count;
        this.ipInfo.count = value.data[3][0].count;
        this.pvInfo.count = value.data[4][0].count;
        this.linksInfo.count = value.data[1].length;
        this.rankPost = value.data[5];
        this.rankLike = value.data[6];
        this.rankComment = value.data[7];
      }
    });
  }
}
</script>

<style lang="less">
  .count-style{
    font-size: 50px;
  }
  .rank {
    list-style: none;
  }
  .rank li a div{
    vertical-align:text-bottom;
    display:inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

</style>
