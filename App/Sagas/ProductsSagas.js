/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects';
import ProductsActions from '../Redux/ProductsRedux';

export function * syncProducts (api, { userId }) {
  const response = yield call(api.getUserSubscriptions, userId);

  if (response.ok) {
    const products = response.data
      .map(product => ({
        ...product,
        isSubscribed: true,
        manuals: []
      }));

    yield put(ProductsActions.syncSubscriptions(products));
  } else {
    // @TODO: handle error
  }
}

export function * getProductManuals (api, { productId }) {
  const response = yield call(api.getProductManuals, productId);

  if (response.ok) {
    const manuals = response.data;

    yield put(ProductsActions.setProductManuals(productId, manuals));
  } else {
    // @TODO: handle error
  }
}

export function * getProductManual (api, { productId, manualId }) {
  const response = yield call(api.getProductManual, productId, manualId);

  if (response.ok) {
    const manual = response.data;

    yield put(ProductsActions.setProductManual(productId, manual));
  } else {
    // @TODO: handle error
  }
}