export default class PullLoad {
    private loading: boolean;
    private loadingEvent: () => void;
    private direction: string;
    private scroll: () => void;
    private lastTime: number;
    private readonly timeout: number;
    private readonly callback: any;

    constructor(props) {
        this.loading = false;
        this.loadingEvent = null;
        this.scroll = null;
        this.direction = null;
        this.lastTime = new Date().getTime();
        this.timeout = 200;
        this.callback = props.callback
    }

    loadingFunc() {
        const loading = () => {
            let clientHeight = document.documentElement.clientHeight;
            let ele = document.getElementById("loading");
            let loadingBar = ele.getBoundingClientRect();
            // if (loadingBar.top < clientHeight) {
            //     this.callback(loadingBar.top);
            //     // this.loading = false;
            //     console.log(this.loading)
            // }
            return () => {
                console.log(loadingBar.top ,clientHeight , this.direction === "DOWN")
                if (loadingBar.top < clientHeight && this.direction === "DOWN") {
                    this.loading = true;
                    ele.innerHTML = "数据加载中...";
                    if (this.loading && (new Date().getTime() - this.lastTime) > this.timeout) {
                        this.lastTime = new Date().getTime();
                        this.callback(loadingBar.top);
                        this.loading = false;
                        ele.innerHTML = "已经是底线了"
                        // }, 2000)
                    }
                }
            }
        };

        const judgeDirection = () => {
            let pageYOffset = window.pageYOffset;
            return () => {
                if (pageYOffset > window.pageYOffset) {
                    this.direction = "UP"
                } else {
                    this.direction = "DOWN"
                }
                pageYOffset = window.pageYOffset;
            }
        };

        if (this.scroll) {
            this.scroll()
        } else {
            this.scroll = judgeDirection()
        }
        if (this.loadingEvent) {
            this.loadingEvent()
        } else {
            this.loadingEvent = loading()
        }

        // loading()

    }

}