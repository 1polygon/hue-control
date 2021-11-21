<template>
    <div
        :class="{ toggle: true, disabled: enabled == false }"
        v-on:click="toggle"
    >
        <div :class="{ switch: true, checked: value }"></div>
    </div>
</template>

<script>
export default {
    props: ["checked", "enabled", "locked"],
    setup() {},
    data() {
        return {
            value: this.checked,
        };
    },
    watch: {
        checked(val) {
            this.value = val;
        },
    },
    methods: {
    },
};
</script>

<style scoped>
.toggle {
    height: 1em;
    width: 2em;
    padding: 3px;
    border-radius: 2em;
    background-color: #353434;
    cursor: pointer;
}
.switch {
    height: 1em;
    width: 1em;
    background-color: #9f9f9f;
    border-radius: 1em;
    transition: all 0.2s ease-in-out;
}
.checked {
    background-color: #53c534;
    transform: translateX(100%);
}
</style>