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
        plain
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

    <div class="btn-bar" v-show="showBtnBar">
      <van-button
        icon="img/save.png"
        color="#212121"
        @click="saveImg"
      ></van-button
      ><van-button
        icon="img/reset.png"
        color="#212121"
        @click="reset"
      ></van-button>
      <van-button
        icon="img/lock.png"
        color="#212121"
        @click="lockObj"
      ></van-button>
      <van-button
        icon="img/jiesuo.png"
        color="#212121"
        @click="unlockObj"
      ></van-button>
      <van-button
        icon="img/remove.png"
        color="#212121"
        @click="removeObj"
      ></van-button>
    </div>
    <van-tabs class="pic-list">
      <van-tab
        :title="tab.title"
        v-for="tab in material"
        :key="tab.title"
      >
        <van-grid
          :column-num="5"
          :gutter="10"
          :clickable="true"
          :square="true"
        >
          <van-grid-item
            v-for="(imgUrl, index) in tab.img"
            :key="tab.title + index"
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
        {
          title: '圣诞',
          img: [
            'img/christmes/1.png',
            'img/christmes/2.png',
            'img/christmes/3.png',
            'img/christmes/4.png',
            'img/christmes/5.png',
            'img/christmes/6.png',
            'img/christmes/7.png',
            'img/christmes/8.png',
            'img/christmes/9.png',
            'img/christmes/10.png',
            'img/christmes/11.png',
            'img/christmes/12.png',
            'img/christmes/13.png',
            'img/christmes/14.png',
            'img/christmes/15.png',
            'img/christmes/16.png',
            'img/christmes/17.png',
            'img/christmes/18.png',
            'img/christmes/19.png',
            'img/christmes/20.png',
            'img/christmes/21.png',
            'img/christmes/22.png',
            'img/christmes/23.png',
            'img/christmes/24.png',
            'img/christmes/25.png',
            'img/christmes/26.png',
            'img/christmes/27.png',
          ],
        },
        {
          title: '新年',
          img: [
            'img/newyear/1.png',
            'img/newyear/2.png',
            'img/newyear/3.png',
            'img/newyear/4.png',
            'img/newyear/5.png',
            'img/newyear/6.png',
            'img/newyear/7.png',
            'img/newyear/8.png',
            'img/newyear/9.png',
            'img/newyear/10.png',
            'img/newyear/11.png',
            'img/newyear/12.png',
            'img/newyear/13.png',
            'img/newyear/14.png',
            'img/newyear/15.png',
            'img/newyear/16.png',
            'img/newyear/17.png',
            'img/newyear/18.png',
            'img/newyear/19.png',
            'img/newyear/20.png',
            'img/newyear/21.png',
            'img/newyear/22.png',
          ],
        },
      ],
      uploadImgBtn: true,
      Uploaded: false,
      saveShow: false,
      saveImgUrl: '',
      showBtnBar: false,
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
        preserveObjectStacking: true, //选中项保持层级,否则置顶
        devicePixelRatio: true, //Retina 高清屏 屏幕支持
      })
      if (this.canvasWidth > 480) {
        this.canvas.setWidth(480)
        this.canvas.setHeight(480)
      } else if (this.canvasWidth < this.canvasHeight) {
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
      this.canvas.backgroundColor = ''
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
      this.showBtnBar = true
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
      for (var i = 0; i < obj.length; i++) {
        this.canvas.remove(obj[i])
      }
      //this.canvas.clear()
      this.Uploaded = false
      this.uploadImgBtn = true
      this.showBtnBar = false
    },
    lockObj() {
      let obj = this.canvas.getActiveObject()
      if (!obj) {
        Notify('先选一个要锁定的图片啦╰(￣ω￣ｏ)')
        return false
      }
      obj.lockMovementX = true
      obj.lockMovementY = true
      obj.lockRotation = true
      obj.lockScalingX = true
      obj.lockScalingY = true
      obj.hasControls = false
      this.canvas.renderAll()
    },
    unlockObj() {
      let obj = this.canvas.getActiveObject()
      if (!obj) {
        Notify('╰(￣ω￣ｏ)先选一个要解锁的图片啦')
        return false
      }
      obj.lockMovementX = false
      obj.lockMovementY = false
      obj.lockRotation = false
      obj.lockScalingX = false
      obj.lockScalingY = false
      obj.hasControls = true
      this.canvas.renderAll()
    },
    removeObj() {
      let obj = this.canvas.getActiveObject()
      if (!obj) {
        Notify('先选一个要删掉的图片啦╰(￣ω￣ｏ)')
        return false
      }
      this.canvas.remove(obj)
    },
    saveImg() {
      const dataURL = this.canvas.toDataURL({
        format: 'png', // jpeg或png
      })
      this.saveImgUrl = dataURL
      this.saveShow = true
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.canvas-warp {
  max-width: 480px;
  max-height: 480px;
  /* overflow: hidden; */
  /* background: #eee; */
  border: 6px solid #eee;
  margin: 0 auto 10px;
}

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
  max-height: 90%;
  padding: 1rem 0;
  text-align: center;
}
.save-popup img {
  max-width: 90%;
  max-height: 90%;
}

.btn-bar button {
  margin: 0 5px;
}
.pic-list {
  margin-top: 1rem;
}
.pic-list .van-grid-item__content {
  padding: 8px;
  border-radius: 10px;
}
.pic-list img {
  max-width: 100%;
  max-height: 100%;
}
.van-tabs__nav {
  max-width: 700px;
  margin: 0 auto;
}
.van-tabs__content {
  height: 15rem;
  max-width: 700px;
  overflow: auto;
  padding-top: 10px;
  margin: 0 auto;
}
.van-grid-item__content--surround::after {
  border-radius: 20px;
}
.van-tab--active {
  color: #f44336;
  font-weight: 700;
}
</style>
