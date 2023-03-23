import React, {useState} from 'react';

const Editableinput = () => {
    const [inputer,SetInput] = useState('')

    return (
        <div>
            <input type={"text"}  onChange={event => SetInput(event.target.value)}/>
            <h3> {inputer}</h3>
        </div>
    );
};

export default Editableinput;