<script setup lang="ts">
import { Toast } from 'primevue';
import { TOAST_KEY_APP } from './plugins/toast.ts';
import { useSignInEffect } from './composables/useSignInEffect.ts';
import { useWatchLogout } from './composables/useWatchLogout.ts';

useSignInEffect();
useWatchLogout();
</script>

<template> 
  <Toast position="top-right"
         :group="TOAST_KEY_APP"
  >
    <template #container="{ message }">
      <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
        <div class="flex items-center gap-5">
          <i class="pi pi-cloud-upload text-white dark:text-black text-2xl"></i>
          <span class="font-bold text-base text-white dark:text-black">{{ message.summary }}</span>
        </div>
      </section>
    </template> 
  </Toast>
  <RouterView />
</template>
