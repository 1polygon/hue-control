<template>
    <div class="light">
        <div class="row">
            <div class="name">{{ this.name }}</div>
            <Toggle class="toggle" :checked="this.state.on" @click="toggle" />
        </div>
        <Slider
            :value="this.state.bri"
            :max="255"
            :disabled="!this.state.on"
            @change="brightnessChange"
        />
    </div>
</template>

<script>
import Toggle from "./Toggle";
import Slider from "./Slider.vue";
import HueStore from "../store/hue";

export default {
    components: {
        Toggle,
        Slider,
    },
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            name: this.data.name,
            state: this.data.state,
        };
    },
    watch: {
        data(val) {
            this.name = val.name;
            this.state = val.state;
        },
    },
    methods: {
        toggle() {
            HueStore.SetLightState(this.data.id, { on: !this.state.on });
        },
        brightnessChange(val) {
            const bri = Math.round(val);
            if (bri != this.lastBri) {
                HueStore.SetLightState(this.data.id, { bri: bri });
                this.lastBri = bri;
            }
        },
    },
};
</script>

<style scoped>
.light {
    background-color: rgb(30, 30, 30);
    border-radius: 7px;
    padding: 1em;
    box-sizing: border-box;
}
.row {
    display: flex;
    padding-bottom: 0.25em;
}
.name {
    font-size: 0.8em;
    font-weight: bold;
    flex: 1;
}
</style>