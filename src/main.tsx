import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import ReactPullLoad from './index'


function Main() {

    const [list, setList] = useState([]);
    const [over, setOver] = useState(false);


    const makeData = () => {
        let data = [];
        for (let i = list.length; i < (list.length + 3); i++) {
            data.push({
                name: i + 1,
                value: i + 1
            })
        }
        return data
    };

    useEffect(()=>{
        let data = makeData()
        setTimeout(()=>{
            setList(data)
        },1000)
    },[])

    // useEffect(()=>{
    //     setCount(list.length)
    // },[list.length])

    const fetchData = () => {
        setTimeout(()=>{
            let data = makeData();
            let arr = list.concat(data);
            setList(arr)
            if (arr.length>39){
                setOver("over")
            }
        },2000)
    };

    console.log(list)

    return <div className='container'>
        <ReactPullLoad callback={fetchData} over={over} LoadingComponent={<p id={"loading"}>loading...</p>}>
            <ul>
                {
                    list.map((item, key) =>
                        <li key={key}>{item.name}</li>
                    )
                }
            </ul>
        </ReactPullLoad>
    </div>
}

ReactDOM.render(<Main/>, document.getElementById('root'));