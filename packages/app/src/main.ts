import { define, Auth, History, Switch } from '@calpoly/mustang'
import { Header } from './components/blz-header.ts'
import { FoodView } from './views/food-view.ts'
import { HomeView } from './views/home-view.ts'

// Define custom elements
define({
	'mu-auth': Auth.Provider,
	'mu-history': History.Provider,
	'mu-switch': Switch.Element,
	'blz-header': Header,
	'food-view': FoodView,
	'home-view': HomeView,
})

// Simple routing setup
window.addEventListener('DOMContentLoaded', () => {
	console.log('App initialized')
})
