import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import styles from './Styles/SearchResultsStyle';
import { Images } from '../Themes';

export default class SearchResults extends React.Component {
  handleProductPress = (productId) => {
    const { setSelectedProduct } = this.props;

    setSelectedProduct(productId);
    Actions.productScreen();
  }

  render () {
    const { products } = this.props;
    const { handleProductPress } = this;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          {products.length > 0
            ? <View>
              <Text style={styles.resultsHeader}>Results</Text>

              <List containerStyle={styles.listContainer}>
                {products.map(product =>
                  <ListItem
                    key={product.id}
                    avatar={Images.dummy}
                    roundAvatar
                    title={product.name}
                    subtitle={<Text style={styles.subtitle}>{product.user.username}</Text>}
                    onPress={() => { handleProductPress(product.id); }}
                    />
                  )}
              </List>
            </View>
            : <View style={styles.noResultContainer}>
              <Text style={styles.noResultText}>No result.</Text>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}
