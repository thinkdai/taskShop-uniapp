const watermark = {};

function setWatermark(str) {
    const id = '1.23452384164.123412415';
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id));
    }
    const can = document.createElement('canvas');
    can.width = 150;
    can.height = 120;
    const cans = can.getContext('2d');
    cans.rotate(-20 * Math.PI / 180);
    cans.font = '20px Vedana';
    cans.fillStyle = 'rgba(200, 200, 200, 0.20)';
    cans.textAlign = 'left';
    cans.textBaseline = 'Middle';
    cans.fillText(str, can.width / 3, can.height / 2);
    const div = document.createElement('div');
    div.id = id;
    // 点击穿透
    div.style.pointerEvents = 'none';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.position = 'fixed';
    div.style.zIndex = '2000';
    div.style.width = '100vw';
    div.style.height = '100%';
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    document.querySelector('#app-wrapper').appendChild(div);
    return id;
}

// 该方法只允许调用一次
watermark.set = function (str) {
    let id = setWatermark(str);
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str);
        }
    }, 500);
    window.onresize = () => {
        setWatermark(str);
    };
};

export default watermark;
