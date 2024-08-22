<script setup lang="ts">
const { data } = await useFetch("/api/cams");
const selectedPreset = ref(null);
const selectedMapCamera = ref(null);

useHead({
  title: "Overwatch Static Cam Setup",
});

useSeoMeta({
  title: "Overwatch Static Cam Setup",
  ogTitle: "Overwatch Static Cam Setup",
  description: "Utility to setup static cameras for Overwatch",
  ogDescription: "Utility to setup static cameras for Overwatch",
});

async function exportScript() {
  if (selectedPreset.value === null || selectedMapCamera.value === null) {
    alert("Select a preset and map to export.");
    return;
  }

  const res = await $fetch("/api/create-script", {
    method: "POST",
    body: {
      mapCamera: selectedMapCamera.value,
    },
  });

  await navigator.clipboard.writeText(res);
  alert("Copied Workshop Script to clipboard");
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="pb-4 text-2xl">Overwatch Static Cam Setup</h1>
    <UForm class="space-y-4">
      <UFormGroup label="Preset">
        <USelectMenu
          :options="data"
          option-attribute="name"
          v-model="selectedPreset"
          placeholder="Select Preset"
        />
      </UFormGroup>

      <UFormGroup label="Map">
        <USelectMenu
          :options="selectedPreset?.mapCameras"
          option-attribute="map"
          v-model="selectedMapCamera"
          :disabled="!selectedPreset"
          placeholder="Select Map"
        />
      </UFormGroup>

      <UButton @click="exportScript" class="text-l">
        Export Workshop Script
      </UButton>
    </UForm>

    <h1 class="pb-4 pt-4 text-2xl">How to Use</h1>
    <ol class="list-decimal p-2">
      <li class="pb-2">
        Select a preset and map above and click Export Workshop Script
      </li>
      <li class="pb-2">
        Create a new custom game, go to Settings and select "Import Settings"
      </li>
      <li class="pb-2">Move yourself to spectator and start the game</li>
      <li class="pb-2">
        Once in game you can spectate the Torbjorn bot and save cameras using
        Ctrl + 1-9. Pressing your "Move Fast" hotkey will move the bot to the
        next camera position.
        <ul class="mt-2 list-disc space-y-1 ps-5">
          <li class="pb-2">
            Pressing your "Spectate Toggle 3p" hotkey is optional but useful if
            you'd like to see what the camera will be looking at. Saving cameras
            while spectating players will always use their facing direction.
          </li>
          <li class="pb-2">
            If you need to change your FOV you must leave first person
            spectating, modify the FOV, and re-enter spectating. It will not
            look like you have a modified view while spectating the bot but it
            will save your modified FOV. You can double tap your "Modify FOV"
            hotkey to reset back to your normal FOV. Zooming back out is NOT the
            same as resetting and zooming back in.
          </li>
          <li class="pb-2">
            Zoom ticks are estimated based on 5% change at max 70 FOV.
          </li>
          <li class="pb-2">
            Should the bot die you can still set your camera while spectating
            it.
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>
