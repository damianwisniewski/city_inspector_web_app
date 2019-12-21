import { SET_IS_MOBILE } from '../actionTypes/envStatusActionTypes'

export const setIsMobile = isMobile => ({
	type: SET_IS_MOBILE,
	isMobile,
})
