<template>
    <div class="qr-page">
        <p style="color: red">{{ error }}</p>

        <p>Last result: <b>{{ result }}</b></p>

        <div class="camera-view" style="border: 2px solid black">
            <qrcode-stream :formats="['qr_code', 'code_128']"
                :constraints="{ facingMode, aspectRatio }" 
                :track="paintBoundingBox" 
                @error="onError"
                @detect="onDetect"
            >
                <button @click="switchCamera">
                    <img src="../assets/camera-switch.svg" alt="switch camera" />
                </button>
                <div class="qr-box">
                    
                </div>
            </qrcode-stream>
        </div>
        {{ resultQrText }}
        {{ resultDecodeQrText }}
        <div id="qr-code-full-region" style="width: 100%;"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { Html5QrcodeScanner, Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"
import { defineEmits } from 'vue'

const emit = defineEmits(['result'])
const result = ref('')
const error = ref('')
const facingMode = ref('environment')
const aspectRatio = ref(4/3)
const height = ref('50%')
const qrbox = ref({
    type: Number,
    default: 250
})
const fps = ref({
    type: Number,
    default: 10
})
const resultQrText = ref('')
const resultDecodeQrText = ref()

onMounted(() => {
    initCamera()
})

const initCamera = () => {
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            var cameraId = devices[0].id;
            const html5QrCode = new Html5Qrcode("qr-code-full-region", { formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE] });
            html5QrCode.start(
                cameraId,
                {
                    fps: 10,    // Optional, frame per seconds for qr code scanning
                    qrbox: { width: 250, height: 250 },  // Optional, if you want bounded box UI
                    videoConstraints: { facingMode: "environment" },
                },
                (decodedText, decodedResult) => {
                    // do something when code is read
                    resultQrText.value = decodedText
                    resultDecodeQrText.value = decodedResult
                },
                (errorMessage) => {
                    // parse error, ignore it.
                })
                .catch((err) => {
                    // Start failed, handle it.
                });
        }
    }).catch(err => {
        // handle err
    });
}

const onScanSuccess = (decodedText, decodedResult) => {
    emit('result', decodedText, decodedResult)
}

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
.qr-page .camera-view {}

.qr-box {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid red;
    text-align: center;
    width: 200px;
    height: 200px;
}

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