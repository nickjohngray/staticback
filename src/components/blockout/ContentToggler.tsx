import React, {useState} from 'react';

export interface Props {
    title: string;
    className: string;
    children: any;
}

const ContentToggler = ({className, title, children}: Props) => {
    const [isVisible, setVisible] = useState(false);

    return (
        <div className={className}>
            <button className={className + '_button'} onClick={() => setVisible(!isVisible)}>
                {title}
            </button>
            {isVisible && <div className={className + '_content'}>{children}</div>}
        </div>
    );
};

export default ContentToggler;
