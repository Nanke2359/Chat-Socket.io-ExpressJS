<!--
 * @Description: 
 * @Author: NanKe
 * @Date: 2021-12-21 19:55:43
 * @LastEditTime: 2021-12-23 09:43:23
 * @LastEditors: NanKe
 * @Cnblogs: https://www.cnblogs.com/NanKe-Studying/
 * @FilePath: \Chat-Socket.io-ExpressJS\web\src\views\Home.vue
-->
<template>
  <div>
    <div
      class="wrap has-background-primary is-flex is-justify-content-center py-4"
    >
      <p class="has-text-white is-size-4" href="#">NanKe's Chat</p>
    </div>
    <div class="container is-max-widescreen mt-6 px-5">
      <div class="columns is-justify-content-space-between">
        <div class="column is-one-third">
          <p class="title is-5 has-text-primary has-text-centered">
            在线用户列表
          </p>
          <div class="dropdown-content">
            <template v-if="loginUserList.length > 0">
              <div v-for="(item, index) in loginUserList" :key="index">
                <a
                  href="#"
                  class="
                    dropdown-item
                    is-family-secondary is-size-6
                    has-text-centered
                  "
                  >{{ item }}
                </a>
                <hr class="dropdown-divider" />
              </div>
            </template>
            <template v-else>
              <p class="subtitle is-7 has-text-grey has-text-centered py-2">
                暂无用户！
              </p>
            </template>
          </div>
        </div>
        <div class="column is-offset-1">
          <template v-if="isLogin">
            <div class="card px-1">
              <div class="card-content">
                <p class="title is-5 has-text-primary has-text-centered">
                  {{ isLoginTip }}
                </p>
                <article class="message is-link">
                  <div class="message-body">
                    <template v-if="messageList.length > 0">
                      <p
                        class="title is-6 mb-3 has-text-link has-text-centered"
                      >
                        消息列表
                      </p>
                      <ul style="max-height: 150px; overflow: auto">
                        <li v-for="(item, index) in messageList" :key="index">
                          <div class="tags has-addons">
                            <span
                              class="
                                subtitle
                                is-6
                                pt-1
                                has-text-weight-semibold
                              "
                              >{{ item.userName }}：</span
                            >
                            <span class="subtitle is-6 pt-1 has-text-grey">{{
                              item.msg
                            }}</span>
                            <hr />
                          </div>
                        </li>
                      </ul>
                    </template>
                    <template v-else>
                      <span class="subtitle is-7 has-text-grey"
                        >赶快分享该界面邀请您的好友进行对话吧！</span
                      >
                    </template>
                  </div>
                </article>
                <div class="field pt-1">
                  <label class="label">Message</label>
                  <div class="control">
                    <textarea
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
                  <button class="button is-primary" @click="SendMessage">
                    <span>发送</span>
                    <span class="icon">
                      <i class="iconfont icon-send"></i>
                    </span>
                  </button>
                </div>
              </footer>
            </div>
          </template>
          <template v-else>
            <div class="card">
              <div class="card-content">
                <p class="title is-5 has-text-primary has-text-centered">
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
                    />
                  </div>
                </div>
              </div>
              <footer class="card-footer is-justify-content-flex-end">
                <div class="mr-5 py-3">
                  <button class="button is-primary" @click="Login">
                    <span>Let's Chat!</span>
                    <span class="icon">
                      <i class="iconfont icon-dialogue1"></i>
                    </span>
                  </button>
                </div>
              </footer>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {},
  props: {},
  filters: {},
  data() {
    return {
      isLogin: false, //是否已登录
      userName: "",
      isLoginTip: "",
      loginUserList: [],

      message: "",
      messageList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    Login() {
      console.log("123");
      if (this.userName.trim().length === 0) {
        this.$Message.warning({
          content: "The name cannot be empty！",
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
    updateUser(data) {
      this.loginUserList = data;
    },
    //监听消息列表
    output(data) {
      this.messageList.push(data);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
}
</style>