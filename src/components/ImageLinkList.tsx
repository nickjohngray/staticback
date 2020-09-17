import React, {FC} from 'react';
import {IImage} from '../typings';

//TODO: use image path rather then hard coded path
// when combine strings in require webpack fails to get the image!!!!!!
interface IProps {
    images: IImage[];
}

const ImageLinkList: FC<IProps> = ({images}) => (
    <>
        {images.map((image: IImage, key: number) => (
            <>
                <a key={key} href={image.url} target="_new">
                    <img className="img-size-half" src={require('./../assets/' + image.src)} />
                </a>
                <br />
            </>
        ))}
    </>
);

export default ImageLinkList;
