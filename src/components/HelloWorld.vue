<template>
  <div class="hello">
    <div class="canvas-warp">
      <canvas id="canvas" ref="canvas"></canvas>
    </div>
    <van-uploader
      class="uploader"
      :after-read="onChange"
      v-show="uploadImgBtn"
      image-fit="cover"
    >
      <van-button
        class="uploader-btn"
        icon="photo"
        color="#222"
        >上传图片</van-button
      >
    </van-uploader>
    <van-popup
      class="save-popup"
      v-model="saveShow"
      closeable
      :style="{ width: '80%' }"
      >长按或右键保存图片！<br /><br />
      <img :src="saveImgUrl" alt=""
    /></van-popup>

    <div class="btn-bar">
      <van-button color="#f44336" @click="saveImg"
        >保存</van-button
      ><van-button
        icon="replay"
        color="#f44336"
        @click="reset"
      ></van-button>
    </div>
    <van-tabs class="pic-list">
      <van-tab
        :title="tabs"
        v-for="tabs in tab"
        :key="tabs"
      >
        <van-grid
          :column-num="5"
          :gutter="10"
          :clickable="true"
          :square="true"
        >
          <van-grid-item
            v-for="(imgUrl, index) in material"
            :key="tabs + index"
            ><img
              id="my-image"
              :src="imgUrl"
              @click="addImg"
            />
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import {
  Button,
  Popup,
  Notify,
  Uploader,
  Tab,
  Tabs,
  Grid,
  GridItem,
} from 'vant'

export default {
  name: 'app',
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
    [Notify.name]: Notify,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {
      canvas: null,
      material: [
        '/img/1.png',
        '/img/2.png',
        '/img/3.png',
        '/img/4.png',
        '/img/5.png',
        '/img/5.png',
        '/img/5.png',
        '/img/5.png',
      ],
      tab: ['圣诞', '新年'],
      uploadImgBtn: true,
      Uploaded: false,
      saveShow: false,
      saveImgUrl: '',
    }
  },
  mounted() {
    this.initCanvas()
  },
  computed: {
    canvasWidth() {
      return window.innerWidth
    },
    canvasHeight() {
      return window.innerHeight
    },
  },
  methods: {
    initCanvas() {
      this.canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#eee',
        devicePixelRatio: true, //Retina 高清屏 屏幕支持
      })
      if (this.canvasWidth < this.canvasHeight) {
        this.canvas.setWidth(this.canvasWidth)
        this.canvas.setHeight(this.canvasWidth)
      } else {
        this.canvas.setWidth(this.canvasHeight * 0.8)
        this.canvas.setHeight(this.canvasHeight * 0.8)
      }
    },
    onChange(file) {
      //console.log(file)
      this.Uploaded = true
      this.loadImg(file.content)
      //以下用于获取上传图片base64码
      // var reader = new FileReader()
      // var that = this
      // reader.onload = function(e) {
      //   const src = e.target.result
      //   that.imageBase64 = src
      //   //获得Base64
      //   that.loadImg(that.imageBase64)
      // }
      // reader.readAsDataURL(file.files[0])
    },
    loadImg(url) {
      // 设置画布背景
      // fabric.Image.fromURL(url, img => {
      //   img.set({
      //     scaleX: this.canvas.width / img.width,
      //     scaleY: this.canvas.width / img.width,
      //   })
      //   // 设置背景
      //   this.canvas.setBackgroundImage(
      //     img,
      //     this.canvas.renderAll.bind(this.canvas),
      //   )
      // })
      let that = this
      fabric.Image.fromURL(url, function(oImg) {
        oImg.lockRotation = true
        oImg.set({
          transparentCorners: false,
          cornerColor: '#ff110094',
          borderColor: '#ff110094',
          cornerSize: 16,
          cornerStyle: 'circle',
          borderDashArray: [5, 8],
        })
        oImg.scale(that.canvas.width / oImg.width)
        that.canvas.add(oImg)
      })
      //隐藏上传按钮
      this.uploadImgBtn = false
    },
    addImg(el) {
      if (!this.Uploaded) {
        Notify('请先上传图片噢(oﾟvﾟ)ノ')
        return false
      }
      const imgInstance = new fabric.Image(el.target, {
        left: 100, // 图片相对画布的左侧距离
        top: 100, // 图片相对画布的顶部距离
        // 图片绘制后的大小，此处为原大小的一半
        scaleX: 0.5,
        scaleY: 0.5,
      })

      imgInstance.set({
        transparentCorners: false,
        cornerColor: '#ff110094',
        borderColor: '#ff110094',
        cornerSize: 16,
        padding: 10,
        cornerStyle: 'circle',
        borderDashArray: [5, 8],
      })
      this.canvas.add(imgInstance)
      this.canvas.renderAll()
    },
    reset() {
      var obj = this.canvas.getObjects()
      console.log(obj)

      for (var i = 0; i < obj.length; i++) {
        this.canvas.remove(obj[i])
      }
      this.canvas.renderAll()
      this.uploadImgBtn = true
    },
    saveImg() {
      if (!this.Uploaded) {
        Notify('先开始制作再保存吧(oﾟvﾟ)ノ')
        return false
      }
      const dataURL = this.canvas.toDataURL({
        format: 'jpeg', // jpeg或png
      })
      this.saveImgUrl = dataURL
      this.saveShow = true
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uploader {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 180px;
  margin-left: -90px;
}
.uploader-btn {
  width: 180px;
}
.save-popup {
  padding: 1rem 0;
  text-align: center;
}
.save-popup img {
  width: 90%;
}
</style>
<style>
.canvas-container {
  margin: 0 auto 10px;
}
.btn-bar button {
  margin: 0 10px;
}
.pic-list {
  margin-top: 1rem;
}
.pic-list .van-grid-item__content {
  padding: 8px;
  border-radius: 20px;
}
.pic-list img {
  width: 100%;
}
.van-tabs__content {
  padding-top: 10px;
}
.van-grid-item__content--surround::after {
  border-radius: 20px;
}
.van-tab--active {
  color: #f44336;
  font-weight: 700;
}
</style>
