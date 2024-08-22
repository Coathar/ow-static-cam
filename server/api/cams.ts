import { CameraPreset } from "~/CameraPreset";
import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

const storage = createStorage({
  driver: fsLiteDriver({ base: "./server/presets" }),
});

export default defineEventHandler(async (event) => {
  const keys = await storage.getKeys();
  const presets = (await storage.getItems<CameraPreset>(keys)).map(
    (x) => x.value,
  );

  for (const preset of presets) {
    preset.mapCameras = preset.mapCameras?.sort((a, b) =>
      a.map.localeCompare(b.map),
    );
  }

  return presets;
});
