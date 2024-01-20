<template>
	<h3>易经八卦</h3>
	<div id="eight-trigrams">
		<div class="item" v-for="index in indexes">
            <input :id="`radio_${ index }`" type="radio" name="checkedTrigram" :value="eightTrigrams[index].value" hidden>
            <label class="show-image" :for="`radio_${ index }`">
                <div class="card card-front">{{ eightTrigrams[index].text }}</div>
                <div class="card card-back"></div>
            </label>
       </div>
	</div>
	<canvas id="trigrams-canvas" width="512" height="512"></canvas>
</template>

<script setup>
import {onMounted} from 'vue';

const eightTrigrams = [
    { text: '乾', value: '1,1,1' },
    { text: '兑', value: '0,1,1' },
    { text: '离', value: '1,0,1'},
    { text: '震', value: '0,0,1' },
    { text: '巽', value: '1,1,0' },
    { text: '坎', value: '0,1,0' },
    { text: '艮', value: '1,0,0' },
    { text: '坤', value: '0,0,0' },
];

function convert() {
    const nums = [];
    let num;
    for (let i = 0; i < 8; i ++) {
        num = Math.floor(Math.random() * 8);
        num = check(num, nums);
        nums.push(num);
    }
    return nums;
}

function check(num, nums) {
    if (nums.indexOf(num) !== -1) {
        num = num + 1;
        if (num === 8) num = 0;
        return check(num, nums);
    } else {
        return num;
    }
}

const indexes = convert();

let ctx;
onMounted(() => {
	const canvas = document.querySelector('#trigrams-canvas');
	ctx = canvas.getContext('2d');
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.scale(1, -1);
	initEvent();
});

function initEvent() {
    const ul = document.querySelector('#eight-trigrams');
    ul.addEventListener('click', e => {
        const target =  e.target;
        if (target.tagName === 'INPUT' && target.checked) {
            const value = target.value;
            draw(value.split(',').map(flag => Number(flag)));
        }
    });
}

function draw(lines) {
    ctx.clearRect(-256, -256, 512, 512);
    drawTop(lines[0]);
    drawMiddle(lines[1]);
    drawBottom(lines[2]);
}

function drawTop(flag) {
    if (flag) drawPositive([256, 256 - 51.2 * 2]);
    else drawNegative([256, 256 - 51.2 * 2]);
}

function drawMiddle(flag) {
    if (flag) drawPositive([256 - 51.2 * 4, 256 - 51.2 * 6]);
    else drawNegative([256 - 51.2 * 4, 256 - 51.2 * 6]);
}

function drawBottom(flag) {
    if (flag) drawPositive([256 - 51.2 * 8, 256 - 51.2 * 10]);
    else drawNegative([256 - 51.2 * 8, 256 - 51.2 * 10]);
}

// 绘制阳爻
function drawPositive(yPos = [256, 256 - 51.2 * 2]) {
    ctx.beginPath();
    ctx.moveTo(-256, yPos[0]);
    ctx.lineTo(256, yPos[0]);
    ctx.lineTo(256, yPos[1]);
    ctx.lineTo(-256, yPos[1]);
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();
}

// 绘制阴爻
function drawNegative(yPos = [256, 256 - 51.2 * 2]) {
    ctx.beginPath();
    ctx.moveTo(-256, yPos[0]);
    ctx.lineTo(-28, yPos[0]);
    ctx.lineTo(-28, yPos[1]);
    ctx.lineTo(-256, yPos[1]);
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(28, yPos[0]);
    ctx.lineTo(256, yPos[0]);
    ctx.lineTo(256, yPos[1]);
    ctx.lineTo(28, yPos[1]);
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();
}
</script>

<style scoped>
#trigrams-canvas {
    margin-top: 40px;
    width: 300px;
    height: 300px;
}

#eight-trigrams {
    display: flex;
    width: 450px;
    justify-content: space-around;
    flex-wrap: wrap;
}

#eight-trigrams .item:nth-child(-n + 4) {
    margin-bottom: 10px;
}

#eight-trigrams .show-image {
    display: block;
    position: relative;
    width: 100px;
    height: 150px;
    transform-style: preserve-3d;
    cursor: pointer;
}

.card {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(100, 100, 100, .5);
    background-color: #f9f9f9;
}

.card-back {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../assets/bg.webp");
    background-size: 100px 100px;
    background-position: center;
    background-repeat: no-repeat;
}

.card-front {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    transform: rotateY(180deg) translateZ(1px);
}

input[type="radio"]:checked + .show-image {
    transition: transform .6s ease-in-out,left .6s ease-in-out,top .6s ease-in-out;
    transform: rotateY(180deg);
}
</style>