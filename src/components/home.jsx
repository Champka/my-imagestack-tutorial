const React = require('react');
const { connect } = require('react-redux');
const ProfileHeader = require('./profile-header');
const ImageContainer = require('./image-container');
const Spinner = require('./spinner');
const { getImages } = require('../action-creators');

export class Home extends React.Component {
 
    componentDidMount() {
        this.props.getImages();
    }
    render() {
        return (
            <div>
                <ProfileHeader />
                {this.props.isLoading ?
                    <Spinner /> :
                    <ImageContainer imageList={this.props.imageList} />
              }
            </div>
        );
    }
}
 
function mapStateToProps(state) {
  return {
    imageList: state.get('imageList').toJS(),
    isLoading: state.getIn(['view', 'isLoading'])
  };
}
 
function mapDispatchToProps(dispatch) {
    return {
        getImages: () => dispatch(getImages())
    }
}
 
export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);