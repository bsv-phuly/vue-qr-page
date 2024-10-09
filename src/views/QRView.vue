<template>
    <div class="qr-page">
        <p style="color: red">{{ error }}</p>
        <!-- <p style="color: red">{{ errorScan }}</p> -->

        <p>
            Last result: <b>{{ result }}</b>
            <!-- Last result: <b>{{ resultScanQrText }}</b> -->
        </p>

        <div class="camera-view" style="border: 2px solid black">
            <!-- <qrcode-stream :formats="['qr_code', 'code_128']"
                :constraints="{ facingMode, aspectRatio }" 
                :track="paintBoundingBox" 
                @error="onError"
                @detect="onDetect"
            >
                <button @click="switchCamera">
                    <img src="../assets/camera-switch.svg" alt="switch camera" />
                </button>
            </qrcode-stream> -->
            <!-- <Qr2 :width="qrWidth" :height="qrHeight" @update:onDecode="onDecode" :isQrScan="isQrScan"></Qr2> -->
            <div id="qr-code-full-region" style="width: 100%;"></div>
        </div>
        <!-- {{ resultQrText }}
        {{ resultDecodeQrText }} -->
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
    Html5QrcodeScanner,
    Html5Qrcode,
    Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import { defineEmits } from "vue";
import Qr2 from "@/components/Qr2.vue";
import { Html5QrcodeScanType } from "html5-qrcode/esm/core";

const emit = defineEmits(["result"]);
const result = ref("");
const error = ref("");
const facingMode = ref("environment");
const aspectRatio = ref(4 / 3);
const height = ref("50%");
const qrbox = ref({
    type: Number,
    default: 250,
});
const fps = ref({
    type: Number,
    default: 10,
});
const resultQrText = ref("");
const resultDecodeQrText = ref();
const qrWidth = ref();
const qrHeight = ref();
const isQrScan = ref(true);
const resultScanQrText = ref("");
const errorScan = ref("");

onMounted(() => {
    // initCamera();
    initCamera3();
});

const initCamera = () => {
    Html5Qrcode.getCameras()
        .then((devices) => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
                var cameraId = devices[0].id;
                const html5QrCode = new Html5Qrcode("qr-code-full-region", {
                    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                });
                html5QrCode
                    .start(
                        cameraId,
                        {
                            fps: 10, // Optional, frame per seconds for qr code scanning
                            qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
                            videoConstraints: { facingMode: "environment" },
                        },
                        (decodedText, decodedResult) => {
                            // do something when code is read
                            resultQrText.value = decodedText;
                            resultDecodeQrText.value = decodedResult;
                        },
                        (errorMessage) => {
                            // parse error, ignore it.
                            console.log(errorMessage, 'errorMessage')
                        }
                    )
                    .catch((err) => {
                        // Start failed, handle it.
                        console.log(err, 'err')
                    });
            }
        })
        .catch((err) => {
            // handle err
        });
};

const initCamera2 = () => {
    let config = {
        fps: 10,
        qrbox: {
            width: 250,
            height: 250
        },
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-code-full-region", config, false);
    html5QrcodeScanner.render(onScanSuccess, onScanError);

    setTimeout(() => {
        const readerElement = document.getElementById('qr-shaded-region');
        const overlay = document.createElement('div');
        overlay.className = 'qr-overlay';
        overlay.innerHTML = `
                <div class="scanning-line"></div>
            `;
        readerElement.appendChild(overlay);
    }, 5000);
}

const initCamera3 = () => {
    Html5Qrcode.getCameras()
        .then((devices) => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            console.log(devices, 'devices')
            if (devices && devices.length) {
                var cameraId = devices[0].id;
                console.log(cameraId)
                const html5QrCode = new Html5Qrcode("qr-code-full-region", {
                    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                });
                console.log(html5QrCode, 'html5QrCode')
                html5QrCode
                    .start(
                        cameraId,
                        {
                            fps: 10, // Optional, frame per seconds for qr code scanning
                            qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
                            videoConstraints: { facingMode: "environment" },
                        },
                        (decodedText, decodedResult) => {
                            // do something when code is read
                            console.log('decodedText', decodedText)
                            resultQrText.value = decodedText;
                            resultDecodeQrText.value = decodedResult;
                        },
                        (errorMessage) => {
                            // parse error, ignore it.
                            console.log('errorMessage', errorMessage)
                        }
                    )
                    .catch((err) => {
                        // Start failed, handle it.
                        console.log('err', err)
                    });
                setTimeout(() => {
                    const readerElement = document.getElementById('qr-shaded-region');
                    console.log(readerElement)
                    const overlay = document.createElement('div');
                    overlay.className = 'qr-overlay';
                    overlay.innerHTML = `
                            <div class="scanning-line"></div>
                            <div class="corner corner-top-left"></div>
                            <div class="corner corner-top-right"></div>
                            <div class="corner corner-bottom-left"></div>
                            <div class="corner corner-bottom-right"></div>
                        `;
                    readerElement.appendChild(overlay);
                }, 1000);
            }
        })
        .catch((err) => {
            // handle err
        });
}

function onScanError(errorMessage) {
    console.warn(`QR error = ${errorMessage}`);
}

const onScanSuccess = (decodedText, decodedResult) => {
    emit("result", decodedText, decodedResult);
};

const switchCamera = () => {
    switch (facingMode.value) {
        case "environment":
            facingMode.value = "user";
            break;
        case "user":
            facingMode.value = "environment";
            break;
    }
};

function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#007bff";
        ctx.strokeRect(x, y, width, height);
    }
}

function onError(err) {
    const triedFrontCamera = facingMode.value === "user";
    const triedRearCamera = facingMode.value === "environment";

    const cameraMissingError = err.name === "OverconstrainedError";

    if (triedRearCamera && cameraMissingError) {
        this.noRearCamera = true;
    }

    if (triedFrontCamera && cameraMissingError) {
        this.noFrontCamera = true;
    }

    console.error(err);
    error.value = `[${err.name}]: `;

    if (err.name === "NotAllowedError") {
        error.value += "you need to grant camera access permission";
    } else if (err.name === "NotFoundError") {
        error.value += "no camera on this device";
    } else if (err.name === "NotSupportedError") {
        error.value += "secure context required (HTTPS, localhost)";
    } else if (err.name === "NotReadableError") {
        error.value += "is the camera already in use?";
    } else if (err.name === "OverconstrainedError") {
        error.value += "installed cameras are not suitable";
    } else if (err.name === "StreamApiNotSupportedError") {
        error.value += "Stream API is not supported in this browser";
    } else if (err.name === "InsecureContextError") {
        error.value +=
            "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
    } else {
        error.value += err.message;
    }
}

function onDetect(detectedCodes) {
    result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));
}

const onDecode = async (result) => {
    if (isQrScan.value) {
        isQrScan.value = false;
        console.log(result)
        try {
            resultScanQrText.value = result.code
        } catch (error) {
            console.log(error);
            errorScan.value = error
        }
    }
};
</script>

<style>
.qr-page .camera-view {
    overflow: hidden;
    height: 100vh;
    background-color: #0000;
}

#qr-code-full-region {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
}

#qr-code-full-region__scan_region {
    position: relative;
    overflow: hidden;
}

/* Custom overlay for QR box */
.qr-overlay {
    position: absolute;
    left: 0;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
    animation: scan 3s infinite;
}

/* Horizontal scanning line */
.scanning-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #0066ff;
    /* Start at bottom */
    bottom: 0;
    z-index: 1;
}

.scanning-line::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 2px;
    height: 50px;
    background: linear-gradient(to bottom, rgba(0, 102, 255, 0.2), transparent);
    pointer-events: none;
    z-index: 0;
}

/* Corner indicators */
.corner {
    position: absolute;
    width: 45px;
    height: 45px;
    z-index: 1;
}

.corner-top-left {
    top: -5px;
    left: -5px;
    border-top: 5px solid;
    border-left: 5px solid;
    border-color: #0066ff;
}

.corner-top-right {
    top: -5px;
    right: -5px;
    border-top: 5px solid;
    border-right: 5px solid;
    border-color: #0066ff;
}

.corner-bottom-left {
    bottom: -5px;
    left: -5px;
    border-bottom: 5px solid;
    border-left: 5px solid;
    border-color: #0066ff;
}

.corner-bottom-right {
    bottom: -5px;
    right: -5px;
    border-bottom: 5px solid;
    border-right: 5px solid;
    border-color: #0066ff;
}

/* @keyframes scan {
    0% {
        top: 0;
    }

    50% {
        top: calc(100% - 2px);
    }

    100% {
        top: 0;
    }
} */

@keyframes scan {
    0% {
        /* Start from bottom */
        transform: translateY(0%);
    }

    100% {
        /* Move to top */
        transform: translateY(-100%);
    }
}

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
