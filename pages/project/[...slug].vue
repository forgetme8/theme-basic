<script setup>

const merchantInfo = await stateMerchant.info(true)
const projectId = ref('')

onMounted(() => {
  projectId.value = useRoute().path.split('/').pop()
  const project = merchantInfo.projects.find((project) => project.id === projectId.value);
  if (!project) {
    return navigateTo('/')
  }
});
</script>

<template>
  <NuxtLayout name="simplified" :merchant="merchantInfo">
    <HomeTheme1 :merchant="merchantInfo" :projectId="projectId" />
  </NuxtLayout>
</template>