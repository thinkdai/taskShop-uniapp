<template>
	<view class="content">
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
		<view class="try-task__warpper">
			<view class="left"></view>
			<view class="right"></view>
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
	.try-task__warpper {
		padding: 20px 30px 0;
	}
}
</style>
