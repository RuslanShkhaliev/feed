<script setup lang="ts">
import { Button } from 'primevue';
import { authService } from '@/modules/auth';
import { useProfileStore } from '@/modules/profile';

const { user } = useProfileStore();
const logout = () => {
	authService.logout();
};
</script>

<template>
  <header class="flex justify-center w-full">
    <div class="flex w-full max-w-[1240px] justify-between items-center py-3">
      <div>
        <a>Logo</a>
      </div>
      <div>
        <div>{{ user.email }}</div>
        <Button @click="logout">Logout</Button>
      </div>
    </div>
  </header>
</template>
