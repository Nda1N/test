const loadingCircle = document.getElementById('loadingCircle');
const videoPopup = document.getElementById('videoPopup');
const popupVideo = document.getElementById('popupVideo');
const closeButton = document.getElementById('closeButton');
const btnTb = document.getElementById('btnTb');
const btnT = document.getElementById('btnT');
const markerStatus = document.getElementById('markerStatus'); // 追加: マーカー検出中の表示

// 動画のパスを指定
const videoPaths = {
    city1: ['tb/human_tb.mov', 't/human_t.mov'],
    city2: ['tb/dog_tb.mov', 't/dog_t.mov'],
    city3: ['tb/cat_tb.mov', 't/cat_t.mov'],
    city4: ['tb/crow_tb.mov', 't/crow_t.mov'],
    grass1: ['tb/giraffe_tb.mov', 't/giraffe_t.mov'],
    grass2: ['tb/meerkat_tb.mov', 't/meerkat_t.mov'],
    grass3: ['tb/horse_tb.mov', 't/horse_t.mov'],
    grass4: ['tb/kangaroo_tb.mov', 't/kangaroo_t.mov'],
    jungle1: ['tb/gibbon_tb.mov', 't/gibbon_t.mov'],
    jungle2: ['tb/bear_tb.mov', 't/bear_t.mov'],
    jungle3: ['tb/ezorisu_tb.mov', 't/ezorisu_t.mov'],
    jungle4: ['tb/deer_tb.mov', 't/deer_t.mov'],
    ocean1: ['tb/penguin_tb.mov', 't/penguin_t.mov'],
    ocean2: ['tb/seal_tb.mov', 't/seal_t.mov'],
    ocean3: ['tb/seaotter_tb.mov', 't/seaotter_t.mov'],
    ocean4: ['tb/seaturtle_tb.mov', 't/seaturtle_t.mov']
};

// 再生中のフラグと現在の動画インデックス
let isPlaying = false;
let currentVideoIndex = 0;

// 動画を再生する関数
function showPopupVideo(videoPathsArray) {
    if (isPlaying) return;

    isPlaying = true;
    currentVideoIndex = 0;
    const video = popupVideo;

    function playVideo(index) {
        video.src = videoPathsArray[index];
        video.load();
        video.loop = true;
        video.play();
    }

    loadingCircle.style.display = 'block';
    videoPopup.style.display = 'none';

    video.oncanplaythrough = () => {
        loadingCircle.style.display = 'none';
        videoPopup.style.display = 'block';
        video.play();
    };

    video.onerror = () => {
        setTimeout(() => {
            playVideo(currentVideoIndex);
        }, 500);
    };

    playVideo(currentVideoIndex);
    
    closeButton.addEventListener('click', () => {
        video.pause();
        video.currentTime = 0;
        videoPopup.style.display = 'none';
        isPlaying = false;
    });
}

// ボタンイベントリスナー
btnTb.addEventListener('click', () => {
    if (!isPlaying) {
        showPopupVideo(videoPaths.city1); // 例えば city1 に対して
    }
});

btnT.addEventListener('click', () => {
    if (!isPlaying) {
        showPopupVideo(videoPaths.city1); // 例えば city1 に対して
    }
});

// マーカー検出中の表示
function onMarkerDetected(isDetected) {
    if (isDetected) {
        markerStatus.innerText = "マーカー検出中...";
        markerStatus.style.display = "block"; // マーカー検出中表示を表示
    } else {
        markerStatus.style.display = "none"; // マーカーが検出されない場合非表示
    }
}

// 初期状態で tb の動画を再生
window.addEventListener('load', () => {
    showPopupVideo(videoPaths.city1); // 最初に tb 動画を再生
});
