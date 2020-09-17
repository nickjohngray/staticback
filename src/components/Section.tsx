import React, {FC, useState} from 'react';
import {ISection, IImage, ISectionOpener} from '../typings';
import parse from 'html-react-parser';
import SectionList from './SectionList';

//TODO: use image path rather then hard coded path
// when combine strings in require webpack fails to get the image!!!!!!
interface IProps {
    header?: string;
    body?: string;

    image?: IImage;
    sections?: ISection[];
    list?: string[];
    link?: string;
    opener?: ISectionOpener;
}

const Section: FC<IProps> = ({header, body, image, sections, list, link, opener}) => {
    const [open, setOpen] = useState(opener ? opener.open : true);

    return (
        <>
            {opener && header && (
                <a
                    onClick={() => setOpen(!open)}
                    className={open ? 'expander-header expander-content-expanded' : 'expander-header'}
                >
                    {parse(header)}
                </a>
            )}

            {open && (
                <div className={opener ? 'section expander-content' : 'section'}>
                    {!opener && header && <h2>{parse(header)}</h2>}
                    {image && <img className="img-size-half" src={require('./../assets/' + image.src)} />}
                    {body && <div> {parse(body)}</div>}
                    {link && (
                        <div>
                            <a href={link} target="_new">
                                {link}
                            </a>
                        </div>
                    )}

                    {list && renderList(list)}
                    <br />
                    {sections && <SectionList sections={sections}></SectionList>}
                </div>
            )}
        </>
    );
};

const renderList = (list: string[]) => (
    <ul>
        {list.map((listItem: string, key: number) => (
            <li key={key}> {parse(listItem)} </li>
        ))}
    </ul>
);

export default Section;
