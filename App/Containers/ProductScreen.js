import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getProductById } from '../Selectors/ProductsSelector';
import ProductActions from '../Redux/ProductRedux';
import ManualActions from '../Redux/ManualRedux';
import { Actions } from 'react-native-router-flux';

// Styles
import styles from './Styles/ProductScreenStyle';
import { Images } from '../Themes';

class ProductScreen extends React.Component {
  constructor (props) {
    super(props);

    this.handlePressManual = this.handlePressManual.bind(this);
  }

  handlePressManual (manualId) {
    const { setSelectedManual } = this.props;

    setSelectedManual(manualId);
    Actions.manualScreen();
  }

  componentWillMount () {
    const { hideDescription } = this.props;

    hideDescription();
  }

  render () {
    const { showDescription } = this.props;
    const { isDescriptionShown, product } = this.props.product;
    const { handlePressManual } = this;

    return (
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.upperPart}>
            <Image
              source={Images.dummy}
              style={styles.productImage}
            />
            <View style={styles.productBasicInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productProvider}>{product.provider}</Text>
              <View style={styles.subscribeWrapper}>
                { product.isSubscribed
                  ? <Button
                    title={'Subscribed!'}
                    onPress={() => {}}
                    buttonStyle={styles.subscribeButton}
                  />
                  : <Button
                    title={'Subscribe'}
                    onPress={() => {}}
                    buttonStyle={styles.subscribeButton}
                  />
                }

              </View>
            </View>
          </View>
          <View style={styles.productDescriptionContainer}>
            <View style={styles.productDescriptionTextContainer}>
              <Text
                style={styles.productShortDescription}
              >
                {product.description.summary}
              </Text>

              { isDescriptionShown
                ? <Text
                  style={styles.productDescription}
                  >
                  {product.description.detail}
                </Text>
                : <TouchableNativeFeedback onPress={showDescription}>
                  <View style={styles.showMoreButtonContainer}>
                    <Text style={styles.showMoreButton}>Read more</Text>
                  </View>
                </TouchableNativeFeedback>
              }
            </View>
          </View>

          <View>
            <Text style={styles.manualsHeader}>Manuals</Text>

            {product.manuals.length > 0
              ? <List containerStyle={styles.listContainer}>
                {product.manuals.map((manual, i) =>
                  <ListItem
                    key={i}
                    title={manual.name}
                    onPress={() => { handlePressManual(manual.id); }}
                  />
                )}
              </List>
              : <Text>No manuals for this product.</Text>
            }

          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: { ...state.product, product: getProductById(state) }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideDescription: () => dispatch(ProductActions.hideDescription()),
    showDescription: () => dispatch(ProductActions.showDescription()),
    setSelectedManual: (manualId) => dispatch(ManualActions.setSelectedManual(manualId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);