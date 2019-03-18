import AxesType from './axes';
import DisplayTfType from './displayTf';
import PoseType from './pose';
import RobotType from './robot';


const types = {
  AXES: AxesType,
  DISPLAY_TF: DisplayTfType,
  POSE: PoseType,
  ROBOT: RobotType
};

export default function getTypes(type, scene, index, ros) {
  return types[type](scene, index, ros);
}
