import React, {useReducer, Component} from "react";

function reducer(state, action){
    switch (action.type) {
        case 'INCREMENT':
            return state+1;
        case 'DECREMENT':
            return state-1;
        default:
            return state;
    }
}

class Counter extends Component {

    constructor (props){
        super(props);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.state = {
            counter: 0
        };
    }

    // state = {counter : 0}    // class-properties 를 이용하는 경우, contructor 없이 외부에서 state 선언 가능

    handleIncrease(){
        console.log('inc');
        console.log(this);
        this.setState({
            counter:this.state.counter+1
        });
    }

    handleDecrease = () => {
        console.log('dec');
        console.log(this);
        this.setState(state=>({...state, counter:state.counter-1}), ()=>{console.log('this is a callback')});
        // setState의 두번째 인자에 callback function 전달 가능
    }

    // constructor를 이용해 bind하거나,
    // class-properties 문법을 이용해 화살표 함수로 정의하면 bind를 생략할 수 있음
    
    render () {
        return (
        <div>
            <h1>{this.state.counter}</h1>
            <button onClick={this.handleIncrease}>+1</button>
            <button onClick={this.handleDecrease}>-1</button>
        </div>
        )
    }
}

// function Counter(){
//     // const [number, setNumber] = useState(0);

//     // const onIncrease = () => {
//     //     setNumber(number+1);
//     //     // setNumber(x => x+1);     // Functional update
//     // }

//     // const onDecrease = () => {
//     //     setNumber(number-1);
//     //     // setNumber(x => x-1);
//     // }

//     const [number, dispatch] = useReducer(reducer, 0);

//     const onIncrease = ()=>{dispatch({type:'INCREMENT'})};
//     const onDecrease = ()=>{dispatch({type:'DECREMENT'})};

//     return (
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     );
// }

export default Counter;