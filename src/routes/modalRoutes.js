import HelpModal from '../containers/ModalViews/HelpModal/HelpModal'
import LoginModal from '../containers/ModalViews/LoginModal/LoginModal'
import ForgottenPassModal from '../containers/ModalViews/ForgottenPassModal/ForgottenPassModal'
import SignupModal from '../containers/ModalViews/SignupModal/SignupModal'
import LogoutModal from '../containers/ModalViews/LogoutModal/LogoutModal'

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
		path: 'HelpModal',
		component: HelpModal,
		darkOverlay: true,
		closeButton: true,
	},
	{
		path: 'LoginModal',
		component: LoginModal,
		darkOverlay: true,
		closeButton: true,
	},
	{
		path: 'ForgottenPassModal',
		component: ForgottenPassModal,
		darkOverlay: true,
		closeButton: true,
	},
	{
		path: 'SignupModal',
		component: SignupModal,
		darkOverlay: true,
		closeButton: true,
	},
	{
		path: 'LogoutModal',
		component: LogoutModal,
		darkOverlay: true,
		closeButton: true,
	},
]
