<script lang="ts">
export interface AuthFormData {
	email: string;
	password: string;
	passwordConfirm?: string;
}
export enum FormType {
	Login = 'login',
	Register = 'register',
}
</script>

<script setup lang="ts">
import { Form, FormField, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms';
import { Button, InputText, Message, Password } from 'primevue';

import { computed, reactive } from 'vue';

const props = defineProps<{
	view: FormType;
}>();
const emit = defineEmits<{
	submit: [data: AuthFormData];
}>();

const initialValues = reactive<AuthFormData>({
	email: '',
	password: '',
	passwordConfirm: '',
});

const isDisabled = computed(() => {
	const { email, password } = initialValues;

	const formData = props.view === 'login' ? { email, password } : initialValues;
	return Object.values(formData).some((val) => !val.length);
});

const resolver = ({ values }: FormResolverOptions) => {
	const errors = {};

	if (!values.email) {
		Reflect.set(errors, 'email', [{ message: 'Email is required.' }]);
	}
	if (!values.password) {
		Reflect.set(errors, 'password', [{ message: 'Password is required.' }]);
	}
	if (props.view === FormType.Register && !values.passwordConfirm) {
		Reflect.set(errors, 'passwordConfirm', [{ message: 'Confirm password is required.' }]);
	}

	return {
		values,
		errors,
	};
};

const onFormSubmit = ({ values, valid }: FormSubmitEvent) => {
	if (valid) {
		emit('submit', values as AuthFormData);
	}
};
</script>

<template>
	<div class="card flex justify-center">
		<Form
			:initialValues
			:resolver
			@submit="onFormSubmit"
			class="flex flex-col gap-4 w-full sm:w-56"
			v-slot="$form"
		>
			<div class="flex flex-col gap-4">
				<FormField v-slot="$field" name="email" initialValue="mamba@mail.ru">
					<label for="email">Email</label>
					<InputText id="email" type="text" fluid v-model.trim="initialValues.email" />
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
						{{ $field.error.message }}
					</Message>
				</FormField>
				<FormField v-slot="$field" name="password">
					<label for="password">Password</label>
					<Password
						id="password"
						type="password"
						v-model.trim="initialValues.password"
						:feedback="false"
						toggle-mask
						fluid
						required
					/>
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error.message
					}}</Message>
				</FormField>
				<FormField v-if="view === FormType.Register" v-slot="$field" name="passwordConfirm">
					<label for="password-confirm">Confirm password*</label>
					<Password
						id="password-confirm"
						type="password-confirm"
						v-model.trim="initialValues.passwordConfirm"
						:feedback="false"
						toggle-mask
						fluid
					/>
					<Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
						$field.error.message
					}}</Message>
				</FormField>
			</div>
			<Button
				:disabled="!$form.valid || isDisabled"
				type="submit"
				severity="secondary"
				label="Войти"
			/>
		</Form>
	</div>
</template>

<style scoped></style>
