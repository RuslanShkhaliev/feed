<script setup lang="ts">
import AuthForm, { type AuthFormData, FormType } from './AuthForm.vue'
import { authService } from './service.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ROUTE_LOGIN, ROUTE_REGISTRATION } from './routes.ts'
import { TOAST_KEY_APP, useToast } from '../../plugins/toast.ts'

const route = useRoute()
const isLoginRoute = computed(() => route.name === ROUTE_LOGIN)
const appToast = useToast()

const onSubmit = async (data: AuthFormData) => {
	if (isLoginRoute.value) {
		try {
			return await authService.login(data)
		} catch (error) {
			appToast.info({
				summary: 'Login failed',
				group: TOAST_KEY_APP,
			})
		}
	} else {
		await authService.register(data as Required<AuthFormData>)
	}
}

const formType = computed<FormType>(() => (isLoginRoute.value ? FormType.Login : FormType.Register))

const link = computed(() => ({
	text: isLoginRoute.value ? 'Registration' : 'Login',
	to: isLoginRoute.value ? ROUTE_REGISTRATION : ROUTE_LOGIN,
}))
</script>

<template>
	<div>
		<AuthForm @submit="onSubmit" :view="formType" :key="isLoginRoute" />
		<RouterLink :to="{ name: link.to }">
			{{ link.text }}
		</RouterLink>
	</div>
</template>

<style scoped></style>
