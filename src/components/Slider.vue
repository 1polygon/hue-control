<template>
    <div class="wrapper">
        <div
            ref="slider"
            :class="{ slider: true, disabled: !this.enabled }"
            @mousedown="mouseDown"
        >
            <div
                class="slide"
                :style="{ width: val * (100 / this.max) + '%' }"
            />
            <div
                class="thump"
                :style="{ left: val * (100 / this.max) + '%' }"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 1.0,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    beforeMount() {
        document.addEventListener("mouseup", this.mouseUp.bind(this));
        document.addEventListener("mousemove", this.mouseMove.bind(this));
        this.val = Math.min(this.max, Math.max(this.val, 0));
    },
    beforeUnmount() {
        document.removeEventListener("mouseup", this.mouseUp);
        document.removeEventListener("mousemove", this.mouseMove);
    },
    data() {
        return {
            val: this.value || 0,
            enabled: !this.disabled,
        };
    },
    watch: {
        value(newValue) {
            this.val = newValue;
        },
        disabled(newValue) {
            this.enabled = !newValue;
        },
    },
    methods: {
        mouseDown(e) {
            this.moving = true;
            this.update(e);
            this.$emit("change", this.val);
        },
        mouseUp() {
            if (this.moving) {
                this.$emit("change", this.val);
                this.moving = false;
            }
        },
        mouseMove(e) {
            if (this.moving) {
                this.update(e);
            }
        },
        update(e) {
            const slider = this.$refs.slider;
            const rect = slider.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / slider.clientWidth;
            this.val = Math.min(this.max, Math.max(nx * this.max, 0));
            this.$emit("change:update", this.val);
        },
    },
};
</script>

<style scoped>
.wrapper {
    margin-top: 1em;
}
.slider {
    position: relative;
    height: 0.3em;
    width: 100%;
    background-color: #353434;
    border-radius: 1em;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
}
.slider.disabled {
    opacity: 0.25;
    pointer-events: none;
}
.slide {
    background: linear-gradient(to right, transparent, rgb(138, 138, 138));
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 1em;
    height: 100%;
}
.thump {
    position: absolute;
    height: 0.7em;
    width: 0.7em;
    background-color: #e2e2e2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 1);
    border-radius: 1em;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>