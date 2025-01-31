let currentVideoIndex = 0; // 初期状態を't'に設定
let popupVideo = document.getElementById('popupVideo');
let currentMarkerId = null;
let videoIsPlaying = false;

// 動画パス（各マーカーごとに切り替え）
const videoPaths = {
    "city1": ["t/city1_t.mov", "tb/city1_tb.mov"],
    "city2": ["t/city2_t.mov", "tb/city2_tb.mov"],
    "city3": ["t/city3_t.mov", "tb/city3_tb.mov"],
    "city4": ["t/city4_t.mov", "tb/city4_tb.mov"],
    "grass1": ["t/grass1_t.mov", "tb/grass1_tb.mov"],
    "grass2": ["t/grass2_t.mov", "tb/grass2_tb.mov"],
    "grass3": ["t/grass3_t.mov", "tb/grass3_tb.mov"],
    "grass4": ["t/grass4_t.mov", "tb/grass4_tb.mov"],
    "jungle1": ["t/jungle1_t.mov", "tb/jungle1_tb.mov"],
    "jungle2": ["t/jungle2_t.mov", "tb/jungle2_tb.mov"],
    "jungle3": ["t/jungle3_t.mov", "tb/jungle3_tb.mov"],
    "jungle4": ["t/jungle4_t.mov", "tb/jungle4_tb.mov"],
    "ocean1": ["t/ocean1_t.mov", "tb/ocean1_tb.mov"],
    "ocean2": ["t/ocean2_t.mov", "tb/ocean2_tb.mov"],
    "ocean3": ["t/ocean3_t.mov", "tb/ocean3_tb.mov"],
    "ocean4": ["t/ocean4_t.mov", "tb/ocean4_tb.mov"]
};

// ボタンをクリックしたときの処理
tbButton.addEventListener('click', () => {
    currentVideoIndex = 1;  // "tb"を選択
    updateButtonVisibility();
    updateVideoSource();
});

tButton.addEventListener('click', () => {
    currentVideoIndex = 0;  // "t"を選択
    updateButtonVisibility();
    updateVideoSource();
});

// ボタンの表示・非表示を更新
function updateButtonVisibility() {
    if (currentVideoIndex === 0) {
        tbButton.classList.add('show');
        tButton.classList.remove('show');
    } else {
        tbButton.classList.remove('show');
        tButton.classList.add('show');
    }
}

// 動画の更新
function updateVideoSource() {
    if (popupVideo && currentMarkerId) {
        const videoPathsArray = videoPaths[currentMarkerId];
        popupVideo.src = videoPathsArray[currentVideoIndex];
        popupVideo.load();
        popupVideo.play();
    }
}

// マーカーが検出されたとき
function onMarkerDetected(markerId) {
    currentMarkerId = markerId;  // 現在のマーカーIDを保存

    // ローディング画面を表示
    document.getElementById('loadingCircle').style.display = 'block';
    
    // 動画のロードと再生
    const videoPathsArray = videoPaths[markerId];
    popupVideo.src = videoPathsArray[currentVideoIndex];
    popupVideo.load();
    popupVideo.play();

    // ローディング画面を非表示
    popupVideo.oncanplay = function() {
        document.getElementById('loadingCircle').style.display = 'none';
    };
}

// 動画が終了したときの処理
popupVideo.onended = function() {
    videoIsPlaying = false;
    updateButtonVisibility();  // 動画終了後にボタンを再表示
};

// マーカーの検出状態を表示
const markerStatus = document.getElementById('markerStatus');

function onMarkerDetected(markerId) {
    markerStatus.innerText = `マーカー検出中: ${markerId}`;
    markerStatus.style.display = 'block';
    setTimeout(() => {
        markerStatus.style.display = 'none';
    }, 2000);

    currentMarkerId = markerId;
    const videoPathsArray = videoPaths[markerId];
    popupVideo.src = videoPathsArray[currentVideoIndex];
    popupVideo.load();
    popupVideo.play();
}

// 初期表示時にボタンを設定
updateButtonVisibility();
