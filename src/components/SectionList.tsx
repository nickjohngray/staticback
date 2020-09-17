import React, {FC} from 'react';
import {ISection} from '../typings';
import Section from './Section';

//TODO: use image path rather then hard coded path
// when combine strings in require webpack fails to get the image!!!!!!
interface IProps {
    sections: ISection[];
    imagePath?: string;
}

const SectionList: FC<IProps> = ({sections}) => renderSections(sections);

const renderSections = (sections: ISection[]) => (
    <>
        {sections.map(({image, header, body, sections, list, link, opener}, key: number) => (
            <Section
                key={key}
                header={header}
                body={body}
                image={image}
                sections={sections}
                list={list}
                link={link}
                opener={opener}
            />
        ))}
    </>
);

export default SectionList;
