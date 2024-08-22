export class CameraPreset {
  name: string | undefined;

  mapCameras: MapCameras[] | undefined;
}

export class MapCameras {
  map: string;

  cameras: Camera[];

  constructor(map: string, cameras: Camera[]) {
    this.map = map;
    this.cameras = cameras;
  }
}

export class Camera {
  positionX: number;
  positionY: number;
  positionZ: number;

  rotationX: number;
  rotationY: number;
  rotationZ: number;

  fov: number;

  constructor(
    positionX: number,
    positionY: number,
    positionZ: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    fov: number,
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;

    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.rotationZ = rotationZ;

    this.fov = fov;
  }

  positionVector(): string {
    return (
      "Vector(" +
      this.positionX +
      ", " +
      this.positionY +
      ", " +
      this.positionZ +
      ")"
    );
  }

  rotationVector(): string {
    return (
      "Vector(" +
      this.rotationX +
      ", " +
      this.rotationY +
      ", " +
      this.rotationZ +
      ")"
    );
  }
}
