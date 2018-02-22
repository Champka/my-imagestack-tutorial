const React = require('react');
const Image = require('./image');
 
export default class ImageContainer extends React.Component {
 
    render() {
        const { imageList } = this.props;
        return (
            <div className="row">
                {imageList.map(image => <Image id={image.key} {...image} />)}
            </div>
        );
    }
}