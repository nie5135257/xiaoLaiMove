<template>
	<div class="login">
		<div class="img">
			<img src="../assets/img/LOGO.png" alt="" />
		</div>
		<div class="user">
			<input type="text" v-model="data.id" placeholder="请输入用户名"/>
			<input type="password" v-model='data.pwd' placeholder="请输入密码"/>
		</div>
		<div class='btn' @click='from'>
			<mt-button type="default">登录</mt-button>
		</div>
		<footer>
			<router-link to='/reg'>
				还没账号
			</router-link>
			<router-link to='/'>
				暂不登录
			</router-link>
		</footer>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				data:{
					id: '',
					pwd: ''
				}
			}
		},
		methods: {
			from(){
				this.$http.post('/login',this.data).then(res=>{
					if(res.data){
						let timer = this.$toast('登录成功')
						setTimeout(()=>{
							timer.close()
						},1000)
						
						sessionStorage.setItem('user',this.data.id)
						this.$router.push({path: './', query: {data: this.data}});
					}else{
						this.$messagebox('提示','用户名或密码错误')
						this.data.id = ''
						this.data.pwd = ''
					} 
					
				},err=>{
					this.$toast("网络异常")
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@btnBg: #076FA2; 
	@btnClo: #fff;
	.login{
		.img{
			width: 100%;
			height: 100%;
			padding-top: 0.6rem;
			margin-bottom: 0.2rem;
			img{
				width: 1rem;
				display: block;
				margin: 0 auto;
			}
		}
		.user{
			input {
				width: 100%;
				height: 0.4rem;
				border: none;
				border-bottom: 1px solid #ccc;
				margin-top: 0.1rem;
				text-align: center;
				background-color: #F0F3F9;
				color: #909090;
			}
		}
		.btn{
			.mint-button {
				margin-top: 0.2rem;
				width: 100%;
				background-color: @btnBg;
				color: @btnClo;
				height: 0.5rem;
			}
		}
		footer{
			display: flex;
			justify-content: space-between;
			a{
				font-size: 0.1rem;
				margin: 0.05rem;
				color: #909090;
			}
		}
	}
</style>