<template>
	<div class="reg">
		<nav>
			<mt-header title="注册页" >
			  <router-link to="/" slot="left">
			     <mt-button icon="back"></mt-button>
			  </router-link>
			  <router-link to="/" slot="right">
			 	 <mt-button>登录</mt-button>
			  </router-link>
			</mt-header>
		</nav>
		
		<div class="reg_from">
			<label class="one">
				<input type="text" v-model="data.id"  placeholder="请输入用户名" @input="Phone()"/>
				<div v-if='box'>
					<span class="flag" v-if='flag'>
						未被占用
					</span>
					<span class="flag1" v-else>
						该账户已被占用
					</span>
				</div>
			</label>
    		<label><input type="password" v-model="data.pwd"  placeholder="请输入密码" /></label>
    		<label><input type="password" v-model="pwds"  placeholder="请确认密码" /></label>
		</div>
		
		<div class="checkbox">
			<input type="checkbox" name="" id="" v-model="checkbox" />
			<label>我已阅读并同意《格莱科技用户协议》</label>
		</div>
		<div class="from" @click='from()'>
			<mt-button type="primary">立即注册</mt-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				data: {
					id: '',
					pwd: '',
					seat: ''
				},
				pwds: '',
				checkbox: false,
				flag: true,
				box: false
			}
		},
		methods: {
			from(){
//				alert(1234)
				
				if(this.data.pwd==this.pwds && this.checkbox && this.flag &&this.data.id != '' && this.data.pwd!=''){
					this.$http.post('/reg',this.data).then(res=>{
						let timer = this.$toast('注册成功');
						setTimeout(()=>{
							timer.close()
						},1000)
					})
					this.$router.push({path: './login', query: {data: this.data}});
					
				}else if(!this.flag){
					
					this.$messagebox('提示','用户名已被占用')
				}else if(this.data.id == '' && this.data.pwd ===''){
					this.$messagebox('提示','用户名或密码为空')
				}else if(!this.checkbox){
					this.$messagebox('提示','请先阅读协议并选择是否同意')
				}
				else{
					this.$messagebox('提示','密码不一致')
				}
					
			},
			Phone(){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.$http.post('/login?reg=123',{id: this.data.id}).then(res=>{
						this.box = true
						this.flag = !res.data
						
					},err=>{
						this.$toast("网络异常")
					})
				},700)
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.reg{
		background-color: #F0F3F9;
		height: 100%;
		nav .mint-header {
			background-color: #076FA2;
			margin-bottom: 0.1rem;
		}
		.reg_from{
			input{
				width: 100%;
				display: block;
				height: 0.35rem;
				padding: 0.1rem;
				margin-top: 0.05rem;
				border: none;
				background-color: #fff;
			}
			.one{
				position: relative;
				span{
					position: absolute;
					top: -0.14rem;
					right: -3.1rem;
				}
				.flag{
					color: #0074E8;
				}
				.flag1{
					color: red;
				}

			}
		}
		.checkbox{
			height: 0.30rem;
			line-height: 0.30rem;
			padding: 0.1rem;
		}
		.from .mint-button{
			width: 100%;
			height: 0.4rem;
			margin-top: 0.1rem;
			background-color: #076FA2;
			
		}
	}
</style>