import React, {useState, useEffect, useReducer, useRef, useCallback, useLayoutEffect} from 'react';
// import PullLoad from "./pullload";

let pullLoad;
let last_known_scroll_position = 0;
let last_known_scroll_time = 0;
let duration = 200;

const isBrowser = () => typeof window !== "undefined";
if (typeof window === 'undefined') {
    // @ts-ignore
    global.window = {}
}

const ReactPullLoad = (props) => {

    const loadingBar = useRef<HTMLParagraphElement>(null);

    const {LoadingComponent} = props;

    useEffect(() => {
        // console.log(isBrowser())
        if (loadingBar.current && !pullLoad) {
            pullLoad = window.addEventListener("scroll", onScroll)
        }
        return () => window.removeEventListener("scroll", onScroll)
    });

    useEffect(()=>{
        let bar = loadingBar.current.getBoundingClientRect();
        if (loadingBar.current && bar.top < document.documentElement.clientHeight){
            props.callback()
        }
    })

    const onScroll = () => {
        let bar = loadingBar.current.getBoundingClientRect();
        if (loadingBar.current &&
            (last_known_scroll_position < window.scrollY) &&
            ((new Date().getTime() - last_known_scroll_time) > duration) &&
            (bar.top < document.documentElement.clientHeight)
        ) {
            last_known_scroll_time = new Date().getTime();
            props.callback()
        }
        last_known_scroll_position = window.scrollY;
    };


    return <div className="container">
        {props.children}
        {
            props.over ? <p id="over" style={{textAlign: "center"}}>{props.over}</p> : (
                <div id="loading" ref={loadingBar}>
                    {
                        LoadingComponent ? LoadingComponent : <svg xmlns="http://www.w3.org/2000/svg"
                                                                   style={{
                                                                       margin: "auto",
                                                                       display: "block",
                                                                       shapeRendering: "auto"
                                                                   }} width="80px" height="80px"
                                                                   viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" r="45" strokeWidth="6" stroke="#88e7f8"
                                    strokeDasharray="70.68583470577035 70.68583470577035" fill="none"
                                    strokeLinecap="round">
                                <animateTransform attributeName="transform" type="rotate" dur="1s"
                                                  repeatCount="indefinite"
                                                  keyTimes="0;1" values="0 50 50;360 50 50"/>
                            </circle>
                            <circle cx="50" cy="50" r="38" strokeWidth="6" stroke="#d6f7fe"
                                    strokeDasharray="59.690260418206066 59.690260418206066"
                                    strokeDashoffset="59.690260418206066" fill="none" strokeLinecap="round">
                                <animateTransform attributeName="transform" type="rotate" dur="1s"
                                                  repeatCount="indefinite"
                                                  keyTimes="0;1" values="0 50 50;-360 50 50"/>
                            </circle>
                        </svg>
                    }

                </div>)
        }
    </div>
};

export default ReactPullLoad