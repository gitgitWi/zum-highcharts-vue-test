import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import AccessibilityModule from "highcharts/modules/accessibility";
import DataModule from "highcharts/modules/data";
import BoostModule from "highcharts/modules/boost";
import HeatmapModule from "highcharts/modules/heatmap";
import TreemapModule from "highcharts/modules/treemap";
import ExportingModule from "highcharts/modules/exporting";
import SeriesLabelModule from "highcharts/modules/series-label";

import { globalOptions } from "./options";

/** Add Modules */
AccessibilityModule(Highcharts);
BoostModule(Highcharts);
DataModule(Highcharts);
HeatmapModule(Highcharts);
TreemapModule(Highcharts);
ExportingModule(Highcharts);
SeriesLabelModule(Highcharts);

Highcharts.setOptions(globalOptions);

export { HighchartsVue };
