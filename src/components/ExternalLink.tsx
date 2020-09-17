import React, {FC} from 'react';

interface IExternalLinkProps {
    url: string;
    text: string;
}

const ExternalLink: FC<IExternalLinkProps> = ({url, text}) => (
    <a href={url} target="_new">
        {text}
    </a>
);

export default ExternalLink;
