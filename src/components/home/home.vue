<template>
  <div style="margin: 20px;padding:20px;">
    <Row>
      <Col span="6" style="height: 120px;padding-bottom: 10px;">
        <info-card shadow :color="postInfo.color" :icon="postInfo.icon" :icon-size="36" :left="30">
          <count-to :end="postInfo.count" count-class="count-style"/>
          <p>{{ postInfo.title }}</p>
        </info-card>
      </Col>
      <Col span="6" offset="3" style="height: 120px;padding-bottom: 10px;">
        <info-card shadow :color="ipInfo.color" :icon="ipInfo.icon" :icon-size="36" :left="30">
          <count-to :end="ipInfo.count" count-class="count-style"/>
          <p>{{ ipInfo.title }}</p>
        </info-card>
      </Col>
      <Col span="6" offset="3" style="height: 120px;padding-bottom: 10px;">
        <info-card shadow :color="pvInfo.color" :icon="pvInfo.icon" :icon-size="36" :left="30">
          <count-to :end="pvInfo.count" count-class="count-style"/>
          <p>{{ pvInfo.title }}</p>
        </info-card>
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
      postInfo: { title: '文章数', icon: 'android-map', count:0, color: '#9A66E4' },
      ipInfo: { title: '访客数', icon: 'ios-people',count:0, color: '#2d8cf0' },
      pvInfo: { title: '浏览量', icon: 'android-locate', count:0, color: '#19BE6B' },
    }
  },
  created() {
    axios.request({
      url: webInfoUrl,
      method: 'post'
    }).then(value => {
      if (value.code === 200) {
        this.postInfo.count = value.data.webInfo.postCount;
        this.ipInfo.count = value.data.webInfo.ipCount;
        this.pvInfo.count = value.data.webInfo.pvCount;
      }
    });

  }
}
</script>

<style lang="less">
  .count-style{
    font-size: 50px;
  }
</style>
