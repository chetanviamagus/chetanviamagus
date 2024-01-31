//Props for charts
interface BarChartLegend {
  label: string;
  fillColor: string;
}
export interface IBaseLegendProps {
  className?: string;
  shape?: string;
  label?: string;
  fillColor?: string;
  labelClassNames?: string;
}

export interface BaseChartProps {
  id?: string;
  variant?: string;
  basicData?: object;
  totalValue?: string;
  getLightTheme?: any;
  className?: string;
  chartContainerClassName?: string;
  title?: string;
  label?: string;
  secondaryLabel?: string;
  badgeValue?: string;
  labelContainerClassName?: string;
  titleClassName?: string;
  labelClassName?: string;
  legendClassNames?: string;
  legendClassName?: string;
  legendContainerClassName?: string;
  legendLabels?: BarChartLegend[];
  individualLegendClass?: string;
  centerText?: any;
  hideLabel?: boolean;
  chartData?: any;
  lightOptions?: any;
  boxComponentData?: any;
  style?: any;
  hideLegend?: boolean;
  chartLabel?: string;
  yAxisLabelClassNames?: string;
  isLoading?: boolean;
  loader?: boolean;
  loaderHeight?: string;
  linkButtonLabel?: string;
  linkPath?: string;
}

//Stepper component
export interface IStepperModel {
  label: string;
  subLabel?: string;
  subLabelPlaceholder?: boolean;
  state?: string | undefined; //To set the icon state
  path?: string;
  icon?: string;
  textClassName?: string;
  command?: () => void;
}

// ----------------------- Button Icon ------------------------- //
export interface IButtonIcon {
  type: string;
  iconClassName?: string;
  disabled?: boolean;
  toggle?: boolean;
  onClick?: (e?: any) => void;
  className?: string;
  label?: string;
  sizeFull?: boolean;
  blinkStyles?: string;
  buttonLabelArgs?: any;
}
