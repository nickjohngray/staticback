/* tslint:disable:no-parameter-reassignment*/
import React from 'react';
import {useEditor} from 'slate-react';

export const RTElement = props => {
    const {attributes, children, element} = props;

    switch (element.type) {
        default:
            return <span {...attributes}>{children}</span>;
        case 'div':
        case 'richText':
            return (
                <div className={element.className} {...attributes}>
                    {children}
                </div>
            );
        case 'h1':
            return (
                <h1 className={element.className} {...attributes}>
                    {children}
                </h1>
            );
        case 'p':
            return (
                <p className={element.className} {...attributes}>
                    {children}
                </p>
            );
        case 'h2':
            return (
                <h2 className={element.className} {...attributes}>
                    {children}
                </h2>
            );

        case 'a':
            return (
                <a className={element.className} href={element.href} {...attributes}>
                    {children}
                </a>
            );

        case 'quote':
            return <blockquote {...attributes}>{children}</blockquote>;
        case 'code':
            return (
                <pre>
                    <code {...attributes}>{children}</code>
                </pre>
            );
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>;
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>;
        case 'heading-three':
            return <h3 {...attributes}>{children}</h3>;
        case 'heading-four':
            return <h4 {...attributes}>{children}</h4>;
        case 'heading-five':
            return <h5 {...attributes}>{children}</h5>;
        case 'heading-six':
            return <h6 {...attributes}>{children}</h6>;
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
        case 'link':
            return (
                <a href={element.url} {...attributes}>
                    {children}
                </a>
            );
    }
};
