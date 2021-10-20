import Highcharts, { Options } from "highcharts";
import AccessibilityModule from "highcharts/modules/accessibility";
import DataModule from "highcharts/modules/data";
import BoostModule from "highcharts/modules/boost";
import TreemapModule from "highcharts/modules/treemap";

import { globalOptions, getChartOptions } from "./options";

/** Add Modules */
AccessibilityModule(Highcharts);
BoostModule(Highcharts);
DataModule(Highcharts);
TreemapModule(Highcharts);

Highcharts.setOptions(globalOptions);

export { Highcharts, Options, getChartOptions };
