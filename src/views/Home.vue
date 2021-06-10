<template>
  <hello-world />
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',
    family: false,
    id:null,
    components: {
      HelloWorld,
    },
    created(){
      this.id = this.$route.params.id
      this.family = this.$route.params.family
    }
  }
</script>
