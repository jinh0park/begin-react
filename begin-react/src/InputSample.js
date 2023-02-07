import React, {useState, useRef} from "react";

function InputSample(){

    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    })

    const {name, nickname} = inputs;

    const nameInput = useRef();

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });

    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });
        nameInput.current.focus();
    }

    return (
        <div>
            <input onChange={onChange} placeholder="이름" name="name" value={name} ref={nameInput}/>
            <input onChange={onChange} placeholder="닉네임" name="nickname" value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값:{name}({nickname})</b>
            </div>
        </div>
    )
}

export default InputSample;