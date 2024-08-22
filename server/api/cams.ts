import { readFile, opendir } from "node:fs/promises";
import path from "node:path";
import { CameraPreset } from "~/CameraPreset";

export default defineEventHandler(async (event) => {
  const target = path.join(process.cwd(), "Cameras", "presets");
  const files = await opendir(target);
  const presets: CameraPreset[] = [];

  for await (const file of files) {
    if (file.isFile() && file.name.endsWith(".json")) {
      const preset = JSON.parse(
        await readFile(path.join(target, file.name), "utf-8"),
      ) as CameraPreset;

      preset.mapCameras = preset.mapCameras?.sort((a, b) =>
        a.map.localeCompare(b.map),
      );

      presets.push(preset);
    }
  }

  return presets;
});
