<template>
    <div class="fade">
        <header>
            <h2>Lights</h2>
            <div class="btn-refresh" @click="refresh" />
        </header>
        <div class="lights">
            <Light
                v-for="light in store.state.lights"
                :key="light.id"
                :data="light"
            />
        </div>
    </div>
</template>

<script>
import HueStore from "../store/hue";
import Light from "./Light.vue";

export default {
    name: "App",
    components: { Light },
    async mounted() {
        const lights = await HueStore.GetLights();
        console.log(lights);
    },
    data() {
        return {
            store: HueStore,
        };
    },
    methods: {
        refresh() {
            HueStore.GetLights();
        },
    },
};
</script>

<style scoped>
header {
    display: flex;
}
header h2 {
    flex: 1;
}
.btn-refresh {
    background-image: url("~@/assets/refresh.svg");
    height: 20px;
    width: 20px;
    margin-top: 0.3em;
    cursor: pointer;
}
.lights {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1em 1em;
}
.lights > div {
}
</style>>
