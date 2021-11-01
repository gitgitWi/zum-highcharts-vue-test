import {
  ChartOptions,
  DataLabelsOptions,
  Options,
  PlotOptions,
  PlotTreemapLevelsOptions,
  PointOptionsObject,
  SeriesTreemapOptions,
  SubtitleOptions,
  TitleOptions,
  TooltipOptions,
} from "@/components/highcharts/types";
import {
  PointEventsOptionsObject,
  XAxisOptions,
  YAxisOptions,
} from "highcharts";

interface AxisOptionsObject {
  xAxis?: XAxisOptions;
  yAxis?: YAxisOptions;
}

export abstract class TreemapOptionBuilder {
  protected options: Options = {};

  protected setTitle(titleOptions: TitleOptions): this {
    this.options.title = titleOptions;
    return this;
  }

  protected setSubTitle(subTitleOptions: SubtitleOptions): this {
    this.options.subtitle = subTitleOptions;
    return this;
  }

  protected setChartOption(chartOptions: ChartOptions): this {
    this.options.chart = chartOptions;
    return this;
  }

  protected setAxisOption(axisOptions: AxisOptionsObject): this {
    if ("xAxis" in axisOptions) this.options.xAxis = axisOptions["xAxis"];
    if ("yAxis" in axisOptions) this.options.yAxis = axisOptions["yAxis"];
    return this;
  }

  protected setTooltip(tooltipOptions: TooltipOptions): this {
    this.options.tooltip = tooltipOptions;
    return this;
  }

  protected setPlotOptions(plotOptions: PlotOptions): this {
    this.options.plotOptions = plotOptions;
    return this;
  }

  /** @description 트리맵에서 단일 차트만 사용하므로 시리즈는 하나만 들어감 */
  protected setDefaultSeriesOptions(): this {
    this.options.series = [
      { type: "treemap", levelIsConstant: true } as SeriesTreemapOptions,
    ];

    return this;
  }

  /**
   *
   * @param seriesOptions Series 속성 정의, levelOptions 추가하기 전에 하는 것이 좋음
   * @returns
   */
  protected setSeriesOptions(
    seriesOptions: Omit<SeriesTreemapOptions, "type">
  ): this {
    if (!this.options?.series?.[0]) throw Error(`Series must be initialized`);
    Object.assign(this.options.series[0], seriesOptions);
    return this;
  }

  protected setSeriesPointEventOptions(
    pointEventOptions: PointEventsOptionsObject
  ): this {
    if (!this.options?.series?.[0]) throw Error(`Series must be initialized`);
    const series = this.options.series[0] as SeriesTreemapOptions;

    Object.assign(series, { point: pointEventOptions });
    return this;
  }

  protected setLevelOptions(levelOptions: PlotTreemapLevelsOptions): this {
    if (!this.options?.series?.[0]) throw Error(`Series must be initialized`);

    const series = this.options.series[0] as SeriesTreemapOptions;
    series.levels = series.levels
      ?.filter(({ level }) => level !== levelOptions.level)
      .concat(levelOptions);

    return this;
  }

  protected setDataLabelOptions(
    targetLevelNumber: number,
    dataLabelOptions: DataLabelsOptions
  ): this {
    const targetLevel = (
      this.options.series?.[0] as SeriesTreemapOptions
    ).levels?.find(({ level }) => level === targetLevelNumber);
    if (!targetLevel) throw Error(`There is No target level`);

    Object.assign(targetLevel.dataLabels, dataLabelOptions);
    return this;
  }

  public setSeriesData(data: PointOptionsObject[]): this {
    if (!this.options?.series?.[0]) throw Error(`Series must be initialized`);
    Object.assign(this.options.series[0], { data });
    return this;
  }

  /**
   *
   * @param color borderColor, backgroundColor
   * @returns
   */
  public setThemeColor(color: string): this {
    const { series, chart } = this.options;

    if (!series?.[0]) throw Error(`Series must be initialized`);
    const series0 = series[0] as SeriesTreemapOptions;
    if (!series0?.levels?.[0]) throw Error(`LevelOptions must be set`);

    Object.assign(chart, { backgroundColor: color });
    Object.assign(series0, { borderColor: color });
    Object.assign(series0.levels[0].dataLabels, { backgroundColor: color });
    return this;
  }

  public build(): Options {
    if (!(this.options?.series?.[0] as SeriesTreemapOptions)?.data)
      throw Error(`Data Must be Added!`);
    return this.options;
  }
}
