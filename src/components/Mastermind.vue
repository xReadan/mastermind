<script setup>
import ColorsSelector from './game_components/ColorsSelector.vue'
import SolutionRow from './game_components/SolutionRow.vue';
import { COLORS, CORRECT_POSITION_COLOR, CORRECT_COLOR } from '../colors_buttons.js'
</script>

<template>
    <div class="game-table" v-if="app_ready">
        <!-- Solution header -->
        <div class="solution-block">
            <div v-for="item in solution" class="solution-button">
                <div class="solution-button-filled" v-if="show_solution" :style="{ background: item.color }"></div>
                <img src="../assets/question_mark.svg" v-else>
            </div>
        </div>
        <!-- User input -->
        <div v-for="(item, index) in user_solutions" :key="index">
            <SolutionRow :index="index" :input_solution="item" :active="index == current_idx" @inputClicked="inputClicked"
                @solutionSubmitted="checkInputs" @droppedColor="droppedColor" />
        </div>
    </div>
    <ColorsSelector :colors="colors" @colorClicked="colorSelected" />
</template>

<script>
export default {
    data() {
        return {
            app_ready: false,
            colors: COLORS,
            solution: [],
            user_solutions: [],
            show_solution: false,
            current_idx: 9,
            color_selected_index: -1
        }
    },
    methods: {
        colorSelected(index) {
            if (!this.color_selected_index >= 0) {
                this.color_selected_index = index
            }
        },
        inputClicked(index) {
            if (this.color_selected_index >= 0) {
                // Set the color
                this.user_solutions[this.current_idx].solution[index] = this.colors[this.color_selected_index]
                // Reset selected index
                this.color_selected_index = -1
            }
        },
        droppedColor(data) {
            this.user_solutions[this.current_idx].solution[data.index] = data.color
        },
        checkInputs() {
            // Create tmp variable for better handling
            var tmp_user_solution = this.user_solutions[this.current_idx].solution.map((x) => x.id)
            var tmp_real_solution = this.solution.map((x) => x.id)
            // Init black and whites
            var red = 0
            var white = 0
            // Check missing elements and correct guess
            for (var idx in tmp_user_solution) {
                if (tmp_user_solution[idx] == "") {
                    this.$toast.info("Missing input, please fill the colors!", {
                        duration: 2000,
                        position: "top"
                    });
                    return
                } else {
                    if (tmp_user_solution[idx] == tmp_real_solution[idx]) {
                        red++;
                        // Mark as used.
                        tmp_real_solution[idx] = null
                        tmp_user_solution[idx] = null
                    }
                }
            }
            // Check misplaced elemetns 
            for (var idx in tmp_user_solution) {
                if (tmp_user_solution[idx]) {
                    const tmp_index = tmp_real_solution.indexOf(tmp_user_solution[idx]);
                    if (tmp_index !== -1) {
                        white++;
                        // Mark as used.
                        tmp_real_solution[tmp_index] = null;
                    }
                }
            }
            // Final check
            if (red == 4) {
                this.$swal({
                    title: 'Congratulations!',
                    width: 600,
                    padding: '3em',
                    background: '#fff url(https://i.gifer.com/6SSp.gif)',
                    confirmButtonText: "Play Again!",
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Close',
                    showCancelButton: true
                }).then(function (result) {
                    if (result.value) {
                        location.reload()
                    }
                });
                this.show_solution = true
            } else {
                // Fill user feedback
                var input_check_idx = 0
                for (var i = 0; i < red; i++) {
                    this.user_solutions[this.current_idx].check[input_check_idx].color = CORRECT_POSITION_COLOR
                    input_check_idx++
                }
                for (var i = 0; i < white; i++) {
                    this.user_solutions[this.current_idx].check[input_check_idx].color = CORRECT_COLOR
                    input_check_idx++
                }
            }
            // Check tentatives
            if (this.current_idx == 0) {
                this.$swal({
                    title: 'Game Over!',
                    width: 600,
                    padding: '3em',
                    confirmButtonText: "Play Again!",
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Close',
                    showCancelButton: true
                }).then(function (result) {
                    if (result.value) {
                        location.reload()
                    }
                });
            } else {
                this.current_idx--
            }
        }
    },
    mounted() {
        // Create random solution
        for (var x of Array(4).keys()) {
            var random_idx = Math.floor(Math.random() * 8)
            this.solution.push(COLORS[random_idx])
        }
        // Init users solutions
        for (var x of Array(10).keys()) {
            var tmp_solution = []
            var tmp_check = []
            for (var y of Array(4).keys()) {
                // Create unique ids
                var tmp_solution_id = x + "u" + y
                var tmp_check_id = x + "c" + y
                tmp_solution.push({ key: tmp_solution_id, id: '', color: '' })
                tmp_check.push({ key: tmp_check_id, color: '' })
            }
            this.user_solutions.push({ solution: tmp_solution, check: tmp_check })
        }
        this.$nextTick(function () {
            var _self = this;
            // Check keydown event
            window.addEventListener('keypress', (e) => {
                if (e.key == "w") {
                    _self.show_solution = !_self.show_solution;
                }
            });
            // Display app
            setTimeout(() => {
                _self.app_ready = true;
            }, 50);
        });
    }
}
</script>

<style scoped>
.game-table {
    top: 50px;
    position: absolute;
    background: var(--mm-canvas-bg-1);
    width: 600px;
    height: 1232px;
    border-radius: 5px;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.2);
    stroke-width: 1;
    left: 50%;
    transform: translate(-50%, 0);
}

@media only screen and (max-width: 600px) {
    .game-table {
        transform: translate(-25%, 0);
    }
}

.solution-block {
    width: 474px;
    height: 100px;
    border-radius: 5px;
    background: #a2624f;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin: 15px 9px 5px 9px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.solution-button {
    display: inline-block;
    width: 66px;
    height: 66px;
    fill: #121212;
    filter: drop-shadow(0px 5px 1px rgba(0, 0, 0, 0.2));
    /* Custom CSS */
    background-color: rgb(243, 243, 243);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}

.solution-button-filled {
    width: 100%;
    height: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
</style>