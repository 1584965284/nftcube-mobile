<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import '@openfonts/noto-sans-sc_chinese-simplified'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  
}
</script>

