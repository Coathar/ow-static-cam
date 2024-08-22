import { Camera, MapCameras } from "~/CameraPreset";
import ws from "./workshop.txt";

export default defineEventHandler(async (event) => {
  const { mapCamera } = await readBody<{
    mapCamera: MapCameras;
  }>(event);

  if (!mapCamera || !mapCamera.cameras) {
    createError({ statusCode: 500, statusMessage: "No map cameras provided" });
  }

  let cameras = mapCamera.cameras.map(
    (item) =>
      new Camera(
        item.positionX,
        item.positionY,
        item.positionZ,
        item.rotationX,
        item.rotationY,
        item.rotationZ,
        item.fov,
      ),
  );

  let locationArray =
    "Array(" + cameras.map((x: Camera) => x.positionVector()).join(",") + ")";

  let rotationArray =
    "Array(" + cameras.map((x: Camera) => x.rotationVector()).join(",") + ")";

  let fovArray =
    "Array(" + cameras.map((x) => getZoomTicks(x.fov)).join(",") + ")";

  let compiled = ws
    .replace("<MapName>", mapCamera.map)
    .replace("<CameraLocations>", locationArray)
    .replace("<CameraFacings>", rotationArray)
    .replace("<CameraFOVs>", fovArray);

  return compiled;
});

function getZoomTicks(fov: number): number {
  let zoom = 0;
  let zoomPercent = 0.05;
  let calculatedFOV = 70;
  let previousFOV = calculatedFOV;

  // Approximate the amount of zoom needed
  while (calculatedFOV > fov) {
    previousFOV = calculatedFOV;
    calculatedFOV -= calculatedFOV * zoomPercent;

    zoom++;
  }

  // If previous FOV is closer to our target one reduce the zoom level by one
  if (Math.abs(fov - previousFOV) < Math.abs(fov - calculatedFOV)) {
    return zoom - 1;
  }

  return zoom;
}
