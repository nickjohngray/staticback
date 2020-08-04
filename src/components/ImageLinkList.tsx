import React, {FC} from 'react';
import {IImage} from '../typings';

//TODO: use image path rather then hard coded path
// when combine strings in require webpack fails to get the image!!!!!!
interface ImageLinkListkProps {
    images: IImage[];
}

const ImageLinkList: FC<ImageLinkListkProps> = ({images}) => (
    <>
        {images.map((image: IImage, key: number) => (
            <>
                <a key={key} href={image.url} target="_new">
                    <img className="img-size-half" src={require('./../images/' + image.src)} />
                </a>
                <br />
            </>
        ))}
    </>
);

export default ImageLinkList;
