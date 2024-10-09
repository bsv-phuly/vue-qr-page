<template>
    <div class="d-flex justify-content-center align-items-center">
        <video ref="video" autoplay playsinline style="display: none"></video>
        <canvas class="canvas" ref="canvas" :hidden="!canvasVisible"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import jsQR from "jsqr";

const video = ref();
const canvas = ref();
const canvasVisible = ref(false);
const outputContainerVisible = ref(false);
const outputMessageVisible = ref(false);
const outputDataVisible = ref(false);
const loadingMessageVisible = ref(false);
const imageContainer = ref();
const outputData = ref();
export interface Props {
    width?: number;
    height?: number;
    isQrScan?: boolean;
}
const props = defineProps<Props>();
// const isScanQr = ref(props.isQrScan);
interface Emits {
    /* eslint-disable no-unused-vars */
    (e: "onDecode"): any;
    /* eslint-enable no-unused-vars */
}
const emits = defineEmits<Emits>();

const drawBox = (begin, b, c, d, color) => {
    const context = canvas.value.getContext("2d");
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(b.x, b.y);
    context.lineTo(c.x, c.y);
    context.lineTo(d.x, d.y);
    context.lineTo(begin.x, begin.y);
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
};

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment", width: { ideal: 1080 }, height: { ideal: 1080 } }, // Thiết lập tỷ lệ khung hình 16:9 ví dụ
        });
        video.value.srcObject = stream;
        video.value.play();
        requestAnimationFrame(tick);
    } catch (error) {
        console.error("Error accessing the camera:", error);
    }
}

const imageElement = ref();
const tick = () => {
    outputMessageVisible.value = true;
    if (video.value.readyState === video.value.HAVE_ENOUGH_DATA) {
        loadingMessageVisible.value = false;
        canvasVisible.value = true;
        outputContainerVisible.value = true;

        canvas.value.height = props?.height ?? 300;
        canvas.value.width = props?.height ?? 300;
        const context = canvas.value.getContext("2d");
        context.drawImage(
            video.value,
            0,
            0,
            canvas.value.width,
            canvas.value.height
        );
        try {
            const imageData = context.getImageData(
                0,
                0,
                canvas.value.width,
                canvas.value.height
            );

            const code = jsQR(
                imageData.data,
                imageData.width,
                imageData.height
            );

            if (code && props.isQrScan) {
                // isScanQr.value = false;
                drawBox(
                    code.location.topLeftCorner,
                    code.location.topRightCorner,
                    code.location.bottomRightCorner,
                    code.location.bottomLeftCorner,
                    "#f9d74a"
                );
                const image = new ImageData(imageData.width, imageData.height);
                image.data.set(imageData.data);
                // const imageElement = imageContainer.value.querySelector("img");
                // imageElement.src = dataURLFromImageData(image);
                imageElement.value = dataURLFromImageData(image);
                // storeUser.gachaImage = dataURLFromImageData(image)
                // console.log(code?.data)
                // console.log(dataURLFromImageData(image))
                try {
                    emits("onDecode", {
                        code: code?.data,
                        file: dataURLFromImageData(image),
                    });
                } catch (e) { }

                outputMessageVisible.value = false;
                outputDataVisible.value = true;
                outputData.value = code.data;
            } else {
                outputMessageVisible.value = true;
                outputDataVisible.value = false;
            }
        } catch (e) { }
    }
    requestAnimationFrame(tick);
};

const dataURLFromImageData = (imageData) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL(); // Trả về một data URL cho hình ảnh
};

onMounted(() => {
    startCamera();
});

onBeforeUnmount(() => {
    if (video.value.srcObject) {
        const tracks = video.value.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
    }
});
</script>
<style scoped lang="css">
.canvas {
    border-radius: 16px;
    width: 50%;
    border-width: auto;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.48);
    box-sizing: border-box;
    inset: 0px;
}
</style>
