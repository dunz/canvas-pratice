import React, { useEffect } from 'react';

import './App.css';

function App(): JSX.Element {
    useEffect(() => {
        draw();
    }, []);

    return (
        <div className="App">
            <canvas id="canvas" />
            <ul>
                <li>
                    <input type="range" id="line-width" min="1" max="10" defaultValue="5" />
                </li>
                <li>
                    <input type="color" id="color" />
                </li>
                <li>
                    <button id="fill-mode">Fill</button>
                </li>
                <li>
                    <button id="destroy">Destroy</button>
                </li>
                <li>
                    <button id="eraser">Erase</button>
                </li>
                <li>
                    <input type="file" id="file" />
                </li>
                <li>
                    <input type="text" id="text" placeholder="Write and then double click" />
                </li>
                <li>
                    <button id="download">Download image</button>
                </li>
            </ul>
        </div>
    );
}

export default App;

const draw = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d'); // 2d, bitmaprenderer, webgl, webgl2
    canvas.width = 700;
    canvas.height = 700;
    if (!ctx) {
        return;
    }

    // .1 rect
    // ctx.rect(0, 0, 100, 100);
    // ctx.fill();

    // .2 beginPath
    // ctx.beginPath();
    // ctx.rect(100, 100, 100, 100);
    // ctx.rect(200, 200, 100, 100);
    // setTimeout(() => {
    //     ctx.fillStyle = 'red';
    //     ctx.fill();
    // }, 1000);

    // 3. 직접 그리기
    // ctx.moveTo(50, 50); // 절대좌표
    // ctx.lineTo(150, 50); // 절대좌표
    // ctx.lineTo(150, 150); // 절대좌표
    // ctx.lineTo(50, 150); // 절대좌표
    // ctx.lineTo(50, 50); // 절대좌표
    // ctx.stroke();
    // ctx.fill();

    // 4. 집 그리기
    // ctx.fillRect(200, 200, 50, 200);
    // ctx.fillRect(400, 200, 50, 200);
    // ctx.lineWidth = 5;
    // ctx.fillRect(300, 300, 50, 100);
    // ctx.fillRect(200, 200, 200, 50);
    // ctx.moveTo(200, 200);
    // ctx.lineTo(325, 100);
    // ctx.lineTo(450, 200);
    // ctx.stroke();
    // ctx.fill();

    // 5. 사람 그리기
    // ctx.fillRect(200, 200, 10, 200);
    // ctx.fillRect(400, 200, 10, 200);
    // ctx.fillRect(250, 200, 110, 200);
    // ctx.arc(305, 130, 50, 0, 2 * Math.PI);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.arc(290, 125, 10, Math.PI, 2 * Math.PI);
    // ctx.arc(320, 125, 10, Math.PI, 2 * Math.PI);
    // ctx.fillStyle = 'white';
    // ctx.fill();

    // 6-1. 그림판 구현
    // ctx.lineWidth = 2;
    // const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c', '#f1c40f', '#2ecc71'];
    // const onClick = (event: MouseEvent) => {
    //     ctx.beginPath();
    //     ctx.moveTo(0, 0);
    //     ctx.lineTo(event.offsetX, event.offsetY);
    //     ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
    //     ctx.stroke();
    // };
    // canvas.addEventListener('mousemove', onClick);

    // 6-2. 그림판 구현
    // let isPainting = false;
    // const onMove = (event: MouseEvent) => {
    //     if (isPainting) {
    //         ctx.lineTo(event.offsetX, event.offsetY);
    //         ctx.stroke();
    //         return;
    //     }
    //     ctx.moveTo(event.offsetX, event.offsetY);
    // };
    // const startPainting = (event: MouseEvent) => {
    //     isPainting = true;
    // };
    // const cancelPainting = (event: MouseEvent) => {
    //     isPainting = false;
    // };
    // canvas.addEventListener('mousemove', onMove);
    // canvas.addEventListener('mousedown', startPainting);
    // canvas.addEventListener('mouseup', cancelPainting);
    // canvas.addEventListener('mouseleave', cancelPainting);

    // 6-3. 그림판 구현
    const lineWidth = document.getElementById('line-width') as HTMLInputElement;
    const color = document.getElementById('color') as HTMLInputElement;
    const fillMode = document.getElementById('fill-mode') as HTMLButtonElement;
    const destroy = document.getElementById('destroy') as HTMLButtonElement;
    const eraser = document.getElementById('eraser') as HTMLButtonElement;
    const fileInput = document.getElementById('file') as HTMLInputElement;
    const textInput = document.getElementById('text') as HTMLInputElement;
    const downloadButton = document.getElementById('download') as HTMLButtonElement;

    let isPainting = false;
    let isFilling = false;
    ctx.lineWidth = Number(lineWidth.value);
    ctx.lineCap = 'round';
    const onMove = (event: MouseEvent) => {
        if (isPainting) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            return;
        }

        ctx.moveTo(event.offsetX, event.offsetY);
    };
    const startPainting = (event: MouseEvent) => {
        ctx.beginPath();
        isPainting = true;
    };
    const cancelPainting = (event: MouseEvent) => {
        isPainting = false;
    };
    const onClickCanvas = (event: MouseEvent) => {
        if (isFilling) {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };

    const onDoubleClickCanvas = (event: MouseEvent) => {
        const text = textInput.value;
        if (!text) {
            return;
        }
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = '68px Arial';
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
        // const text = textInput.value;
        // ctx.font = '20px Arial';
        // ctx.fillText(text, event.offsetX, event.offsetY);
    };

    const onChangeLineWidth = (event: Event) => {
        ctx.lineWidth = Number((event.target as HTMLInputElement).value);
    };

    const onChangeColor = (event: Event) => {
        ctx.strokeStyle = (event.target as HTMLInputElement).value;
        ctx.fillStyle = (event.target as HTMLInputElement).value;
    };

    const onClickFillMode = () => {
        isFilling = !isFilling;
        fillMode.innerText = isFilling ? 'Paint' : 'Fill';
    };

    const onClickDestroy = () => {
        ctx.fillStyle = 'white';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const onClickEraser = () => {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 20;
        isFilling = false;
        fillMode.innerText = 'Fill';
    };

    const onChangeFile = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
            return;
        }

        // 1번 방법
        // 파일객체로부터 임시 Blob URL을 생성 후 이를 이미지소스로 사용
        // 비교적 메모리 사용량이 적음
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.src = url;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            fileInput.value = '';
            URL.revokeObjectURL(url);
        };

        // 2번 방법
        // 파일을 Data URL형식으로 변환 후 이를 이미지소스로 사용
        // 파일을 읽고 변환하는 과정이 있어 약간의 오버헤드가 있을 수 있음
        // const reader = new FileReader();
        // reader.onload = (event) => {
        //     const image = new Image();
        //     console.log(event.target?.result);
        //     image.src = event.target?.result as string;
        //     image.onload = () => {
        //         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        //         fileInput.value = '';
        //     };
        // };
        // reader.readAsDataURL(file);
    };

    const onClickDownload = () => {
        // 1번 방법
        // 다양한 이미지 타입 변환 가능
        // 비동기
        // canvas.toBlob((blob) => {
        //     if (!blob) {
        //         return;
        //     }
        //     const link = document.createElement('a');
        //     const url = URL.createObjectURL(blob);
        //     link.setAttribute('download', 'paint2');
        //     link.setAttribute('href', url);
        //     link.click();
        //     URL.revokeObjectURL(url);
        //     console.log(link);
        // });

        // 2번 가능
        // png로만 변환 가능
        // 동기

        const url = canvas.toDataURL();
        const link = document.createElement('a');
        link.setAttribute('download', 'paint');
        link.setAttribute('href', url);
        link.click();
        console.log(link);
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', cancelPainting);
    canvas.addEventListener('mouseleave', cancelPainting);
    canvas.addEventListener('click', onClickCanvas);
    canvas.addEventListener('dblclick', onDoubleClickCanvas);
    lineWidth.addEventListener('change', onChangeLineWidth);
    color.addEventListener('change', onChangeColor);
    fillMode.addEventListener('click', onClickFillMode);
    destroy.addEventListener('click', onClickDestroy);
    eraser.addEventListener('click', onClickEraser);
    fileInput.addEventListener('change', onChangeFile);
    downloadButton.addEventListener('click', onClickDownload);
};
