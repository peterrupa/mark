import { takeLatest } from 'redux-saga/effects';
import API from '../Services/Api';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { SignupTypes } from '../Redux/SignupRedux';
import { LoginTypes } from '../Redux/LoginRedux';
import { UserTypes } from '../Redux/UserRedux';
import { OpenScreenTypes } from '../Redux/OpenScreenRedux';
import { ProductsTypes } from '../Redux/ProductsRedux';
import { SearchTypes } from '../Redux/SearchRedux';
import { ProductTypes } from '../Redux/ProductRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { login, logout } from './LoginSagas';
import { signup } from './SignupSagas';
import { openScreen } from './OpenScreenSagas';
import {
  syncProducts,
  getProductManuals,
  getProductManual,
  syncProduct,
  subscribeProduct,
  unsubscribeProduct
} from './ProductsSagas';
import { searchProducts } from './SearchSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(LoginTypes.REQUEST_LOGIN, login, api),
    takeLatest(UserTypes.REQUEST_LOGOUT, logout, api),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),
    takeLatest(SignupTypes.REQUEST_SIGNUP, signup, api),
    takeLatest(ProductsTypes.REQUEST_SYNC_SUBSCRIPTIONS, syncProducts, api),
    takeLatest(ProductsTypes.REQUEST_UPDATE_PRODUCT, getProductManuals, api),
    takeLatest(ProductsTypes.REQUEST_SET_PRODUCT_MANUAL, getProductManual, api),
    takeLatest(SearchTypes.REQUEST_SEARCH_PRODUCTS, searchProducts, api),
    takeLatest(ProductTypes.REQUEST_GET_PRODUCT, syncProduct, api),
    takeLatest(ProductsTypes.REQUEST_SUBSCRIBE_PRODUCT, subscribeProduct, api),
    takeLatest(ProductsTypes.REQUEST_UNSUBSCRIBE_PRODUCT, unsubscribeProduct, api)
  ];
}
