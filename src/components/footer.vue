<template>
	<div class="footer">
		<div class="box"></div>
		<footer type='type'>
			<router-link  to='/home' >
				<img :src="type=='movie'?movie_src1 : movie_src"  alt="" />
				<p>电影</p>
			</router-link>
			<router-link to='/order'>
				<img :src="type=='order'?order_src1 : order_src" alt="" />
				<p>订单</p>
			</router-link>
			<router-link to='/my'>
				<img :src="type=='uder'?uder_src1 : uder_src" alt="" />
				<p>我的</p>
			</router-link>
		</footer>
	</div>
</template>

<script>
	export default {
		props: ['type'],
		data(){
			return {
				movie_src: require('../assets/img/movie_icon2.png'),
				movie_src1: require('../assets/img/movie_icon.png'),
				order_src: require('../assets/img/order.png'),
				order_src1: require('../assets/img/order_icon.png'),
				uder_src: require('../assets/img/uder.png'),
				uder_src1: require('../assets/img/uder_icon.png')
			}
		}
	}
</script>

<style scoped="scoped" lang='less'>
@btnBg: #076FA2; 
@btnClo: #fff;
.footer{
	width: 100%;
	.box{
		height: 0.5rem;
	}
	footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		height: 0.5rem;
		padding: 0.05rem;
		justify-content: space-around;
		text-align: center;
		background-color: @btnBg;
		img {
			width: 0.25rem;
		}
		p{
			color: @btnClo;
		}
	}
}
</style>