export class GraphNodeData {
  image?: string;
  label?: string;
  isDisabled?: boolean;
  isParent?: boolean;
  isTruncate?: boolean;
  enableSourceHandle?: boolean;
  enableTargetHandle?: boolean;
  updateSourceHandle?: (enable: boolean) => void;
  updateTargetHandle?: (enable: boolean) => void;
  enable?: () => void;
  disable?: () => void;

  constructor(
    image?: string,
    label?: string,
    isDisabled?: boolean,
    isParent?: boolean,
    isTruncate?: boolean,
    enableSourceHandle?: boolean,
    enableTargetHandle?: boolean
  ) {
    this.image = image;
    this.label = label;
    this.isDisabled = isDisabled;
    this.isParent = isParent;
    this.isTruncate = isTruncate;
    this.enableSourceHandle = enableSourceHandle;
    this.enableTargetHandle = enableTargetHandle;
    this.updateSourceHandle = (enable: boolean) => {
      this.enableSourceHandle = enable;
    };
    this.updateTargetHandle = (enable: boolean) => {
      this.enableTargetHandle = enable;
    };
    this.enable = () => {
      this.isDisabled = false;
    };
    this.disable = () => {
      this.isDisabled = true;
    };
  }
}