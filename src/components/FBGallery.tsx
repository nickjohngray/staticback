//@tslint:disable
import React from 'react';
import Carousel, {Modal, ModalGateway} from 'react-images';
import axios from 'axios';

interface IProps {
    FBAccessToken: string;
}

interface IState {
    images: string[];
    isLightboxOpen: boolean;
    selectedIndex: number;
    isLoading: boolean;
    next: {};
    previous: {};
}

class FBGallery extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            images: [],
            isLightboxOpen: false,
            selectedIndex: 0,
            isLoading: true,
            next: null,
            previous: null
        };
    }

    toggleLightbox = (selectedIndex: number) => {
        this.setState(state => ({
            isLightboxOpen: !state.isLightboxOpen,
            selectedIndex
        }));
    };

    getFacebookPhotos = async () => {
        try {
            const galleryId = '435429489951715';
            const key = 'USER_FB_KEY';

            const response = await axios.get(
                'https://graph.facebook.com/v6.0/' +
                    galleryId +
                    '?fields=photos.limit(10)%7Bimages%7D&access_token=' +
                    '' +
                    key
            );
            console.log(response);
            return {photos: response.data.photos.data, paging: response.data.photos.paging};
        } catch (e) {
            throw e;
        }
    };

    componentDidMount = async () => {
        try {
            const {photos, paging} = await this.getFacebookPhotos();
            this.loadImages(photos, null, paging.next);
        } catch (e) {
            console.log(e);
            alert('we had trouble loading assets from facebook, the error was ' + e.message);
        }
    };

    loadImages(images, previous: string, next: string) {
        this.setState({
            images: images.map(imageObject => ({
                source: imageObject.images[0].source,
                caption: 'Strength Pit Otara',
                thumbnail: imageObject.images[imageObject.images.length - 1].source
            })),
            isLoading: false,
            next,
            previous
        });
    }

    next = async () => {
        const response = await axios.get(this.state.next as string);
        this.loadImages(response.data.data, response.data.paging.previous, response.data.paging.next);
    };

    previous = async () => {
        const response = await axios.get(this.state.previous as string);
        this.loadImages(response.data.data, response.data.paging.previous, response.data.paging.next);
    };

    render() {
        const {selectedIndex, isLightboxOpen, images, isLoading} = this.state;

        return (
            <>
                {!isLoading ? (
                    <div className="image-gallery-container">
                        {images.map((objectWithCaptionAndThumbnail: any, index) => (
                            <div
                                className="image-gallery-image-box"
                                onClick={() => this.toggleLightbox(index)}
                                key={index}
                            >
                                <img
                                    alt={objectWithCaptionAndThumbnail.caption}
                                    src={objectWithCaptionAndThumbnail.thumbnail}
                                    className="image-gallery-image"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <span> Loading images... </span>
                )}

                <ModalGateway>
                    {isLightboxOpen && !isLoading ? (
                        //todo why does this make ts error ?
                        <Modal
                            onClose={(x: any) => {
                                this.toggleLightbox(x);
                            }}
                        >
                            <Carousel currentIndex={selectedIndex} views={images as any} />
                        </Modal>
                    ) : null}
                </ModalGateway>
                <div className="center-it image-gallery-pagging-buttons">
                    <div>
                        <button
                            disabled={!this.state.previous}
                            placeholder="Previous"
                            title="Previous"
                            onClick={() => {
                                this.previous();
                            }}
                        >
                            &lt;
                        </button>
                        <button
                            disabled={!this.state.next}
                            placeholder="Next"
                            title="Next"
                            style={{marginLeft: 5}}
                            onClick={() => {
                                this.next();
                            }}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default FBGallery;
