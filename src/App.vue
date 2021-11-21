<template>
    <main class="fade">
        <BridgeLink v-if="!store.state.user" />
        <Hue v-else />
    </main>
</template>

<script>
import BridgeStore from "./store/bridge";
import BridgeLink from "./components/BridgeLink.vue";
import Hue from "./components/Hue.vue";

export default {
    name: "App",
    components: {
        BridgeLink,
        Hue,
    },
    data() {
        return {
            store: BridgeStore,
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

html,
body {
    background-color: rgb(15, 15, 15);
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

main {
    background-color: rgb(43, 43, 43);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
    color: rgb(196, 196, 196);
    box-sizing: border-box;
    max-width: 600px;
    margin: auto;
    margin-top: 4em;
    padding: 2em;
    border-radius: 15px;
}

h1,
h2,
h3,
h4 {
    margin: 0;
    padding: 0;
    padding-bottom: 1em;
    font-weight: normal;
}

.btn {
    display: inline-block;
    background-color: rgb(133, 77, 170);
    padding: 0.85em 1em 0.85em 1em;
    font-size: 0.8em;
    font-weight: bold;
    border-radius: 7px;
    cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.fade {
  animation: fade .25s ease-in-out;
}
</style>
