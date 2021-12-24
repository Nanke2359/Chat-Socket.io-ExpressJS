<!--
 * @Description: 
 * @Author: NanKe
 * @Date: 2021-12-21 19:55:43
 * @LastEditTime: 2021-12-24 20:43:32
 * @LastEditors: NanKe
 * @Cnblogs: https://www.cnblogs.com/NanKe-Studying/
 * @FilePath: \Chat-Socket.io-ExpressJS\web\src\views\Home.vue
-->
<template>
  <div>
    <audio muted ref="audio" :src="audioSrc" />
    <div
      class="
        animate__animated animate__fadeInDown
        wrap
        has-background-primary
        is-flex is-justify-content-space-around is-align-items-center
        py-2
      "
    >
      <i></i>
      <p class="has-text-white is-size-5-desktop is-size-6-touch" href="#">
        NanKe's Chat
      </p>
      <i
        class="iconfont"
        style="font-size: 1.2rem; cursor: pointer; color: #ffffff"
        :class="[isOpenMusic ? 'icon-shengyin' : 'icon-shengyinguanbi']"
        @click="isOpenMusic = !isOpenMusic"
      ></i>
    </div>
    <div
      class="
        container
        is-max-widescreen
        mt-6
        px-3
        animate__animated animate__fadeInUp
      "
    >
      <div class="columns is-justify-content-space-between">
        <div class="column is-4-desktop">
          <p
            class="
              title
              is-size-5-desktop is-size-6-touch
              has-text-primary has-text-centered
            "
          >
            在线用户列表
          </p>
          <div class="dropdown-content div-box">
            <template v-if="loginUserList.length > 0">
              <div v-for="(item, index) in loginUserList" :key="index">
                <p
                  href="#"
                  class="
                    dropdown-item
                    is-size-6-desktop is-size-7-touch
                    has-text-centered has-text-weight-semibold
                    list-p
                  "
                >
                  {{ item }}
                </p>
              </div>
            </template>
            <template v-else>
              <p
                class="
                  subtitle
                  is-size-6-desktop is-size-7-touch
                  has-text-grey has-text-centered
                  py-2
                "
              >
                暂无用户
              </p>
            </template>
          </div>
        </div>
        <div style="position: relative" class="column is-7-desktop">
          <transition
            mode="in-out"
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight "
          >
            <div
              class="card"
              v-show="isLogin"
              style="position: absolute; width: 93.5%"
            >
              <div class="card-content">
                <div
                  class="
                    pb-4
                    is-flex
                    is-justify-content-space-between
                    is-align-items-center
                  "
                >
                  <p
                    class="
                      has-text-weight-semibold
                      is-size-5-desktop is-size-6-touch
                      has-text-primary has-text-centered
                    "
                  >
                    {{ isLoginTip }}
                  </p>
                  <button
                    class="button is-danger is-light is-small"
                    @click="Disconnect"
                  >
                    <span class="icon">
                      <i class="iconfont icon-tuichu"></i>
                    </span>
                    <span>退出连接</span>
                  </button>
                </div>

                <article class="message is-link">
                  <div class="message-body" style="padding: 10px 12px">
                    <div v-show="messageList.length > 0">
                      <p
                        class="
                          title
                          is-size-6-desktop is-size-7-touch
                          mb-4
                          has-text-link has-text-centered
                        "
                      >
                        消息列表
                      </p>
                      <ul ref="ulbox" class="ul-box">
                        <li
                          v-for="(item, index) in messageList"
                          :key="index"
                          class="mb-4"
                          :class="[item.isMe ? 'ismeli-div' : 'nomeli-div']"
                        >
                          <div class="is-flex is-justify-content-center mb-4">
                            <span
                              style="
                                color: #ffffff;
                                background-color: rgba(0, 0, 0, 0.18);
                                padding: 4px;
                                font-size: 14px;
                                border-radius: 2px;
                              "
                              >{{ item.time }}</span
                            >
                          </div>
                          <div>
                            <div
                              class="is-size-6-desktop is-size-7-touch"
                              :style="{
                                float: item.isMe ? 'right' : 'left',
                              }"
                            >
                              {{ item.userName }}
                            </div>
                            <div
                              class="
                                message-li
                                is-size-6-desktop is-size-7-touch
                              "
                              :class="[item.isMe ? 'ismeli' : 'nomeli']"
                            >
                              {{ item.msg }}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div v-show="messageList.length === 0">
                      <span
                        class="
                          subtitle
                          is-size-6-desktop is-size-7-touch
                          has-text-grey
                        "
                        >赶快分享该界面邀请您的好友进行对话吧！</span
                      >
                    </div>
                  </div>
                </article>
                <div class="field pt-1">
                  <label class="label">Message</label>
                  <div class="control">
                    <div class="py-1">
                      <i
                        @click="emojiFunc"
                        class="iconfont icon-emoji"
                        :class="{ thumeColor: isEmoji }"
                        style="font-size: 25px; cursor: pointer"
                      >
                        <picker
                          v-show="isEmoji"
                          :style="{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            zIndex: '2000',
                            transform: 'translate(-50%,-50%)',
                          }"
                          @select="addEmoji"
                          :showSearch="false"
                          :showCategories="false"
                        />
                      </i>
                    </div>
                    <textarea
                      v-if="isLogin"
                      v-focus
                      v-model="message"
                      rows="3"
                      class="textarea"
                      placeholder="Please enter what you want to send"
                      v-on:keyup.enter="SendMessage"
                    ></textarea>
                  </div>
                </div>
              </div>
              <footer class="card-footer is-justify-content-flex-end">
                <div class="mr-5 py-3">
                  <button
                    class="button is-primary is-small"
                    @click="SendMessage"
                  >
                    <span>发送</span>
                    <span class="icon">
                      <i class="iconfont icon-send"></i>
                    </span>
                  </button>
                </div>
              </footer>
            </div>
          </transition>
          <transition
            mode="in-out"
            enter-active-class="animate__animated animate__fadeInLeft "
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <div
              class="card"
              v-show="!isLogin"
              style="position: absolute; width: 93.5%"
            >
              <div class="card-content">
                <p
                  class="
                    title
                    is-size-5-desktop is-size-6-touch
                    has-text-primary has-text-centered
                  "
                >
                  给自己一个昵称
                </p>
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input
                      v-model="userName"
                      class="input is-primary"
                      type="text"
                      placeholder="Please enter your username"
                      v-on:keyup.enter="Login"
                      v-focus
                    />
                  </div>
                </div>
              </div>
              <footer class="card-footer is-justify-content-flex-end">
                <div class="mr-5 py-3">
                  <button class="button is-primary is-small" @click="Login">
                    <span>Let's Chat!</span>
                    <span class="icon">
                      <i class="iconfont icon-dialogue1"></i>
                    </span>
                  </button>
                </div>
              </footer>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue";
export default {
  name: "Home",
  components: { Picker },
  props: {},
  filters: {},
  data() {
    return {
      isLogin: false, //是否已登录
      isEmoji: false,
      userName: "",
      isLoginTip: "",
      loginUserList: [],

      message: "",
      messageList: [],
      isMine: true, //msg是否是自己发的
      audioSrc: "",
      isOpenMusic: false,
    };
  },
  computed: {},
  watch: {
    isOpenMusic: {
      handler(val) {
        if (val) {
          this.$refs.audio.muted = "";
          console.log("有声音");
        } else {
          this.$refs.audio.muted = "muted";
          console.log("静音");
        }
      },
    },
  },
  methods: {
    audioPlay() {
      setTimeout(() => {
        this.$refs.audio.play();
      }, 10);
    },
    emojiFunc() {
      this.isEmoji = !this.isEmoji;
    },
    addEmoji(e) {
      this.message += e.native;
    },
    scrollFunc() {
      this.$nextTick(() => {
        this.$refs.ulbox.scrollTop = this.$refs.ulbox.scrollHeight;
      });
    },
    Disconnect() {
      this.$socket.emit("deleteUser", this.userName, () => {
        this.$Message.success({
          content: "退出成功",
          duration: 1,
        });
        this.userName = "";
        this.isLogin = false;
      });
    },
    Login() {
      if (this.userName.trim().length === 0) {
        this.$Message.warning({
          content: "昵称不可为空！",
          duration: 2,
        });
        return;
      }
      //向server发送用户名
      this.$socket.emit("Login", this.userName, () => {
        this.isLoginTip = `欢迎您，${this.userName}！`;
        this.$Message.success({
          content: this.isLoginTip,
          duration: 1,
        });
        this.isLogin = true;
      });
    },
    SendMessage() {
      this.$socket.emit("SendMessage", this.message, () => {
        this.$Message.info({
          content: "发送成功",
          duration: 1,
        });
        this.message = "";
      });
    },
  },
  async created() {},
  async mounted() {},
  //监听server发送回来的东西
  sockets: {
    //监听用户列表
    updateUserList(data) {
      this.loginUserList = data;
      if (this.isOpenMusic) {
        this.audioSrc = require("../assets/上线.wav");
        this.audioPlay();
      }
    },
    //监听消息列表
    output(data) {
      const isMe = this.userName === data.userName;
      const resSult = Object.assign(data, { isMe });
      this.messageList.push(resSult);
      this.scrollFunc();
      this.audioSrc = require("../assets/微信语音消息发送音效.wav");
      if (!isMe) this.audioPlay();
    },
    //监听名字是否重复
    duplicateName(data) {
      this.$Message.error({
        content: data,
        duration: 2,
      });
    },
    //已连接
    isConnection(data) {
      this.$Message.success({
        content: data,
        duration: 2,
      });
    },
    //广播用户
    updateUser(data) {
      this.$Message.default({
        slots: `<div style="text-align:center;"><img style="width:20px;height:20px;" src="http://www.xvue.cn/dist/static/img/xvue-ui.dd56c7b.png"><p style="text-align:center;">${data}</p></div>`,
        backgroundColor: "#fff",
        textColor: "rgb(99,205,255)",
        duration: 2,
      });
    },
  },
};
</script>
<style lang="scss"  scope>
.message-li {
  max-width: 60%;
  padding: 10px 11px;
  color: #000000;
  line-height: 1.3;
  letter-spacing: 0.5px;
}

.nomeli-div {
  width: 100%;
  float: left;
}
.ismeli-div {
  width: 100%;
  float: right;
}
.nomeli {
  float: left;
  background-color: #ffffff;
  margin-left: 9px;
  word-break: break-all;
  word-wrap: break-word;
  position: relative;
}
.nomeli::after {
  position: absolute;
  left: -5px;
  top: 5px;
  content: "";
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-right: 5px solid #ffffff;
  border-bottom: 4px solid transparent;
}
.ismeli {
  float: right;
  background-color: #98e165;
  margin-right: 9px;
  word-break: break-all;
  word-wrap: break-word;
  position: relative;
}
.ismeli::after {
  position: absolute;
  right: -5px;
  top: 5px;
  content: "";
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-left: 5px solid #98e165;
  border-bottom: 4px solid transparent;
}
.ycyc {
  word-break: break-all;
  word-wrap: break-word;
  padding: 0.8rem;
}
.thumeColor {
  color: #00d1b2;
}
.div-box {
  max-height: 160px;
  overflow-y: auto;
}
.list-p:hover {
  background-color: rgba(100, 100, 100, 0.2);
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  letter-spacing: 0.06rem;
}
.ul-box {
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  padding: 0 0.6375rem 0 0.2rem;
}
/*滚动条宽 长,滚动条整体部分，其中的属性有width,height,background,border等。*/
::-webkit-scrollbar {
  width: 7px;
}

/*滚动条的滑轨背景颜色,可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

/* 滑块颜色 */

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

/*滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
::-webkit-scrollbar-button {
  background-color: #eee;
  display: none;
}

/* 横向滚动条和纵向滚动条相交处尖角的颜色 */
::-webkit-scrollbar-corner {
  background-color: black;
}
</style>