<template>
	<div class="index">
		<img src="../assets/img/LOGO_text.png" alt="" />
	</div>
</template>

<script>
	export default {
		created(){
			setTimeout(()=>{
				this.$router.push('/home')
			},1000)
		}
	}
</script>

<style scoped="scoped" lang="less">
	.index{
		img{
			width: 100%;
			margin-top: 1rem;
			padding: 0.4rem;
		}
	}
</style>