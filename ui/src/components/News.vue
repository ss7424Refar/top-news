<template>
  <div class="news">
    <Card style="width:350px">
      <p slot="title">
        <Icon type="ios-film-outline" class="baidu"></Icon>
         百度新闻榜
      </p>
      <a href="#" slot="extra" @click.prevent="change">
        <Icon type="ios-loop-strong"></Icon>
        换一换
      </a>
      <ul style="position: relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <li v-for="item in List">
          <i-button type="success" shape="circle" size="small" class="num">{{ item.id }}</i-button>
          <a :href="item.href" target="_blank">{{ item.name }}</a>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      timer: '',
      num: 1,
      spinShow: true,
      List: []
    }
  },
  methods: {
    do () {
      this.spinShow = true
      this.$http.get("http://localhost:8081/news?num=" + this.num).then(res => {
        if (res.data.flag) {
          this.num++
        } else {
          this.num = 1
        }
        this.spinShow = false
        this.List = JSON.parse(res.data.data)
      })
    },
    change() {
      clearInterval(this.timer);
      this.do()
    }
  },
  mounted() {
    this.do()
    this.timer = setInterval(this.do, 15000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .num {
    margin-right: 15px;
  }
  .news {
    margin-top: 5px;
    margin-left: 5px;
  }
  .baidu {
    margin-right: 5px;
  }
</style>
