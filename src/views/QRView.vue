<template>
    <div class="qr-page">
        <h1>Simple Demo2</h1>

        <p style="color: red">{{ error }}</p>

        <p>Last result: <b>{{ result }}</b></p>

        <div style="border: 2px solid black">
            <qrcode-stream :constraints="{ facingMode }" :track="paintBoundingBox" @detect="onDetect" @error="onError">
                <button @click="switchCamera">
                    <img src="../assets/camera-switch.svg" alt="switch camera" />
                </button>
            </qrcode-stream>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const result = ref('')
const error = ref('')
const facingMode = ref('environment')

const switchCamera = () => {
    switch (facingMode.value) {
        case 'environment':
            facingMode.value = 'user'
            break
        case 'user':
            facingMode.value = 'environment'
            break
    }
}

function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
    }
}

function onError(err) {
    const triedFrontCamera = facingMode.value === 'user'
    const triedRearCamera = facingMode.value === 'environment'

    const cameraMissingError = err.name === 'OverconstrainedError'

    if (triedRearCamera && cameraMissingError) {
        this.noRearCamera = true
    }

    if (triedFrontCamera && cameraMissingError) {
        this.noFrontCamera = true
    }

    console.error(err)
    error.value = `[${err.name}]: `

    if (err.name === 'NotAllowedError') {
        error.value += 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
        error.value += 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
        error.value += 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
        error.value += 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
        error.value += 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
        error.value += 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
        error.value += 'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
        error.value += err.message
    }
}

function onDetect(detectedCodes) {
    result.value = JSON.stringify(
        detectedCodes.map(code => code.rawValue)
    )
}

</script>

<style scoped>
button {
    position: absolute;
    left: 10px;
    top: 10px;
}

button img {
    width: 50px;
    height: 50px;
}

.error {
    color: red;
    font-weight: bold;
}
</style>