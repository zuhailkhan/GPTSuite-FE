<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar :title="`Welcome, ${user?.username ?? 'User'}`" flat>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <template #append>
        <v-btn icon @click="toggleTheme">
          <v-icon v-if="isDarkTheme">mdi-weather-sunny</v-icon>
          <v-icon v-else>mdi-weather-night</v-icon>
        </v-btn>
        <v-btn v-if="isLoggedIn" icon @click="logoutHandler">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer :model-value="false">
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center px-5" style="min-height: 100vh;">
      <RouterView></RouterView>
    </v-main>

    <v-snackbar v-model="snackBarVisible" location="top center">
      {{ snackBarMessage }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="closeSnackBar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify';
import { useAuthStore } from './stores/authStore';
import router from './router';
import { storeToRefs } from 'pinia';
import { useSnackToast } from './stores/snackToast';
const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light';
}

const isDarkTheme = computed(() => theme.global.name.value === 'dark');

const { logout } = useAuthStore();

const { isLoggedIn, user } = storeToRefs(useAuthStore())

const { message: snackBarMessage, snackBarVisible } = storeToRefs(useSnackToast());

const { closeSnackBar } = useSnackToast();

const logoutHandler = () => {
  if (!isLoggedIn) {
    return;
  }
  logout()
    .then(() => {
      router.push({ name: 'login' })
    });
}

watch(isLoggedIn, (value) => {
  console.log(value)
})

</script>

<style scoped></style>
