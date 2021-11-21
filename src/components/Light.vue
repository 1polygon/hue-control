<template>
    <div class="light">
        <div class="name">{{ this.name }}</div>
        <Toggle class="toggle" :checked="this.state.on" @click="toggle" />
    </div>
</template>

<script>
import Toggle from "./Toggle";
import HueStore from "../store/hue";

export default {
    components: {
        Toggle,
    },
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    setup() {},
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

.name {
    font-size: 0.8em;
    font-weight: bold;
}

.toggle {
    margin-top: 1em;
}
</style>