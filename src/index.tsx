import React, {useState, useEffect, useReducer, useRef, useCallback, useLayoutEffect} from 'react';
// import PullLoad from "./pullload";

let pullLoad;
let last_known_scroll_position = 0;
let last_known_scroll_time = 0;
let duration = 200;
let loading = true;

if (typeof window === 'undefined') {
    // @ts-ignore
    global.window = {}
}

const ReactPullLoad = (props) => {

    const loadingBar = useRef<HTMLDivElement>(null);
    const loadingContainer = useRef<HTMLDivElement>(null);

    const {LoadingComponent} = props;

    useEffect(() => {
        if (loadingBar.current && !pullLoad) {
            pullLoad = window.addEventListener("scroll", onScroll)
        }
        return () => window.removeEventListener("scroll", onScroll)
    });

    useEffect(() => {
        if (loadingBar.current) {
            let bar = loadingBar.current.getBoundingClientRect();
            if (
                loadingBar.current &&
                bar.top < document.documentElement.clientHeight &&
                !loading
            ) {
                loading = true
                props.callback()
            }
        }
        return () => {
            loading = false
        }
    })

    const onScroll = async () => {
        let bar = loadingBar.current.getBoundingClientRect();
        if (loadingBar.current &&
            (last_known_scroll_position < window.scrollY) &&
            ((new Date().getTime() - last_known_scroll_time) > duration) &&
            (bar.top < document.documentElement.clientHeight) &&
            !loading
        ) {
            last_known_scroll_time = new Date().getTime();
            loading = true
            await props.callback()
            loading = false
        }
        last_known_scroll_position = window.scrollY;
    };


    return <div className="container" ref={loadingContainer}>
        {props.children}
        {
            props.over ? <div id="over" style={{textAlign: "center"}}>{props.over}</div> : (
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