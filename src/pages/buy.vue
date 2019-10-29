<template>
	<div class="buy">
		<header>
			<p>	
				<router-link :to="{path: '/details', query: {name: $route.query.name, id: $route.query.id}}">
					<img src="../assets/img/left.png" alt="" />
				</router-link>
				影院
			</p>
			<p>
				{{$route.query.name}} 
				<span>
					{{$route.query.grade}}
				</span>
			</p>
		</header>
		<div class="box"></div>
		<div class="content">
			<div v-for='(i,k) in begin' :key='k'>
				<p>{{i}}</p>
				<div>
					<p>{{data.lang}}</p>
					<p>{{place[k]}}</p>
				</div>
				<p>￥{{data.price}}</p>
				<router-link :to='{path: "/seat", query: {name: $route.query.name, id: $route.query.id, grade: $route.query.grade, place: place[k], price: data.price, time: i, src: $route.query.src}}'>
					<mt-button size="small" type="default">选择购票</mt-button>
				</router-link>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				data: '',
				begin: [],
				place: []
			}
		},
		created(){
			
			this.$http.get('/data?id='+this.$route.query.id).then(res=>{
				this.data = res.data
				this.begin = this.data.begin.split(',')
				this.place = this.data.place.split(',')
			},err=>{
				let timer = this.$toast('网络异常')
				setTimeout(()=>{
					timer.close()
				},1000)
			})
		}
	}
</script>

<style scoped="scoped" lang="less">
@btnBg: #076FA2; 
@btnClo: #fff;
.buy{
	header{
		position: fixed;
		width: 100%;
		z-index: 1;
		p{
			text-align: center;
			height: 0.35rem;
			line-height: 0.35rem;
			background-color: @btnClo;
			color: @btnBg;
			width: 100%;
			font-weight: bold;
			span{
				font-size: 0.1rem;
				color: #FF9900;
			}
		}
		p:first-child{
			height: 0.4rem;
			line-height: 0.4rem;
			background-color: @btnBg;
			color: @btnClo;
			a{
				position: absolute;
				left: 0.09rem;
				top: 0.02rem;
				line-height: 0.4rem;
				img{
					width: 0.075rem;
					line-height: 0.2rem;
				}
			}
		}
	}
	.box{
			height: 0.75rem;
	}
	.content{
		margin-top: 0.15rem;
		>div{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.15rem;
			text-align: center;
			.mint-button{
				border: 1px solid @btnBg;
				color: @btnBg;
				height: 0.25rem;
				cursor: pointer;
			}
		}
		>div:nth-child(odd){
			background-color: #fff;
		}
	}
}
</style>