import React, {useState} from 'react';

export interface IProps {
    title: string;
    className: string;
    children: any;
}

const ContentToggler = ({className, title, children}: IProps) => {
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
