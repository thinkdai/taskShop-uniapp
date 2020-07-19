<template>
	<view class="page">
		<!-- banner区域 -->
		<view class="banner__warpper">
			<swiper 
				class="swiper" 
				:autoplay="true" 
				:interval="3000" 
				:duration="1000"
				:circular="true" 
				:current="swiperCurrent" 
				@change="changeSwiper"
				@transition="transitionSwiper">
				<swiper-item v-for="item in swiperImg" :key="item.id">
					<image class="swiper-item" :src="item.image_url" mode="scaleToFill" @tap="jumpUrl(item)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 折扣试用 -->
		<view class="try-task__warpper flex_layout">
			<view class="left">
				<image
					class="img_wrap"
					src="/static/image/me/test.jpg"
					mode="widthFix"
					lazy-load="false">
				</image>
				<view class="desc-wrap">
					<view class="title fz-13">polo衫直降,快来买</view>
					<view class="tool_wrap flex_layout_b">
						<text class="prize fz-13">$2.5</text>
						<button class="btn fz-13">免费试用</button>
					</view>
				</view>
			</view>
			<view class="right">
				<image
					class="img_wrap"
					src="/static/image/me/test1.jpg"
					mode="widthFix"
					lazy-load="false">
				</image>
				<view class="desc-wrap">
					<view class="title fz-13">polo衫直降,快来买</view>
					<view class="tool_wrap flex_layout_b">
						<text class="prize fz-13">$2.5</text>
						<button class="btn fz-13">免费试用</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				swiperImg: [{
					id: 1,
					image_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593364559547&di=5af0b26d071a711ea2c72fe973caadc3&imgtype=0&src=http%3A%2F%2Fimglf3.nosdn.127.net%2Fimg%2FL0lHRjFqbkVQa2pIQXFwYWE2WUd6Q3A4dUN5aFJhZlBOaTd0b3VDVFlQNUNTeGpQUGpZbGF3PT0.jpg%3FimageView%26thumbnail%3D1680x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg%257Cwatermark%26type%3D2%26text%3Dwqkg',
					url: ''
				}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.page {
	background-color: #f6f6f6;
	width: 100vw;
	height: 100vh;
}
.banner__warpper {
	.swiper {
		width: 690rpx;
		height: 240rpx;
		border-radius: 8rpx;
		overflow: hidden;
		margin-top: 20rpx;
		position: relative;
		margin: 0 auto;
		.swiper-item {
			width: 690rpx;
			height: 240rpx;
			border-radius: 8rpx;
		}
	}
}
.try-task__warpper {
	width: 100vw;
	padding: 30rpx 30rpx 0;
	box-sizing: border-box;
	align-items: flex-start;
	border-radius: 10rpx;
	.left, .right {
		flex: 1;
		background-color: #fff;
		padding: 10rpx;
		box-sizing: border-box;
		.img_wrap {
			width: 100%;
		}
		.desc-wrap {
			margin-top: 10rpx;
			.title {
				line-height: 30rpx;
				color: #777;
			}
		}
		.tool_wrap {
			margin-top: 20rpx;
			.prize {
				color: #f63a00;
			}
			.btn {
				display: inline-block;
				padding: 12rpx 16rpx;
				background-color: #FCE2E4;
				border-radius: 4rpx;
				font-weight: normal;
				border: 1px solid #FCE2E4;
				color: #f63a00;
				line-height: 1;
			}
		}
	}
	.right {
		margin-left: 20rpx;
	}
}
</style>
