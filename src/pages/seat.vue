<template>
	<div class="seat">
		<header>
			<p>	
				<router-link :to='{path: "/buy", query: {name: $route.query.name, id: $route.query.id, grade: $route.query.grade}}'>
					<img src="../assets/img/left.png" alt="" />
				</router-link>
				影院
			</p>
			<p>
				<span class="one">{{$route.query.name}}</span>
				<span class='two'>今天{{time}}</span>
			</p>
		</header>
		<div class="box"></div>
		<div class="content">
			<div class="top">
				<p>{{$route.query.place}}银幕</p>
			</div>
			<div class="seating">
				<ul>
					<li class="" @click="bg(k)" v-for='(i,k) in 85' :key='k'></li>
				</ul>
			</div>
			<div class="info_seat">
				<div class="icon">
					<p class="one">可选</p>
					<p class="two">已选</p>
					<p class="three">已售</p>
				</div>
				<div class="check">
					<p>已选座位</p>
					<div class="select" >
						<div v-for='i in list1'>
							<p>{{i[0]}}排{{i[1]}}座</p>
							<p class="clo">￥{{$route.query.price}}</p>
							<button @click="del(i)">x</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="box1"></div>
		<footer>
				<button @click='from'>
					￥{{count.toFixed(2)==0 ? '0.00' : count.toFixed(2)}}立即订购
				</button>
		</footer>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				time: '',
				list: [],
				list1: [],
				count: 0,
				movie: []
			}
		},
		methods: {
			timeOne(){
				let flag = new Date().toLocaleString().match(/下午/)
				let x = 0
				if(flag){
					x = 12
				}
				let time = new Date().toLocaleString().match(/(\d{4}|\d{2}|\d)/g)
				this.time = time[1]+'月' + time[2]+'日 ' + (x + Number(time[3])) +':' + time[4] +' 国语2D'
				setInterval(()=>{
					let time = new Date().toLocaleString().match(/(\d{4}|\d{2}|\d)/g)
					this.time = time[1]+'月' + time[2]+'日 ' + (x + Number(time[3])) +':' + time[4] +' 国语2D'
				},1000)
			},
			bg(k){
				let x = k%10+1
				let y = ~~(k/10)+1
				let li = document.getElementsByTagName('li')[k]
				if(li.className == ''){
					this.list1.push([y,x])
					this.count += Number(this.$route.query.price)
					li.className = 'active'
				}else if(li.className == 'active'){
					this.list1 = this.list1.filter(i=>{
						if(i[0]==y&&i[1]==x){
							return false
						}
						return true
					})
					this.count -= Number(this.$route.query.price)
					li.className = ''
				}
			},
			del(arr){
				let k = (arr[0]-1)*10 + arr[1]-1
				let li = document.getElementsByTagName('li')[k]
				li.className = ''
				console.log(li)
				this.list1 = this.list1.filter(i=>{
					if(i[0]==arr[0]&&i[1]==arr[1]){
						return false
					}
					return true
				})
				this.count -= Number(this.$route.query.price)
				
			},
			from(){
				if(sessionStorage.getItem('user')&&this.list1.length!=0){
					let data = this.list.concat(this.list1)
					let name = sessionStorage.getItem('user')
					this.$http.post('/arr?name='+this.$route.query.place, data).then(res=>{
						if(res.data){
						}
					},err=>{
						this.$toast("网络异常")
					})
					
					
					this.$http.post('/login?data=123',{id: sessionStorage.getItem('user')}).then(res=>{
						if(res.data){
							this.movie = res.data.movie
							
							let obj = {
								name: this.$route.query.name,
								place: this.$route.query.place,
								seat: this.list1.map(i=>i = i[0] + '排' +i[1] +'座' ).join(','),
								time: '6月27日',
								time1: this.$route.query.time,
								time2: this.time,
								src: this.$route.query.src,
								price: this.count.toFixed(2)==0 ? '0.00' : this.count.toFixed(2)
							}
							this.movie.push(obj)
							console.log(this.movie)
							this.$http.post('/login?name='+name,{movie: this.movie}).then(res=>{
								console.log(res)
								if(res.data){
									let timer = this.$toast('购买成功')
									setTimeout(()=>{
										timer.close()
									},1000)
									this.$router.push('/order');
								}
								
							},err=>{
								this.$toast("网络异常")
							})
						}
						
					},err=>{
						this.$toast("网络异常")
					})
				}else if(this.list1.length == 0){
					this.$messagebox.confirm('您还没有购票哦！是否跳转','提示').then(()=>{
						this.$router.push('/order');
					})
				}
				else{
					this.$messagebox.confirm('请先登录在购买哦！','提示').then(()=>{
						this.$router.push('/login');
					})
				}
				
			}
		},
		created(){
			this.timeOne()
			
			this.$http.post('/arr',{name: this.$route.query.place}).then(res=>{
				if(res.data){
					this.list = res.data.arr
					for (let i = 0; i < this.list.length; i++) {
						let x = (this.list[i][0]-1)*10 + this.list[i][1]-1
						let li = document.getElementsByTagName('li')[x]
						li.className = 'set'
					}
				}
			},err=>{
				this.$toast("网络异常")
			})
		}
	}
</script>

<style scoped="scoped" lang="less">
@btnBg: #076FA2; 
@btnClo: #fff;
.seat{
	header{
		position: fixed;
		width: 100%;
		z-index: 1;
		p{
			
			background-color: @btnClo;
			color: @btnBg;
			width: 100%;
			font-weight: bold;
			
		}
		p:first-child{
			text-align: center;
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
		p:last-child{
			padding-left: 0.1rem;
			height: 0.55rem;
			span{
				display: block;
			}
			.one{
				font-size: 0.14rem;
				line-height: 0.25rem;
				padding-top: 0.05rem;
			}
			.two{
				font-size: 0.11rem;
				color: #A3A3A3;
				font-weight: 900;
				
			}
		}
	}
	.box{
			height: 0.95rem;
	}
	.content{
		.top{
			width: 100%;
			text-align: center;
			background: url(../assets/img/screen.png) no-repeat center;
			background-size: 40% 100%;
			color: #D8E7EF;
			p{
				font-size: 0.11rem;
				line-height: 0.18rem;
			}
		}
		.seating{
			ul{
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin-top: 0.3rem;
				li{
					list-style-type: none;
					display: inline-block;
					background: url(../assets/img/e_seat.png) no-repeat center;
					background-size: 70%;
					width: 10%;
					margin: 0.02rem 0;
					height: 0.25rem;
				}
				.active{
					background: url(../assets/img/sed_seat.png) no-repeat center;
					background-size: 70%;
				}
				.set{
					background: url(../assets/img/sell_seat.png) no-repeat center;
					background-size: 70%;
				}
			}
		}
		.info_seat{
			margin-top: 0.1rem;
			background-color: #fff;
			.icon{
				display: flex;
				justify-content: center;
				border-bottom: 1px solid #F3F3F3;
				p{
					width: 18%;
					text-align: right;
					margin: 0.1rem;
				}
				.one{
					background: url(../assets/img/e_seat.png) no-repeat left;
					background-size: 40%;
				}
				.two{
					background: url(../assets/img/sed_seat.png) no-repeat left;
					background-size: 40%;
				}
				.three{
					background: url(../assets/img/sell_seat.png) no-repeat left;
					background-size: 40%;
				}
			}
			>p{
				padding: 0.05rem;
			}
			.select{
				display: flex;
				flex-wrap: wrap;
				padding-bottom: 0.04rem;
				div{
					background: url(../assets/img/seat_item.png) no-repeat center;
					background-size: 100%;
					text-align: center;
					width: 22.2%;
					height: 0.4rem;
					position: relative;
					margin: 0.04rem;
					p{
						font-size: 0.1rem;
						width: 100%;
					}
					p:first-child{
						padding-top: 0.08rem;
					}
					.clo{
						color: #FF9900;
					}
					button{
						position: absolute;
						top: 0.04rem;
						right: 0.04rem;
						background-color: #fff;
						border:none;
						font-size: 0.1rem;
						cursor: pointer;
					}
				}
			}
		}
	}
	.box1{
		height: 0.45rem;
	}
	footer {
		button{
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
	}
}
</style>