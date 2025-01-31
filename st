/* 赤い正方形の枠のスタイル */
#markerBoundary {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60vmin;
    height: 60vmin;
    border: 5px solid red;
    background-color: transparent;
    z-index: 999;
}

/* 動画切り替えボタン */
#btnTb, #btnT {
    position: absolute;
    top: 10%;
    padding: 10px 20px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 1001;
    margin: 5px;
}
#btnTb {
    left: 10%;
}
#btnT {
    left: 20%;
}

/* 横画面時にサファリのタブを隠す */
@media screen and (orientation: landscape) {
    body {
        overflow: hidden;
    }
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
    meta[name="apple-mobile-web-app-status-bar-style"] {
        content: black-translucent;
    }
}

/* ローディングアニメーションのスタイル */
#loadingCircle {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    display: none;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ビデオポップアップのスタイル */
#videoPopup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
}

#popupVideo {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

#closeButton {
    position: absolute;
    top: 5%;
    right: 5%;
    background-color: red;
    color: white;
    font-size: 18px;
    border: none;
    padding: 10px;
    cursor: pointer;
}
