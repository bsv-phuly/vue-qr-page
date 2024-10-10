<template>
    <vue-final-modal v-model="showModal" class="confirm-modal" content-class="confirm-modal-content"
        overlay-transition="vfm-fade" content-transition="vfm-fade" :click-to-close="false">
        <div class="title">
            {{ '回数券を利用しますか？' }}
        </div>
        <div class="btn-layout">
            <button class="cancel-btn !mt-6" @click="cancelModal">
                いいえ
            </button>
            <button class="submit-btn !mt-6" @click="confirmSubmitQr">
                はい
            </button>
        </div>
    </vue-final-modal>
    <vue-final-modal v-model="successModal" class="confirm-modal" content-class="confirm-modal-content"
        overlay-transition="vfm-fade" content-transition="vfm-fade" :click-to-close="false">
        <svg width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_844_6322)">
            <path d="M39.302 9.66504C32.6291 12.4272 26.5656 16.4764 21.4575 21.5817" stroke="#0066FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.54088 39.4258C6.76985 46.0887 5.33707 53.2318 5.32422 60.448" stroke="#0066FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.54077 81.4707C12.3029 88.1435 16.3522 94.2071 21.4574 99.3151" stroke="#0066FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M39.302 111.231C45.9649 114.002 53.108 115.435 60.3242 115.448" stroke="#0066FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M81.3464 111.231C88.0193 108.469 94.0828 104.42 99.1909 99.3145" stroke="#0066FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M111.108 81.4704C113.879 74.8075 115.311 67.6644 115.324 60.4482" stroke="#0066FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M111.108 39.4255C108.345 32.7527 104.296 26.6891 99.1909 21.5811" stroke="#0066FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M81.3464 9.66491C74.6835 6.89387 67.5404 5.46109 60.3242 5.44824" stroke="#0066FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38.8242 63.4482L53.8242 78.4482L83.8242 48.4482" stroke="#0066FF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_844_6322">
            <rect width="120" height="120" fill="white" transform="translate(0.324219 0.448242)"/>
            </clipPath>
            </defs>
        </svg>
        <div class="success-title">
            {{ '回数券を利用しました' }}
        </div>
    </vue-final-modal>
    <vue-final-modal v-model="alertModal" class="confirm-modal" content-class="confirm-modal-content"
        overlay-transition="vfm-fade" content-transition="vfm-fade" :click-to-close="false">
        <svg width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_844_6263)">
            <path d="M60.0498 83.5352V83.61" stroke="#D01000" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M60.0498 39.6104V64.0729" stroke="#D01000" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="60.0498" cy="60.6797" r="53" stroke="#D01000" stroke-width="4"/>
            </g>
            <defs>
            <clipPath id="clip0_844_6263">
            <rect width="120" height="120" fill="white" transform="translate(0.0498047 0.860352)"/>
            </clipPath>
            </defs>
        </svg>
        <div class="alert-title">
            {{ 'QRコードが正しくありません' }}
        </div>
        <button class="btn-try-again" @click="tryAgain">
            もう一度読む
        </button>
    </vue-final-modal>
    <vue-final-modal v-model="errorModal" class="confirm-modal" content-class="confirm-modal-content error"
        overlay-transition="vfm-fade" content-transition="vfm-fade" :click-to-close="false">
        <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_844_6225)">
            <path d="M74.7998 16.751L16.2998 74.9697" stroke="white" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.2998 16.751L74.7998 74.9697" stroke="white" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_844_6225">
            <rect width="90" height="90" fill="white" transform="translate(0.549805 0.860352)"/>
            </clipPath>
            </defs>
        </svg>
        <div class="error-title">
            {{ 'QRコードが正しくありません' }}
        </div>
        <button class="btn-try-again" @click="closeError">
            もう一度読む
        </button>
    </vue-final-modal>
    <div class="qr-page">
        <!-- <div class="camera-view" style="border: 2px solid black"> -->
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
        <!-- <div class="qr-box"></div> -->
        <!-- </div> -->
        <div id="qr-code-full-region" style="width: 100%; height: 100vh;"></div>
        <div class="qr-text-note">
            QRコードを読み取ってください
        </div>
        <button class="camera-toggle" @click="toggleCamera">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_844_6195)">
                    <path
                        d="M3.72764 6.91348H4.92764C5.56416 6.91348 6.17461 6.66062 6.62469 6.21053C7.07478 5.76045 7.32764 5.15 7.32764 4.51348C7.32764 4.19522 7.45407 3.88999 7.67911 3.66495C7.90415 3.43991 8.20938 3.31348 8.52764 3.31348H15.7276C16.0459 3.31348 16.3511 3.43991 16.5762 3.66495C16.8012 3.88999 16.9276 4.19522 16.9276 4.51348C16.9276 5.15 17.1805 5.76045 17.6306 6.21053C18.0807 6.66062 18.6911 6.91348 19.3276 6.91348H20.5276C21.1642 6.91348 21.7746 7.16633 22.2247 7.61642C22.6748 8.06651 22.9276 8.67696 22.9276 9.31348V20.1135C22.9276 20.75 22.6748 21.3604 22.2247 21.8105C21.7746 22.2606 21.1642 22.5135 20.5276 22.5135H3.72764C3.09112 22.5135 2.48067 22.2606 2.03058 21.8105C1.58049 21.3604 1.32764 20.75 1.32764 20.1135V9.31348C1.32764 8.67696 1.58049 8.06651 2.03058 7.61642C2.48067 7.16633 3.09112 6.91348 3.72764 6.91348Z"
                        stroke="#004BDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M11.2213 17.5978C11.7536 17.7362 12.3106 17.7508 12.8494 17.6405C13.3882 17.5302 13.8946 17.2979 14.3297 16.9614C14.7648 16.6249 15.117 16.1933 15.3592 15.6995C15.6015 15.2057 15.7274 14.663 15.7273 14.113M13.0273 10.627C12.4953 10.4896 11.939 10.4759 11.4008 10.5868C10.8627 10.6977 10.357 10.9303 9.92268 11.2667C9.48831 11.6032 9.13674 12.0347 8.89488 12.528C8.65302 13.0214 8.5273 13.5636 8.52734 14.113"
                        stroke="#004BDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14.5273 14.1133H16.9273V16.5133" stroke="#004BDD" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M9.72764 14.1129H7.32764V11.7129" stroke="#004BDD" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_844_6195">
                        <rect width="24" height="24" fill="white" transform="translate(0.127441 0.913086)" />
                    </clipPath>
                </defs>
            </svg>
        </button>
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
const qrWidth = ref(280);
const qrHeight = ref(280);
const isQrScan = ref(true);
const currentFacingMode = ref('environment');
const resultScanQrText = ref("");
const errorScan = ref("");
const showModal = ref(false)
const successModal = ref(false)
const errorModal = ref(false)
const alertModal = ref(false)
let html5QrCode

onMounted(() => {
    initCamera();
});

const pauseCameraHandle = async () => {
    if (html5QrCode) {
        html5QrCode.pause(true)
        const parentElement = document.getElementById('qr-code-full-region');
        if (parentElement) {
            const elements = parentElement.querySelectorAll('*')
            elements.forEach(element => {
                if (element.textContent.trim() === 'Scanner paused') { // Check if the textContent matches
                element.style.display = 'none'; // Set display to none
                }
            });
        }
    }
}

const toggleCamera = async () => {
    if (html5QrCode) {
        await html5QrCode.stop()
        currentFacingMode.value = currentFacingMode.value === 'environment' ? 'user' : 'environment'
        initCamera()
    }
}

const cancelModal = async () => {
    // if (html5QrCode) {
    //     html5QrCode.resume()
    // }
    showModal.value = false
    alertModal.value = true
    if (html5QrCode) {
        pauseCameraHandle()
    }
}

const confirmSubmitQr = async () => {
    showModal.value = false
    successModal.value = true
    if (successModal.value) {
        setTimeout(() => {
            successModal.value = false
        }, 2500)
    }
    if (html5QrCode) {
        html5QrCode.resume()
    }
}

const tryAgain = async () => {
    alertModal.value = false
    errorModal.value = true
}

const closeError = async () => {
    errorModal.value = false
    if (html5QrCode) {
        html5QrCode.resume()
    }
}

const initCamera = () => {
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
                html5QrCode = new Html5Qrcode("qr-code-full-region", {
                    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                });
                console.log(html5QrCode, 'html5QrCode')
                html5QrCode
                    .start(
                        cameraId,
                        {
                            fps: 10, // Optional, frame per seconds for qr code scanning
                            qrbox: 280, // Optional, if you want bounded box UI
                            videoConstraints: { facingMode: currentFacingMode.value },
                            aspectRatio: window.innerHeight / window.innerWidth,
                        },
                        (decodedText, decodedResult) => {
                            // do something when code is read
                            console.log('decodedText', decodedText)
                            console.log('resultDecodeQrText', resultDecodeQrText)
                            if (decodedText) {
                                resultQrText.value = decodedText;
                                resultDecodeQrText.value = decodedResult;
                                console.log(html5QrCode, 'html5QrCode')
                                pauseCameraHandle()
                                showModal.value = true
                            }
                        },
                        (errorMessage) => {
                            // parse error, ignore it.
                            // console.log('errorMessage', errorMessage)
                        }
                    )
                    .then(() => {
                        // Camera started successfully, add UI elements
                        const addQrOverlay = () => {
                            const readerElement = document.getElementById('qr-shaded-region');
                            let videoElement = document.querySelector('#qr-code-full-region video')
                            console.log(readerElement, 'readerElement')
                            if (!readerElement) {
                                setTimeout(addQrOverlay, 100);
                                return;
                            }

                            // Add scanning line
                            const overlay = document.createElement('div');
                            overlay.className = 'qr-overlay';
                            overlay.innerHTML = `
                                <div class="scanning-line"></div>
                            `;
                            readerElement.appendChild(overlay);

                            // Add corner elements
                            const cornerElements = `
                                <div class="corner corner-top-left"></div>
                                <div class="corner corner-top-right"></div>
                                <div class="corner corner-bottom-left"></div>
                                <div class="corner corner-bottom-right"></div>
                            `;
                            readerElement.insertAdjacentHTML('beforeend', cornerElements);
                            if (videoElement) {
                                videoElement.style.setProperty('width', 'auto', 'important')
                            }
                            document.body.style.overflow = 'hidden'
                        };

                        // Start trying to add overlay
                        addQrOverlay();
                    })
                    .catch((err) => {
                        // Start failed, handle it.
                        console.log('err', err)
                    });
                // setTimeout(() => {
                //     const readerElement = document.getElementById('qr-shaded-region');
                //     console.log(readerElement)
                //     const overlay = document.createElement('div');
                //     overlay.className = 'qr-overlay';
                //     overlay.innerHTML = `
                //             <div class="scanning-line"></div>
                //         `;
                //     readerElement.appendChild(overlay);
                //         const cornerElements = `
                //             <div class="corner corner-top-left"></div>
                //             <div class="corner corner-top-right"></div>
                //             <div class="corner corner-bottom-left"></div>
                //             <div class="corner corner-bottom-right"></div>
                //         `;

                //     // Append corners to shaded region
                //     readerElement.insertAdjacentHTML('beforeend', cornerElements);
                // }, 1000);
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

<style lang="scss">
.qr-page {
    position: relative;
    width: 100%;
    height: 100vh;

    .camera-toggle {
        position: fixed;
        top: calc(100vh - 122px);
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: #FFFFFF;
        border: none;
        color: #004BDD;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;
        padding: 12px;

        svg {
            width: 24px;
            height: 24px;
        }
    }

    .qr-text-note {
        border: 1px solid var(--white-white-10, #FFFFFF1A);
        background-color: #0066FF99;
        opacity: 0.9;
        border-radius: 8px;
        padding: 8px 16px;
        font-family: 'Noto Sans JP', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        text-align: center;
        color: #FFFFFF;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: calc(100vh - 207px);
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        width: 75%;
    }
    button {
        position: absolute;
        left: 10px;
        top: 10px;
    }
}

.qr-page .camera-view {
    overflow: hidden;
    height: 100vh;
    background-color: #0000;
}

#qr-code-full-region {
    width: 100%;
    max-width: 600px;
    margin: auto;
    position: relative;

    video {
        height: 100vh;
    }
}

#qr-code-full-region__scan_region {
    position: relative;
    overflow: hidden;
}

.qr-shaded-region {}

/* Custom overlay for QR box */
.qr-overlay {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
    animation: scan 2s infinite;
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
    border-top: 8px solid;
    border-left: 8px solid;
    border-color: #0066ff;
}

.corner-top-right {
    top: -5px;
    right: -5px;
    border-top: 8px solid;
    border-right: 8px solid;
    border-color: #0066ff;
}

.corner-bottom-left {
    bottom: -10px;
    left: -5px;
    border-bottom: 8px solid;
    border-left: 8px solid;
    border-color: #0066ff;
}

.corner-bottom-right {
    bottom: -10px;
    right: -5px;
    border-bottom: 8px solid;
    border-right: 8px solid;
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
    width: 280px;
    height: 280px;
}


button img {
    width: 50px;
    height: 50px;
}

.error {
    color: red;
    font-weight: bold;
}

.confirm-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: opacityIn 0.5s forwards;
    &.hidden-background {
        display: none;
    }
    @keyframes opacityIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
    .confirm-modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
        border-radius: 20px;
        background-color: #ffffff;
        padding: 24px;
        gap: 24px;
        &.error {
            background-color: #D01000;
        }
    }
    svg {
        width: 100%;
        text-align: center;
        margin: 0 auto;
    }
    .success-title {
        font-family: 'SF Pro Text', sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        text-align: center;
        color: #004BDD;
    }
    .alert-title {
        font-family: 'SF Pro Text', sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        text-align: center;
        color: #D01000;
    }
    .error-title {
        font-family: 'SF Pro Text', sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
    }
    .title {
        font-family: 'Noto sans JP', sans-serif;
        font-size: 18px;
        font-weight: 400;
        line-height: 21.78px;
        text-align: center;
        color: #000000;
    }
    .btn-layout {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 21px;
    }
    .cancel-btn {
        font-family: 'Noto sans JP', sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        border: unset;
        padding: 12px;
        width: 120px;
        background: linear-gradient(90deg, #516682 0%, #3D4F67 100%);
        border-radius: 8px;
    }
    .submit-btn {
        font-family: 'Noto sans JP', sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        border: unset;
        padding: 12px;
        width: 120px;
        background: linear-gradient(90deg, #5197FF 0%, #0066FF 100%);
        border-radius: 8px;
    }
    .btn-try-again {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #404446;
        font-family: 'Noto sans JP', sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        text-align: center;
        padding: 12px;
        border: 1.5px solid var(--Darkblue-700, #AFBDD4);
        background-color: #FFFFFF;
        border-radius: 8px;
    }
}
</style>
