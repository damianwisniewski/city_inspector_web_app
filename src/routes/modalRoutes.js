import HelpPopup from '../containers/ModalViews/HelpPopup/HelpPopup'
import LoginPopup from '../containers/ModalViews/LoginPopup/LoginPopup'
import ForgottenPassPopup from '../containers/ModalViews/ForgottenPassPopup/ForgottenPassPopup'
import SignupPopup from '../containers/ModalViews/SignupPopup/SignupPopup'

/**
 * @typedef {Object} ModalRoute
 * @property {string} Route.path - Url path
 * @property {string} Route.component - Component to render
 * @property {boolean} Route.darkOverlay - Is path exact
 * @property {boolean} Route.closeButton - Nested routes
 */

/**
 * Routes
 * @type {ModalRoute[]}
 */
export default [
	{
		path: 'HelpPopup',
		component: HelpPopup,
		darkOverlay: true,
		closeButton: true,
	},
	{
		path: 'LoginPopup',
		component: LoginPopup,
		darkOverlay: true,
		closeButton: true,
	},
	{
		path: 'ForgottenPassPopup',
		component: ForgottenPassPopup,
		darkOverlay: true,
		closeButton: true,
	},
	{
		path: 'SignupPopup',
		component: SignupPopup,
		darkOverlay: true,
		closeButton: true,
	},
	{
		path: 'LogoutPopup',
		component: LoginPopup,
		darkOverlay: true,
		closeButton: true,
	},
]
