<template>
	<div class="order">
		<header>
			我的订单
		</header>
		<div class="box"></div>
		<div class="content">
			<div v-for='i in data.movie'>
				<div class='item'>
					<div class="img">
						<img v-bind='{src: pic + i.src}' alt="" />
					</div>
					<div class="info">
						<h3>{{i.name}} {{i.seat.split(',').length}}张</h3>
						<p>购票时间：  {{i.time2}}</p>
						<p>开场时间：  {{i.time}} {{i.time1}}</p>
						<p>地点位置： {{i.place}}{{i.seat}}</p>
					</div>
				</div>
				<div class="bottom">
					<p>总价：   {{i.price}}元</p>
					<p>已完成</p>
				</div>
			</div>
		</div>
		<div v-if="flag">
			<p>您还未登录哦！</p>
		</div>
		<p v-if='flag1'>您还未购买电影票哦！</p>
		<my-footer type='order'></my-footer>
	</div>
	
</template>

<script>
	export default {
		data(){
			return {
				flag: false,
				flag1: false,
				data: ''
			}
		},
		methods: {
			timeX(i){
				let arr = i.time.split('/')
				return arr[1] + '月' +arr[2] + '日'
			}
		},
		created(){
			if(sessionStorage.getItem('user')){
				this.$http.post('/login?data=123',{id: sessionStorage.getItem('user')}).then(res=>{
					if(res.data){
						this.data = res.data
						if(this.data.movie.length != 0)
						{
							
						}else{
							this.flag1 = true
						}
					}
					
				},err=>{
					this.$toast("网络异常")
				})
			}else{
				this.$messagebox.confirm('请先登录哦！','提示').then(()=>{
					this.$router.push('/login');
				})
				this.flag = true
			}
			
		}
	}
</script>

<style scoped="scoped" lang="less">
@btnBg: #076FA2; 
@btnClo: #fff;
.order{
	header{
		background-color: @btnBg;
		color: @btnClo;
		text-align: center;
		height: 0.4rem;
		line-height: 0.4rem;
		font-size: 0.14rem;
		font-weight: 500;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
	}
	.box{
		height: 0.4rem;
	}
	.content{
		>div{
			margin-top: 0.1rem;
			background-color: #fff;
			.item{
				display: flex;
				padding: 0.1rem;
				border-bottom: 1px solid #ccc;
				.img{
					width: 25%;
					img{
						width: 100%;
					}
				}
				.info{
					padding-left: 0.05rem;
					padding-right: 0.05rem;
					h3{
						font-size: 0.13rem;
						padding-bottom: 0.15rem;
					}
					p{
						padding-top: 0.04rem;
						width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			.bottom{
				display: flex;
				justify-content: space-between;
				padding: 0.1rem;
			}
		}
	}
}
</style>