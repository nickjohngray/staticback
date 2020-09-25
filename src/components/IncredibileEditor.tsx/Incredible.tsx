import React from 'react';
import {getClassName, IIncredibleItem, types} from './index';
import './Incredible.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faGoogle, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import PdfViewer from 'components/PdfViewer';
import RichText from 'components/RichText/RichText';

const faIcons = {
    faFacebook,
    faGoogle,
    faInstagram,
    faPhone
};

interface IPros {
    data: IIncredibleItem;
}

export const Incredible = (props: IPros) => {
    const {data} = props;

    return (
        <div className={'ie-row w-page w-center-it ' + getClassName(data.type)} style={data.style}>
            {makeContainers(data.children)}
        </div>
    );
};

const makeContainers = (items: Array<IIncredibleItem>): any => {
    return items.map((item, i) => {
        switch (item.type) {
            case types.row:
            case types.col: {
                return (
                    <div key={'row' + i} className={'nested-row ' + getClassName(item.type)} style={item.style}>
                        {item.children ? makeContainers(item.children) : makeComponent(item, i)}
                    </div>
                );
            }
            default: {
                return makeComponent(item, i);
            }
        }
    });
};

const makeComponent = (item: IIncredibleItem, reactKey: number) => {
    switch (item.type) {
        case types.pdf: {
            return <PdfViewer key={'pff-' + reactKey} file={item.file} />;
        }
        case types.richText: {
            return <RichText style={{backgroundColor: 'black'}} data={[item]} />;
        }
        case types.linkWithIcon: {
            return (
                <div key={'social-icons' + reactKey} className="social-icons">
                    <a className="social-icon" href={item.href} placeholder={item.placeholder}>
                        <FontAwesomeIcon size={item.size} icon={faIcons[item.icon]} />
                        <span>{item.text}</span>
                    </a>
                </div>
            );
        }
        default: {
            throw 'Error this should not be hit';
        }
    }
};

export default Incredible;
