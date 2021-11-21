<template>
    <div>
        <svg
            class="spinner-svg"
            viewBox="0 0 50 50"
            :style="{ width: size + 'px', height: size + 'px' }"
        >
            <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                :stroke-width="strokeWidth"
            ></circle>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 50,
        },
        strokeWidth: {
            type: Number,
            default: 5,
        },
    },
    setup() {},
};
</script>

<style scoped>
.spinner-svg {
    animation: rotate 2s linear infinite;
}
.spinner-svg .path {
    stroke: rgb(255, 255, 255);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}
</style>