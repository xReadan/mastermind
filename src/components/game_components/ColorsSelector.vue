<template>
    <div class="color-selector">
        <div v-for="(item, index) in colors" :key="item.key" class="color-button" :style="{ backgroundColor: item.color }"
            @click="$emit('colorClicked', index)" draggable="true" @dragstart="startDrag($event, item)">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        colors: Array
    },
    methods: {
        startDrag(event, item) {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            // Send dragged item data
            event.dataTransfer.setData('item', JSON.stringify(item))
        },
    }
}
</script>

<style scoped>
.color-selector {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 20px;
    width: 600px;
    height: 66px;
    background-size: cover;
    text-align: center;
}

.color-button {
    width: 66px;
    height: 66px;
    border-radius: 5px;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.2);
    display: inline-block;
    margin: 0 4px;
    cursor: pointer;
}
</style>