<template>
	<div class="index">
		<header>
			<p>小莱电影</p>
			<p>影片</p>
		</header>
		<div class="box"></div>
		
		<div class="content">
			<div v-for='i in data'>
				<router-link :to="{path: '/details', query: {name: i.name, id: i._id}}" class="img">
					<img v-bind='{src: pic + i.src}' alt="" />
				</router-link>
				<div class="txt">
					<h4>
						<router-link :to="{path: '/details', query: {name: i.name, id: i._id}}">
							{{i.name}}
						</router-link>
					</h4>
					<div>
						<div>
							<span class="left">{{i.v}}</span>
							<span class="right">{{i.v1}}</span>
						</div>
						<div class="grade">{{i.grade}}</div>
					</div>
					<p>剧情： {{i.txt}}</p>
					<p>主演： {{i.txt1}}</p>
					<router-link :to="{path: '/details', query: {name: i.name, id: i._id}}">
						<mt-button type="default">购票</mt-button>
					</router-link>
				</div>
			</div>
		</div>
		
		<my-footer type='movie'></my-footer>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				data: '',
				src: '',
				srcbgx: '',
				srcbgy: '',
				srcbg1: ''
			}
		},
		methods: {
			
		},
		created(){
			this.$http.get('/data').then(res=>{
				this.data = res.data
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
.index{
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
			font-size: 0.13rem;
		}
		p:first-child{
			height: 0.4rem;
			line-height: 0.4rem;
			background-color: @btnBg;
			color: @btnClo;
		}
	}
	.box{
			height: 0.75rem;
	}
	.content{
		>div{
			display: flex;
			padding: 0.05rem;
			margin: 0.05rem;
			border-bottom: 1px solid #ccc;
			.img{
				img {
					width: 1rem;
					height: 1.3rem;
				}
			}
			.txt{
				width: 100%;
				position: relative;
				margin-left: 0.1rem;
				h4 {
					font-size: 0.14rem;
					a:link {color: #333333;}      
					a:visited {color: #333333;}
				}
				>div{
					display: flex;
					justify-content: space-between;
					margin-top: 0.05rem;
					margin-bottom: 0.05rem;
					>div{
						display: flex;
						span{
							background-color: @btnBg;
							color: @btnClo;
							padding: 0.02rem;
							font-size: 0.1rem;
							line-height: 0.1rem;
							border: 1px solid @btnBg;
							border-right: none;
							
							display: block;
						}
						.left{
							border-bottom-right-radius: none;
							border-top-right-radius: none;
							border-bottom-left-radius: 4px;
							border-top-left-radius: 4px;
						}
						.right{
							border: 1px solid @btnBg;
							background-color: @btnClo;
							color: @btnBg;
							border-bottom-left-radius: none;
							border-top-left-radius: none;
							border-bottom-right-radius: 4px;
							border-top-right-radius: 4px;
						}
					}
					.grade{
						color: #FF9900;
						font-weight: bold;
					}
				}
				p{
					margin-top: 0.05rem;
				}
				.mint-button{
					background-color: @btnBg;
					width: 0.6rem;
					height: 0.3rem;
					color: @btnClo;
					position: absolute;
					right: 0;
					bottom: 0;
					cursor: pointer;
				}
			}
		}
	}
}
</style>