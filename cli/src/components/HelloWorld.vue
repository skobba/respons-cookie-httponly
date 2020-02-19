<template>
  <div class="hello">
    <h1>Response httponly cookie test</h1>
    <p>
      A test for setting a httponly cookie and send this cookie with every following requests. 
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" target="_blank" rel="noopener">HttpOnly Cookies (MDN)</a>.
    </p>
    
    <p>
      Get the cookie from the server (response cookie).
      <button @click="getCookie">Get cookie</button>
    </p>

    <p>
      Send the cookie with the request (request cookie).
      <button @click="sendCookie">Send cookie</button>
    </p>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    getCookie () {
      console.log("getCookie"); // eslint-disable-line

      fetch("http://localhost:3000/getcookie", {
        method: "POST",
        credentials: "include",
        // headers: {
        //   'Access-Control-Allow-Credentials': 'true'
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // mode: 'no-cors'
      });
      // let key = 'fromvue';
      // let value = 'somevaluefromfrontend';
      // let thirty = 60 * 60 * 24 * 30;
      // document.cookie = `${key}=${value};path=/;max-age=${thirty};`; // one cookie at a time
    },
    sendCookie () {
      console.log("sendCookie"); // eslint-disable-line
            fetch("http://localhost:3000/usecookie", {
        method: "POST",
        credentials: "include",
        // headers: {
        //   'Access-Control-Allow-Credentials': 'true'
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // mode: 'no-cors'
      });

      // let key = 'fromvue-httponly';
      // let value = 'somevaluefromfrontend-httponly';
      // let thirty = 60 * 60 * 24 * 30;
      // document.cookie = `${key}=${value};path=/;max-age=${thirty};HttpOnly`; // one cookie at a time
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
