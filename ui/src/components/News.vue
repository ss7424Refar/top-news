<template>
  <div class="news">
    <Card style="width:350px">
      <p slot="title">
        <Icon type="ios-film-outline" class="baidu"></Icon>
         百度新闻榜
      </p>
      <a href="#" slot="extra">
        <Icon type="ios-loop-strong"></Icon>
        每隔10s更新
      </a>
      <ul style="position: relative">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <li v-for="item in List">
          <i-button type="success" shape="circle" size="small" class="num">{{ item.id }}</i-button>
          <a :href="item.href" @click.prevent="add(item.href)">{{ item.name }}</a>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
if (window.require) {
  const ipcRenderer = window.require('electron').ipcRenderer
}
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
      this.$http.get(
              "http://localhost:8081/news?num=" + this.num,
              {timeout: 5000}
      ).then(res => {
        if (res.data.flag) {
          this.num++
        } else {
          this.num = 1
        }
        this.spinShow = false
        this.List = JSON.parse(res.data.data)
      }).catch(reason => {
        console.log('reason '+ reason);
      })
    },
    add(url) {
      // console.log(url)
      if (window.require) {
        ipcRenderer.send('open-window', url)
      } else {
        console.log(window.require)
      }

    }
  },
  mounted() {
    this.timer = setInterval(this.do, 10000);
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
