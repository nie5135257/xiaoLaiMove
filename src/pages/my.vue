<template>
	<div class="my">
		<header>
			我的
		</header>
		<div class="box"></div>
		<div class="content">
			<div class="one">
				<p>
					<span>我的订单</span>
					<span></span>
				</p>
				<p>
					<span>优惠卷</span>
					<span></span>
				</p>
				<p>
					<span>影院会员卡</span>
					<span></span>
				</p>
			</div>
			
			<div class="two">
				<p>
					<span>想看的电影</span>
					<span></span>
				</p>
				<p>
					<span>看过的电影</span>
					<span></span>
				</p>
			</div>
		</div>
		<mt-button type="default" @click='$router.push("/login");'>点击退出</mt-button>
		<div class="img">
			<img src="../assets/img/LOGO_gray.png" alt="" />
			<p>客服电话：027-87229009</p>
		</div>
		<my-footer type='uder'></my-footer>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang='less'>
@btnBg: #076FA2; 
@btnClo: #fff;
.my{
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
		div{
			margin-top: 0.1rem;
			p{
				padding: 0.12rem;
				display: flex;
				justify-content: space-between;
				background-color: #fff;
				border-bottom: 1px solid #F3F3F3;
				cursor: pointer;
				span:last-child{
					width: 0.06rem;
					background: url(../assets/img/left_gray.png) no-repeat center;
					background-size: 100%;
				}
			}
		}
		
	}
	.mint-button{
		margin: 1%;
		margin-top: 0.15rem;
		width: 98%;
		background-color: @btnBg;
		color: @btnClo;
		height: 0.5rem;
	}
	.img{
		margin-top: 0.8rem;
		color: #AEAEAE;
		text-align: center;
	}
}
</style>