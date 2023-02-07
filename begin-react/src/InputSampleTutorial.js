import React, {useState} from "react";

function InputSampleTutorial(){
    const [text, setText] = useState('');
    
    const onChange = (e) => {
        setText(e.target.value);
    };

    const onReset = () => {
        setText('');
    }

    return (
        <div>
            <input onChange={onChange} value={text}/>
            <button onClick={onReset}>Reset</button>
            <div>
                <b>값:{text}</b>
            </div>
        </div>
    )
}

export default InputSampleTutorial;