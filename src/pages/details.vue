<template>
	<div class="details">
		<header>
			<p>	
				<router-link to="/home">
					<img src="../assets/img/left.png" alt="" />
				</router-link>
				{{$route.query.name}}
			</p>
		</header>
		<div class="box"></div>
		<div class="content">
			<div class="bg" :style="{background: 'url('+ pic + img +') repeat'}" style="background-size:cover ;"></div>
			<div class="ttl" > 
				<router-link to='/details' class="img">
					<img v-bind='{src: pic + data.src}' alt="" />
				</router-link>
				<div class="txt">
					<h4>
						<router-link to='/details'>
							{{data.name}}
						</router-link>
					</h4>
					<div class="icon">
						<div class="one" :style="{width: w}">
							<img v-bind='{src: pic + data.srcbgx}'  alt="" />
						</div>
						<img class="two" v-bind='{src: pic + data.srcbgy}' alt="" />
					</div>
					<div>
						<div class="grade">{{data.grade}}</div>
					</div>
					<p>剧情： {{data.txt}}</p>
					<p>主演： {{data.txt1}}</p>
					<p>上映时间： {{data.time}}</p>
				</div>
			</div>
		</div>
		<p>
			{{data.txt2}}
		</p>
		<footer>
				<router-link :to='{path: "/buy", query: {name: data.name, id: data._id, grade: data.grade, src: data.src}}'>
					立即订购
				</router-link>
		</footer>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				ttl: '',
				data: '',
				img: '',
				w:''
			}
		},
		created(){
			this.ttl = this.$route.query.name
			
			this.$http.get('/data?id='+this.$route.query.id).then(res=>{
				this.data = res.data
				this.img = this.data.src
				this.w = eval(this.data.grade.replace(/分/,'')*10) +'%'
				
			},err=>{
				let timer = this.$toast('网络异常')
				setTimeout(()=>{
					timer.close()
				},1000)
			})
		}
	}
</script>

<style scoped="scoped" lang='less'>
@btnBg: #076FA2; 
@btnClo: #fff;
.details{
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
		height: 0.4rem;
	}
	
	.content{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		color: #fff;
		.bg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			filter: blur(4px);
			transform: scale(1.2);
		}
		.ttl{
			position: relative;
			top: 0;
			left: 0;
			z-index: 2;
			display: flex;
			padding: 0.05rem;
			margin: 0.05rem;
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
				h4{
					a{
						font-size: 0.14rem;
					}
					a:link {color: #fff;}      
					a:visited {color: #fff;}
				}
				.icon{
					position: relative;
					width: 40%;
					img{
						width: 0.76rem;
					}
					.one{
						position: absolute;
						top: 0;
						left: 0;
						z-index: 2;
						overflow: hidden;
					}
					.two{
						position: relative;
						z-index: 1;
						top: 0;
						left: 0;
					}
				}
				>div{
					display: flex;
					justify-content: space-between;
					margin-top: 0.05rem;
					margin-bottom: 0.05rem;
					.grade{
						color: #FF9900;
						font-weight: bold;
					}
				}
				p{
					margin-top: 0.05rem;
					font-size: 0.1rem;
				}
			}
		}
	}
	>p{
		text-indent: 0.24rem;
		line-height: 0.24rem;
		margin: 0.1rem;
	}
	footer {
		a{
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #009CDC;
			color: #fff;
			font-size: 0.13rem;
			font-weight: bold;
			border-radius: none;
			height: 0.45rem;
			line-height: 0.45rem;
			text-align: center;
			cursor: pointer;
		}
		a:link {color: #fff;}      
		a:visited {color: #fff;}
	}
}

</style>