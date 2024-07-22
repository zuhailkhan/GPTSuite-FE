<template>
    <div>
        Welcome {{ user?.username ?? 'User' }}
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const { user } = useAuthStore();
</script>

<style scoped></style>