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

<style lang="less">
	
	*{
		font-size: 0.12rem;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	a{
		text-decoration: none;
	}
	html,body{
		color: #333;
		height: 100%;
		background: #F3F3F3;
	}
</style>
