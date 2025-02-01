const loadingCircle = document.getElementById('loadingCircle');
const videoPopup = document.getElementById('videoPopup');
const popupVideo = document.getElementById('popupVideo');
const closeButton = document.getElementById('closeButton');
const tapHint = document.getElementById('tapHint');
const markerStatus = document.getElementById('markerStatus');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

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

// 動画を事前に読み込む関数
const preloadVideos = () => {
    Object.values(videoPaths).forEach(paths => {
        paths.forEach(path => {
            const video = document.createElement('video');
            video.src = path;
            video.preload = 'auto';
            video.load();
            video.muted = true;
        });
    });
};

// マーカー検出ステータスを更新する関数
function updateMarkerStatus(show, isMarkerFound = false) {
    if (isPlaying) return; // 映像再生中は表示しない

    if (show) {
        if (isMarkerFound) {
            markerStatus.innerText = "マーカーを検出中...";
            markerStatus.style.color = "green";
        } else {
            markerStatus.innerText = "マーカーが見つかりません";
            markerStatus.style.color = "red";
        }
        markerStatus.style.display = "block";
    } else {
        markerStatus.style.display = "none";
    }
}

// UIヒントを表示する関数
function showTapHint() {
    tapHint.style.display = 'block';
    tapHint.classList.add('show');
}

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
        showTapHint();
    }

    loadingCircle.style.display = 'block';
    videoPopup.style.display = 'none';

    video.oncanplaythrough = () => {
        loadingCircle.style.display = 'none';
        videoPopup.style.display = 'block';
        updateMarkerStatus(true, true); // 動画再生中はステータスを表示
        video.play();
    };

    video.onerror = () => {
        setTimeout(() => {
            playVideo(currentVideoIndex);
        }, 500);
    };

    playVideo(currentVideoIndex);

    video.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoPathsArray.length;
        playVideo(currentVideoIndex);
    });

    closeButton.addEventListener('click', () => {
        video.pause();
        video.currentTime = 0;
        videoPopup.style.display = 'none';
        isPlaying = false;
        updateMarkerStatus(false); // ×ボタンを押したらステータス非表示
    });
}

// マーカーイベントを処理
document.querySelectorAll('a-marker').forEach(marker => {
    marker.addEventListener('markerFound', () => {
        if (isPlaying) return;

        const markerId = marker.id;
        if (videoPaths[markerId]) {
            setTimeout(() => {
                showPopupVideo(videoPaths[markerId]);
            }, 1000);
        }

        updateMarkerStatus(true, true);  // マーカーが見つかった時に緑色で表示
    });

    marker.addEventListener('markerLost', () => {
        if (!isPlaying) {
            updateMarkerStatus(true, false);  // マーカーが見つからない場合は赤色で表示
        }
    });
});

// ページロード時に動画を事前ロード
window.addEventListener('load', () => {
    preloadVideos();
    updateMarkerStatus(false); // 初期状態は非表示
});
