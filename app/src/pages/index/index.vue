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
				:current="swiperCurrent">
				<swiper-item v-for="item in swiperImg" :key="item.id">
					<image class="swiper-item" :src="item.image_url" mode="scaleToFill" @tap="jumpUrl(item)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 折扣试用 -->
		<view class="try-task__warpper flex_layout">
			<view class="left" v-for="item in leftArr" :key="item.id">
				<image
					class="img_wrap"
					:src="item.paiPicUrl"
					mode="widthFix"
					lazy-load="false">
				</image>
				<view class="desc-wrap">
					<view class="title fz-13">{{ item.title }}</view>
					<view class="tool_wrap flex_layout_b">
						<text class="prize fz-13">{{ item.paiPrice }}</text>
						<button class="btn fz-13">免费试用</button>
					</view>
				</view>
			</view>
			<view class="right" v-for="item in rightArr" :key="item.id">
				<image
					class="img_wrap"
					:src="item.paiPicUrl"
					mode="widthFix"
					lazy-load="false">
				</image>
				<view class="desc-wrap">
					<view class="title fz-13">{{ item.title }}</view>
					<view class="tool_wrap flex_layout_b">
						<text class="prize fz-13">{{ item.paiPrice }}</text>
						<button class="btn fz-13">免费试用</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/api';

	export default {
		data() {
			return {
				title: 'Hello',
				swiperImg: [],
				swiperCurrent: 1,
				params: {
					page: 1,
					pageSize: 10
				},
				leftArr: [],
				rightArr: []
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			// 获取首页数据
			async loadData() {
				const res = await api.home.taskList(this.params);
				this.swiperImg = res.data.list;
				this.swiperImg.forEach((_, index) => {
					if (index % 2 == 0) {
						this.leftArr.push(_);
					} else {
						this.rightArr.push(_);
					}
				});
			}
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
