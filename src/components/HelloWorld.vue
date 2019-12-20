<template>
  <div class="hello">
    <div class="canvas-warp">
      <canvas id="canvas" ref="canvas"></canvas>
    </div>
    <label
      for="uploadImg"
      class="upload-btn"
      v-show="uploadImgBtn"
      ><input
        type="file"
        id="uploadImg"
        @change="onChange"
        accept="image/*;capture=camera"
        ref="input"
      />上传图片</label
    >
    <van-button round type="info">圆形按钮</van-button>
    <div class="bar"></div>
    <ul>
      <li v-for="(imgUrl, index) in material" :key="index">
        <img id="my-image" :src="imgUrl" @click="addImg" />
      </li>
    </ul>
  </div>
</template>

<script>
import { fabric } from 'fabric'
export default {
  name: 'app',
  data() {
    return {
      elInput: null,
      imageBase64: '',
      canvas: null,
      material: [
        '/img/1.png',
        '/img/2.png',
        '/img/3.png',
        '/img/4.png',
        '/img/5.png',
      ],
      uploadImgBtn: true,
      Uploaded: false,
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
    onChange() {
      const elInput = this.$refs.input
      var reader = new FileReader()
      var that = this
      reader.onload = function(e) {
        const src = e.target.result
        that.imageBase64 = src
        //获得Base64
        that.loadImg(that.imageBase64)
      }
      if (elInput.files && elInput.files[0]) {
        reader.readAsDataURL(elInput.files[0])
      }
    },
    loadImg(url) {
      // 设置画布背景
      fabric.Image.fromURL(url, img => {
        img.set({
          // 通过scale来设置图片大小，这里设置和画布一样大
          scaleX: this.canvas.width / img.width,
          scaleY: this.canvas.height / img.height,
        })
        // 设置背景
        this.canvas.setBackgroundImage(
          img,
          this.canvas.renderAll.bind(this.canvas),
        )
        //隐藏上传按钮
        this.uploadImgBtn = false
      })
    },
    addImg(el) {
      if (!this.imageBase64) {
        alert('请上传图片')
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
    saveImg() {
      // const dataURL = this.canvas.toDataURL({
      //   format: 'jpeg', // jpeg或png
      // })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#uploadImg {
  display: none;
}
.upload-btn {
  display: block;
  position: absolute;
  top: 30%;
  left: 50%;
  width: 200px;
  margin-left: -100px;
  line-height: 4;
  text-align: center;
  background: #222;
  color: #fff;
  font-weight: bold;
  border-radius: 4rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 15vw;
  height: 15vw;
  margin: 0 1vw;
  padding: 1vw;
  border: 1px solid #d4d4d4;
  vertical-align: middle;
}
li img {
  width: 100%;
}
</style>
<style>
.canvas-container {
  margin: 0 auto;
}
</style>
