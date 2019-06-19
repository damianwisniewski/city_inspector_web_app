import MapView from '../containers/MainViews/MapView/MapView'
import NewNotification from '../containers/MainViews/NewNotification/NewNotification'
import YourNotification from '../containers/MainViews/YourNotification/YourNotification'
import Subscription from '../containers/MainViews/Subscription/Subscription'
import Settings from '../containers/MainViews/Settings/Settings'
import Notification from '../containers/MainViews/Notification/Notification'
import NotFound from '../containers/MainViews/NotFound/NotFound'

/**
 * @typedef {Object} MainRoute
 * @property {string} Route.path - Url path
 * @property {string} Route.component - Component to render
 * @property {boolean} Route.exact - Is path exact
 * @property {Route[]=} Route.routes - Nested routes
 */

/**
 * Routes
 * @type {MainRoute[]}
 */
export default [
	{
		path: '/',
		component: MapView,
		exact: true,
		authNeeded: false,
	},
	{
		path: '/nowe_zgloszenie',
		component: NewNotification,
		exact: true,
		authNeeded: true,
	},
	{
		path: '/twoje_zgloszenia',
		component: YourNotification,
		exact: true,
		authNeeded: true,
	},
	{
		path: '/subskrypcje',
		component: Subscription,
		exact: true,
		authNeeded: true,
	},
	{
		path: '/ustawienia',
		component: Settings,
		exact: true,
		authNeeded: true,
	},
	{
		path: '/zgloszenie/:id',
		component: Notification,
		exact: true,
		authNeeded: false,
	},
	{
		path: null,
		component: NotFound,
		exact: false,
		authNeeded: false,
	},
]
