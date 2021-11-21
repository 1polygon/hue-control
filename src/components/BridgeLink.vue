<template>
    <div class="wrapper">
        <div v-if="state == 'discover'">
            <h2>Searching Hue-Bridge</h2>
            <Spinner class="loading" :strokeWidth="2" />
        </div>
        <div v-else-if="state == 'notfound'">
            <h2>Hue-Bridge not found</h2>
            <div class="btn" @click="discover">Search again</div>
        </div>
        <div v-else-if="state == 'authorize' || state == 'pair'">
            <h2>Connect Hue-Bridge</h2>
            <div class="bridge">
                <div class="bridge-lights">
                    <div />
                    <div />
                    <div />
                </div>
                <div class="btn-pair" @click="pair">
                    <span v-if="state == 'pair'">...</span>
                    <span v-else>Connect</span>
                </div>
            </div>
        </div>
        <div class="error" v-if="error">{{ this.error }}</div>
    </div>
</template>

<script>
import BridgeStore from "../store/bridge";
import Spinner from "./Spinner.vue";

const states = {
    Discover: "discover",
    Authorize: "authorize",
    Pair: "pair",
    NotFound: "notfound",
};

export default {
    name: "App",
    components: {
        Spinner,
    },
    mounted() {
        this.discover();
    },
    data() {
        return {
            store: BridgeStore,
            state: states.Discover,
            error: "",
        };
    },
    methods: {
        async discover() {
            this.state = states.discover;
            const bridge = await BridgeStore.Discover();
            if (bridge) this.state = states.Authorize;
            else this.state = states.NotFound;
        },
        async pair() {
            this.state = states.Pair;
            const user = await BridgeStore.Authorize();
            if (!user)
                this.error =
                    "Bridge Link failed. Please press the link button on your Hue-Bridge and try again.";
            else this.error = "";
            this.state = states.Authorize;
        },
    },
};
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    margin: 2em;
}

.bridge {
    position: relative;
    background-color: whitesmoke;
    width: 300px;
    height: 300px;
    border-radius: 50px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bridge-lights {
    position: absolute;
    width: 130px;
    left: 50%;
    top: 2.5em;
    display: flex;
    justify-content: space-around;
    transform: translateX(-50%);
}
.bridge-lights > div {
    height: 5px;
    width: 5px;
    border-radius: 10px;
    background-color: rgb(0, 162, 255);
    box-shadow: 0 0 5px rgba(0, 162, 255, 1);
}
.btn-pair {
    border: 2px solid rgb(0, 162, 255);
    box-shadow: 0 0 25px rgba(0, 162, 255, 0.3);
    height: 100px;
    width: 100px;
    text-align: center;
    line-height: 100px;
    border-radius: 200px;
    color: rgb(160, 160, 160);
    cursor: pointer;
}
.error {
    background-color: rgba(255, 106, 106, 0.11);
    color: rgb(255, 88, 88);
    padding: 1em;
    margin-top: 2em;
    border-radius: 7px;
    font-size: 0.9em;
}
.wrapper > div {
    animation: fade .25s ease-in-out;
}
</style>
