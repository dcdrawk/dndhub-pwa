<template>
  <div id="app">
    <shell></shell>
  </div>
</template>

<script>
import Shell from './components/layout/Shell'

export default {
  // Name
  name: 'app',

  // Components
  components: {
    Shell
  }
}
</script>

<style>
li {
  list-style: none;
}
/* body {
  margin: 0;
} */
/* *, :after, :before { */
  /* box-sizing: border-box;
} */

/* #app { */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50; */
/* } */

/* main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
} */
</style>
