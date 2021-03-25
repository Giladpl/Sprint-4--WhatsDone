<template>
	<section class="login-page">
		<div class="container" :class="{'right-panel-active' : isPanel}">
			<div v-if="loggedinUser">
				<h3>Loggedin User:</h3>
				<h3>{{ loggedinUser.fullname }}</h3>
				<router-link to="/profile">User details</router-link>
				<button @click="doLogout">Logout</button>
			</div>
			<div v-else>
				<div class="form-container login-container">
					<form @submit.prevent="doLogin">
						<h1>Login</h1>
						<div>{{msg}}</div>
						<input
							type="text"
							v-model="loginCred.username"
							placeholder="User name"
						/>
						<input
							type="text"
							v-model="loginCred.password"
							placeholder="Password"
						/>
						<button>Login</button>
					</form>
				</div>
				<div class="form-container sign-up-container">
					<form @submit.prevent="doSignup">
						<h1>Sign Up</h1>
						<div>{{msg}}</div>
						<input
							type="text"
							v-model="signupCred.fullname"
							placeholder="Your full name"
						/>
						<input
							type="text"
							v-model="signupCred.password"
							placeholder="Password"
						/>
						<input
							type="text"
							v-model="signupCred.username"
							placeholder="Username"
						/>
						<input
							type="text"
							v-model="signupCred.imgUrl"
							placeholder="Add img"
						/>
						<button>Signup</button>
					</form>
				</div>
				<div class="overlay-container">
					<div class="overlay">
						<div class="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>To keep connected with us please login with your personal info</p>
							<button class="ghost" id="signIn" @click="onLogin">Login</button>
						</div>
						<div class="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<button class="ghost" id="signUp" @click="onSignUp">Sign Up</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			msg: '',
			loginCred: { username: 'shraga', password: '1234' },
			signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
			isPanel: false
		};
	},
	computed: {
		users() {
			return this.$store.getters.users;
		},
		loggedinUser() {
			return this.$store.getters.loggedInUser;
		},
	},
	methods: {
		onSignUp() {
			this.isPanel = true
		},
		onLogin() {
			this.isPanel = false
		},
		async doLogin() {
			if (!this.loginCred.username) {
				this.msg = 'Please enter username/password';
				return;
			}
			try {
				await this.$store.dispatch({ type: 'login', userCred: this.loginCred });
				// this.$router.push('/board/6059efa4364773a1b1dba789');
				this.$router.push('/board');
			} catch (err) {
				console.log(err);
				this.msg = 'Failed to login';
			}
		},
		doLogout() {
			this.$store.dispatch({ type: 'logout' });
		},
		async doSignup() {
			if (
				!this.signupCred.fullname ||
				!this.signupCred.password ||
				!this.signupCred.username
			) {
				this.msg = 'Please fill up the form';
				return;
			}
			await this.$store.dispatch({ type: 'signup', userCred: this.signupCred });
			this.$router.push('/board');
		},
		loadUsers() {
			this.$store.dispatch({ type: 'loadUsers' });
		},
		async removeUser(userId) {
			try {
				await this.$store.dispatch({ type: 'removeUser', userId });
				this.msg = 'User removed';
			} catch (err) {
				this.msg = 'Failed to remove user';
			}
		},
	},
	created() {
		// this.loadUsers();
	},
};
</script>
