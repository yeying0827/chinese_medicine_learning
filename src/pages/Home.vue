<template>
	<h2>中医说</h2>
	<div class="catalog">
		<template v-for="menu in menus">
			<router-link 
			class="cat-item" 
			active-class="active" 
			:to="menu.path" 
			v-if="menu.path"
			>{{ menu.name }}</router-link>
		</template>
	</div>
</template>

<script setup>
	const menus = [
		{path: '/eight-trigrams', name: '易经八卦'},
		{path: '/five-talks', name: '五行说'},
	];
</script>

<style lang="less" scoped>
.catalog {
	display: flex;
	flex-direction: column;
}

.cat-item {
	display: inline-block;
	width: 300px;
	height: 30px;
	padding: 10px 0;
	background: linear-gradient(to right, #249d24, #3f3fe4);
	border-radius: 4px;
	color: #fff;
	font-weight: bold;
	cursor: pointer;

	& + .cat-item {
		margin-top: 10px;
	}
}
</style>