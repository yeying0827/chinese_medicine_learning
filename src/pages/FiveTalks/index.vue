<template>
	<h3>五行说</h3>
	<ul class="five-tabs">
		<li v-for="item in FIVES" :order="item.order" class="five-item" :class="{'active': active === item.order}" @click="change(item.order)">{{ item.name }}</li>
	</ul>
	<canvas id="five-canvas" width="512" height="512"></canvas>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';

const FIVE = {
    MU: 1,
    JIN: 2,
    SHUI: 3,
    HUO: 4,
    TU: 5
};
const FIVES = [
    {order: FIVE.TU,   name: '土'},
    {order: FIVE.HUO,  name: '火'},
    {order: FIVE.MU,   name: '木'},
    {order: FIVE.SHUI, name: '水'},
	{order: FIVE.JIN,  name: '金'},
];
let active = ref(FIVE.TU);

function change(order) {
	active.value = order;
}

let five = [
    {order: FIVE.JIN,  name: '金', position: [-256 + 30, 0 - 20]},
    {order: FIVE.MU,   name: '木', position: [256 - 30, 0 - 20]},
    {order: FIVE.SHUI, name: '水', position: [0 - 10, - 256 + 34]},
    {order: FIVE.HUO,  name: '火', position: [0 - 10, 256 - 30]},
    {order: FIVE.TU,   name: '土', position: [0 - 10, 0 - 20]},
];

let ctx;
onMounted(() => {
	const canvas = document.querySelector('#five-canvas');
	ctx = canvas.getContext('2d'); // 用于绘制底图
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.scale(1, -1);
	drawFive();
	drawRelationship();
});

watch(active, (val, oldval) => {
	switch(val) {
		case FIVE.TU: 
			five = [
			    {order: FIVE.TU,   name: '土', position: [0 - 10, 0 - 20]},
			    {order: FIVE.HUO,  name: '火', position: [0 - 10, 256 - 30]},
			    {order: FIVE.MU,   name: '木', position: [256 - 30, 0 - 20]},
			    {order: FIVE.SHUI, name: '水', position: [0 - 10, - 256 + 34]},
			    {order: FIVE.JIN,  name: '金', position: [-256 + 30, 0 - 20]},
			]; break;
		case FIVE.HUO:
			five = [
			    {order: FIVE.HUO,  name: '火', position: [0 - 10, 0 - 20]},
			    {order: FIVE.MU,   name: '木', position: [0 - 10, 256 - 30]},
			    {order: FIVE.SHUI, name: '水', position: [256 - 30, 0 - 20]},
			    {order: FIVE.JIN,  name: '金', position: [0 - 10, - 256 + 34]},
			    {order: FIVE.TU,   name: '土', position: [-256 + 30, 0 - 20]},
			]; break;
		case FIVE.MU:
			five = [
			    {order: FIVE.MU,   name: '木', position: [0 - 10, 0 - 20]},
			    {order: FIVE.SHUI, name: '水', position: [0 - 10, 256 - 30]},
			    {order: FIVE.JIN,  name: '金', position: [256 - 30, 0 - 20]},
			    {order: FIVE.TU,   name: '土', position: [0 - 10, - 256 + 34]},
			    {order: FIVE.HUO,  name: '火', position: [-256 + 30, 0 - 20]},
			]; break;
		case FIVE.SHUI:
			five = [
			    {order: FIVE.SHUI, name: '水', position: [0 - 10, 0 - 20]},
			    {order: FIVE.JIN,  name: '金', position: [0 - 10, 256 - 30]},
			    {order: FIVE.TU,   name: '土', position: [256 - 30, 0 - 20]},
			    {order: FIVE.HUO,  name: '火', position: [0 - 10, - 256 + 34]},
			    {order: FIVE.MU,   name: '木', position: [-256 + 30, 0 - 20]},
			]; break;
		case FIVE.JIN:
			five = [
			    {order: FIVE.JIN,  name: '金', position: [0 - 10, 0 - 20]},
			    {order: FIVE.TU,   name: '土', position: [0 - 10, 256 - 30]},
			    {order: FIVE.HUO,  name: '火', position: [256 - 30, 0 - 20]},
			    {order: FIVE.MU,   name: '木', position: [0 - 10, - 256 + 34]},
			    {order: FIVE.SHUI, name: '水', position: [-256 + 30, 0 - 20]},
			]; break;
	}
	drawFive();
	drawRelationship();
});

function drawRelationship() {
    drawBirthRelationship();
    drawOvercomeRelationship();
}

function drawBirthRelationship() {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(110, 0);
    ctx.beginPath();
    drawBirth(ctx);
    ctx.restore();

    ctx.save();
    ctx.rotate((90 * Math.PI) / 180);
    ctx.translate(-100, -20);
    ctx.beginPath();
    drawBirth(ctx);
    ctx.stroke();
    ctx.restore();
}

function drawBirth(context) {
    context.strokeStyle = 'green';
    context.moveTo(-80, 30);
    context.lineTo(70, 30);
    context.stroke();
    context.moveTo(60, 40);
    context.lineTo(90, 30);
    context.lineTo(60, 20);
    context.fillStyle = 'green';
    context.fill();
}

function drawOvercomeRelationship() {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-110, 0);
    ctx.beginPath();
    drawOvercome(ctx);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.rotate((90 * Math.PI) / 180);
    ctx.translate(120, 0);
    ctx.beginPath();
    drawOvercome(ctx);
    ctx.stroke();
    ctx.restore();
}

function drawOvercome(context) {
    context.strokeStyle = 'orange';
    context.moveTo(-73, 20);
    context.lineTo(-35, 47);
    context.lineTo(-14, 31);
    context.lineTo(16, 47);
    context.lineTo(38, 29);
    context.lineTo(56, 48);
    context.lineTo(85, 12);
    context.lineTo(58, 20);
    context.lineTo(38, 2);
    context.lineTo(14, 21);
    context.lineTo(-13, 0);
    context.lineTo(-34, 20);
    context.lineTo(-73, -11);
}

function drawFive() {
	ctx.clearRect(-256, -256, 512, 512);
    for (const item of five) {
        drawText(ctx, item.name, item.position);
    }
}

function drawText(context, text, position) {
    context.save();
    context.fillStyle = "#333";
    context.font = "40px Arial";
    context.textAlign = "center";
    context.scale(1, -1);
    context.fillText(text, ...position);
    context.restore();
}
</script>

<style lang="less" scoped>
.five-tabs {
	display: flex;
	padding: 0;
}
.five-item {
	list-style-type: none;
	background-color: #eb8d9e;
	width: 80px;
	height: 40px;
	line-height: 40px;
	border-radius: 0 20px;
	color: #fff;
	cursor: pointer;

	+ .five-item {
		margin-left: 2px;
	}

	&.active {
		background-color: red;
	}
}
</style>