class Flipper {
    constructor(node, currentTime, nextTime) {
        this.isFlipping = false;
        this.duration = 600;
        this.flipNode = node;
        this.frontNode = node.querySelector('.front');
        this.backNode = node.querySelector('.back');
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
    }

    setFrontTime(currentTime) {
        this.frontNode.dataset.number = currentTime;
    }

    setBackTime(nextTime) {
        this.backNode.dataset.number = nextTime;
    }

    flipDown(currentTime, nextTime) {
        const _this = this;
        if (this.isFlipping) {
            return false;
        }
        this.isFlipping = true;
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
        this.flipNode.classList.add('running');
        setTimeout(() => {
            this.flipNode.classList.remove('running');
            this.isFlipping = false;
            this.setFrontTime(nextTime)
        }, this.duration)
    }

}

const getTimeFromDate = (date) => {
    return date.toTimeString().slice(0, 8).split(':').join('');
}

const flips = document.querySelectorAll('.flip');
const now = new Date();
const nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
const nextTimeStr = getTimeFromDate(now);
const flippers = Array.from(flips).map((flip, i) => {
    return new Flipper(flip, nowTimeStr[i], nextTimeStr[i])
})

const setTimeFunc = () => {
    let timer = setTimeout(() => {
        if (timer) {
            clearTimeout(timer)
        }
        const now = new Date();
        const nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
        const nextTimeStr = getTimeFromDate(now);
        for(var i = 0;i<flippers.length;i++){
            if(nowTimeStr[i] === nextTimeStr[i]){
                continue;
            }
            console.log(nowTimeStr,nextTimeStr)
            flippers[i].flipDown(nowTimeStr[i],nextTimeStr[i])
        }
        setTimeFunc();
    }, 1000)
}

// setTimeFunc()

setInterval(()=>{
    const now = new Date()
    const nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
    const nextTimeStr = getTimeFromDate(now);
    for(let i=0;i<flippers.length;i++){
        if(nowTimeStr[i] === nextTimeStr[i]){
            continue;
        }
        console.log(nowTimeStr,nextTimeStr)
        flippers[i].flipDown(nowTimeStr[i],nextTimeStr[i])
    }
},1000)