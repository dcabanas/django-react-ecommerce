import axios from 'axios'
import {
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_CREATE_FAIL,
   ORDER_CREATE_RESET,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = order => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_CREATE_REQUEST,
      })

      const { userInfo } = getState().userLogin

      const config = {
         headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(`/api/orders/add/`, order, config)

      dispatch({
         type: ORDER_CREATE_SUCCESS,
         payload: data,
      })

      dispatch({ type: CART_CLEAR_ITEMS })
      localStorage.removeItem('cartItems')

      dispatch({ type: ORDER_CREATE_RESET })
   } catch (error) {
      dispatch({
         type: ORDER_CREATE_FAIL,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      })
   }
}
