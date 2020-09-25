import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import {ICartItem, IProduct, ISingleVariation, Variation, VariationItem} from '../../typings';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import RichText from '../RichText/RichText';
/*import parse from 'html-react-parser';*/

interface IState {
    selectedVariations: ISingleVariation[];
    image: string;
    fullMode: boolean;
    price: number | null;
}

interface IProps extends IProduct {
    onAddToCart: (cartItem: ICartItem) => void;
}

class Product extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const selectedVariations: ISingleVariation[] = [];

        this.props.variations.forEach(variation => {
            selectedVariations.push({name: variation.title, option: variation.item[0]});
        });

        this.state = {
            selectedVariations: selectedVariations,
            image: this.props.image,
            fullMode: false,
            price: this.props.price
        };
    }

    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        // if price changes ( through hot reload ) update the price of state so it shows the new price
        // this is only needed as the user may change the price in the cms , and a hot relaod will occur )
        // if this is not done the user will not see the new price until they reload the browser
        if (nextProps.price && nextProps.price !== this.props.price) {
            this.setState({price: nextProps.price});
        }
    }

    //@ts-ignore
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        window.location.reload();
    }

    findVariationByTitle = (title: string): Variation => {
        return this.props.variations.find(variation => variation.title === title);
    };

    findVariationItemByName = (title: string, name: string): VariationItem => {
        const variation = this.findVariationByTitle(title);
        return variation.item.find(variationItem => variationItem.optionValue === name);
    };

    setVariationState = (variationTitle: string, variationName: string) => {
        const variationItem = this.findVariationItemByName(variationTitle, variationName);
        let image = null; //this.props.image;
        let price = null; //this.props.price;
        for (let i = 0; i < this.state.selectedVariations.length; i++) {
            if (this.state.selectedVariations[i].name === variationTitle) {
                this.state.selectedVariations[i].option = cloneDeep(variationItem);

                // if this product variation has an image or price
                // get it and update state so they are visually updated
                if (variationItem.image) {
                    image = variationItem.image;
                }

                if (variationItem.price) {
                    price = variationItem.price;
                }

                break;
            }
        }

        // force update
        const state = {selectedVariations: this.state.selectedVariations};
        // @ts-ignore
        if (image) state.image = image;
        // @ts-ignore
        if (price) state.price = price !== -1 ? price : '';
        this.setState(state);
    };

    render = () => (
        <div className="product">
            <div className="product-title">{this.props.title}</div>
            <div className="product-price">{this.state.price && '$' + this.state.price}</div>
            <div className="product-image">
                {this.state.fullMode ? (
                    <div className="product-large-mode" onClick={() => this.setState({fullMode: false})}>
                        <img src={require('./../../assets/' + this.state.image)} />
                    </div>
                ) : (
                    <div className="product-small-mode" onClick={() => this.setState({fullMode: true})}>
                        <img className="img-size-half" src={require('./../../assets/' + this.state.image)} />
                    </div>
                )}
            </div>
            <div className="product-cart-controls">
                {this.props.variations ? (
                    this.props.variations.map((variation, key: number) => (
                        <div key={key}>
                            <div> {variation.title} </div>
                            <select
                                value={
                                    findVariationOptionValue(this.state.selectedVariations, variation.title)
                                    /* this.state.selectedVariations.find(
                                        selectedVariation => selectedVariation.name === variation.title
                                    ).option.optionValue*/
                                }
                                onChange={event => {
                                    this.setVariationState(variation.title, event.target.value);
                                }}
                            >
                                {variation.item.map((variationItem, key: number) => (
                                    <option key={key}>{variationItem.optionValue}</option>
                                ))}
                            </select>
                        </div>
                    ))
                ) : (
                    <span>{this.props.title} No variation</span>
                )}

                <button
                    disabled={
                        this.state.selectedVariations.find(
                            VariationItem => VariationItem.option.optionValue === 'Pick 1...'
                        ) !== undefined
                    }
                    onClick={() => {
                        /*  pass the fields needed to create a cart item
                            the id will be set in the shop component
                            if this product has  a price variation set it as
                            the this products price */
                        this.props.onAddToCart({
                            id: -1,
                            product: {...this.props, price: this.state.price},
                            selectedVariations: cloneDeep(this.state.selectedVariations) //lose reference to variation
                        });
                    }}
                    className="add-to-cart"
                >
                    Add to cart <FontAwesomeIcon icon={faCartPlus} title="Add to cart" />
                </button>
            </div>
            <div className="product-description">
                <RichText style={{backgroundColor: 'black'}} data={this.props.description} />
                {/* {parse(this.props.description)}*/}
            </div>
        </div>
    );
}

const findVariationOptionValue = (variations: ISingleVariation[], name) => {
    const variation: ISingleVariation = variations.find(variation => {
        return variation.name === name;
    });
    if (!variation) {
        // hot readlong will kill this state
        window.location.reload();
    }
    return variation.option.optionValue;
};

export default Product;
