<template>
    <v-card width="500px">
        <v-card-title>
            Login
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent ref="formRef">
                <v-text-field v-model="email" label="Email" type="email" variant="outlined"
                    :rules="[rules.required, rules.email]" />
                <v-text-field v-model="password" label="Password" type="password" variant="outlined"
                    :rules="[rules.required, rules.minLength, rules.maxLength]" />
                <v-btn variant="text" @click="loginHandler">
                    Login
                </v-btn>
                <v-btn variant="text" @click="cancelHandler">
                    Cancel
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { useSnackToast } from '@/stores/snackToast';
import { ref, unref } from 'vue';

const email = ref("");
const password = ref("")
const formRef = ref();

const rules = {
    required: (val: string) => !!val || 'Required',
    email: (val: string) => !!val.match(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/) || 'Invalid email',
    minLength: (val: string, min = 6) => val?.length >= min || `Minimum length is ${min}`,
    maxLength: (val: string, max = 30) => val?.length <= max || `Maximum length is ${max}`
}

const { login } = useAuthStore();

const { showSnackBar } = useSnackToast();

const loginHandler = async () => {
    const { valid: isValidForm } = await unref(formRef).validate();

    if (isValidForm) {
        const user = await login({ email: email.value, password: password.value });

        if (user) {
            router.push("/");
        } else {
            showSnackBar("Login Failed");
        }
    } else {
        showSnackBar("Invalid Form");
    }
}

const cancelHandler = () => {
    unref(formRef)?.reset();
}
</script>