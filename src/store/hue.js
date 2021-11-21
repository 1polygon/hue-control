import { reactive, readonly } from "@vue/reactivity";
import bridge from "../store/bridge";

const state = reactive({
    lights: []
});

async function GetLights() {
    try {
        const res = await fetch(bridge.state.apiUrl + "/lights", { method: "GET" });
        if (res.status == 200) {
            const body = await res.json();
            const lights = [];
            const keys = Object.keys(body);
            keys.forEach(key => {
                const light = body[key];
                light.id = key;
                lights.push(light);
            });
            state.lights = lights;
            return lights;
        }
    } catch (e) {
        console.log(e);
    }

    return null;
}

async function GetLight(id) {
    const res = await fetch(bridge.state.apiUrl + "/lights/" + id, { method: "GET" });
    if (res.status == 200) {
        const body = await res.json();
        return body;
    }
    return null;
}

async function SetLightState(id, state) {
    const res = await fetch(bridge.state.apiUrl + "/lights/" + id + "/state", {
        method: "PUT", body: JSON.stringify(state)
    });
    if (res.status == 200) {
        const body = await res.json();
        GetLights(); // todo -> only update single light
        return body[0];
    }
    return null;
}

export default {
    state: readonly(state),
    GetLights,
    GetLight,
    SetLightState,
}
