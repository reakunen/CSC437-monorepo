export default {
	server: {
		proxy: {
			'/api': 'http://localhost:3000',
			'/auth': 'http://localhost:3000',
			'/images': 'http://localhost:3000',
			'/login.html': 'http://localhost:3000',
			'/register.html': 'http://localhost:3000',
			'/styles': 'http://localhost:3000',
		},
	},
}
