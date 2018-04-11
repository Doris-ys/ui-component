<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
export default {
    name: 'App'
}

</script>
<style lang="scss">
@import "./styles/common";
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

li {
    list-style: none;
}

* {
    margin: 0;
    padding: 0;
}

html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font-size: 23.4375px;
}

</style>
