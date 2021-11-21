import { reactive, readonly } from "@vue/reactivity";

const discoverUrl = "https://discovery.meethue.com";
const deviceName = "hue-control";

const state = reactive({
    id: "",
    address: "",
    user: "",
    url: "",
    apiUrl: ""
});

async function Discover() {
    try {
        const res = await fetch(discoverUrl, { method: "GET" });
        if (res.status == 200) {
            const body = (await res.json())[0];

            state.id = body.id;
            state.url = "http://" + body.internalipaddress + "/api";
            state.user = localStorage.getItem("bridge.user");
            if(state.user) state.apiUrl = state.url + "/" + state.user;

            return body;
        }
    } catch (e) {
        console.log(e);
    }

    return null;
}

async function Authorize() {
    try {
        const res = await fetch(state.url, {
            method: "POST", body: JSON.stringify({
                devicetype: deviceName
            })
        });
        if (res.status == 200) {
            const body = (await res.json())[0];
            console.log(body);
            if (body.success) {
                state.user = body.success.username;
                state.apiUrl = state.url + "/" + state.user;
                localStorage.setItem("bridge.user", state.user);

                return body.success;
            } else {
                return null;
            }
        }
    } catch (e) {
        console.log(e);
    }

    return null;
}

export default {
    state: readonly(state),
    Discover,
    Authorize
}
