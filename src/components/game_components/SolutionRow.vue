<template>
    <div class="solution-input-row">
        <div class="solution-input-block">
            <div v-for="(item, index) in input_solution.solution" class="solution-input-button" :key="item.key"
                :style="{ backgroundColor: item.color }" :class="{ enabled: active }" @click="input_clicked(index)">
                <!-- Draggable zone -->
                <div v-if="active" class="solution-draggable-target" @drop="onDrop($event, index)" @dragenter.prevent
                    @dragover.prevent></div>
            </div>
        </div>
        <div class="solution-input-check">
            <div class="solution-check-container">
                <div v-for="(item, index) in input_solution.check" class="solution-check-button-container" :key="item.key">
                    <div class="solution-check-button" :style="{ backgroundColor: item.color }"></div>
                </div>
            </div>
        </div>
        <div class="solution-submit-button" v-if="active" @click="$emit('solutionSubmitted')">
            <div class="solution-submit-button-text">
                SUBMIT
            </div>
            <img src="../../assets/arrow.svg" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        index: Number,
        input_solution: Object,
        active: Boolean
    },
    methods: {
        input_clicked(index) {
            // Check if row is active
            if (this.active) {
                this.$emit('inputClicked', index);
            }
        },
        onDrop(event, index) {
            var dragged_color = JSON.parse(event.dataTransfer.getData('item'));
            this.$emit('droppedColor', { index: index, color: dragged_color })
        }
    },
}
</script>

<style scoped>
.solution-input-row {
    width: 752px;
    display: flex;
    align-items: center;
}

.solution-input-block {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 474px;
    height: 100px;
    border-radius: 5px;
    background: #a2624f;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin: 5px 5px 5px 9px;
}

.solution-input-button {
    width: 66px;
    height: 66px;
    border-radius: 5px;
    background: #422821;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.2);
}

.solution-input-check {
    display: flex;
    width: 95px;
    height: 100px;
    border-radius: 5px;
    background: #a2624f;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin: 5px 9px 5px 4px;
}

.solution-check-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.solution-check-button-container {
    flex-basis: 34%;
    display: flex;
    justify-content: center;
}

.solution-check-button {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background: #422821;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.2);
}

.solution-submit-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 135px;
    height: 66px;
    border-radius: 5px;
    background-color: #422821;
    background-size: cover;
    vertical-align: top;
    margin-left: 17px;
    cursor: pointer;
}

.solution-submit-button-text {
    width: 72px;
    display: inline-block;
    font-family: Roboto;
    font-size: 20px;
    color: #ffffff;
    text-decoration: none solid rgb(255, 255, 255);
    margin-left: 21px;
}

.solution-submit-button img {
    margin-right: 8px;
    width: 28px;
    height: 28px;
    fill: #ffffff;
}

.solution-draggable-target {
    width: 100%;
    height: 100%;
}

.enabled {
    cursor: pointer;
}
</style>