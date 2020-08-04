import React, {useEffect, useState} from 'react';
// @ts-ignore
import words from './../../images/words.png';
// logo-words.png, logo-man
// @ts-ignore
import man from './../../images/man4.png';
// @ts-ignore
import ball from './../../images/ball2.png';

export default () => {
    const [spinBall, setSpinBall] = useState(true);
    const [dropBall, setDropBall] = useState(true);

    useEffect(() => {
        toggleSpin();
        setTimeout(() => {
            setDropBall(false);
        }, 2000);
    });

    const toggleSpin = () => {
        window.setTimeout(() => {
            setSpinBall(!spinBall);
            toggleSpin();
        }, 20000);
    };

    const getBallClassName = () => {
        let cn = 'center logo-ball';
        cn += spinBall ? ' logo-spin-ball' : '';
        cn += dropBall ? ' logo-drop-ball' : '';
        return cn;
    };
    return (
        <div className="page center-it">
            <p></p>
            <img className={spinBall ? 'center logo-words' : 'center logo-words logo-spin-words'} src={words} />
            <img id="logoMan" className="center logo-man" src={man} />
            <img id="logoBall" className={getBallClassName()} src={ball} />
        </div>
    );
};
