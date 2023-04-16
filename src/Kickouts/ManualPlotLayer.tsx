import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {
  Circle,
  Circle as CircleStyle,
  Fill,
  Style,
  Text,
  Stroke
} from "ol/style";
import { toLonLat } from "ol/proj";
import { Overlay, Feature, MapBrowserEvent } from "ol";
import mapService from "../component/MapService";
import { renderToString } from "react-dom/server";
import Point from "ol/geom/Point";
import ManualPlotsToolTip from "../Kickouts/ManualPlotsToolTip";
import ManualCodePlot from "./ManualCodePlot";
import React from "react";
import { AcceptApi } from "../component/AcceptApi";

class ManualPlotLayer extends React.Component {
  constructor(props) {
    super(props);
    this._vectorLayer = new VectorLayer({
      minZoom: this._currentZoom,
      source: new VectorSource({
        wrapX: false
      }),
      style: [ManualPlotLayer.DEFAULT_STYLE]
    });

    this.onPointerClick = this.onPointerClick.bind(this);

    console.log("testing2", this.props);
  }

  private _currentZoom = 10;
  private _zoomThreshold = 14;
  private readonly _vectorLayer: VectorLayer<any>;
  private _hidden = false;
  public static sequenceMp: number = 0;
  private static tooltip: HTMLDivElement = document.createElement("div");
  private static isCalloutVisibleMP: boolean = true;
  public static ManualPlotMetaData: ManualCodePlot = {};
  public static redirectingToManualPlot = false;

  static overlayMp = new Overlay({
    element: ManualPlotLayer.tooltip,
    autoPan: {
      animation: {
        duration: 250
      }
    }
  });

  static readonly DEFAULT_STYLE = new Style({
    image: new Circle({
      radius: 6,
      fill: new Fill({
        color: "yellow"
      })
    }),
    text: new Text({
      textBaseline: "bottom",
      font: '9px "Arial"'
      //  text: 'MP',
    }),
    zIndex: 0
  });

  static readonly pointerStyle = new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({ color: "green" })
      //stroke: new Stroke({ color: "white", width: 1})
    })
  });

  static readonly SELECTEDMP_STYLE = new Style({
    image: new Circle({
      radius: 6,

      fill: new Fill({
        color: "yellow"
      }),

      stroke: new Stroke({
        color: "Red",

        width: 1
      })
    }),

    text: new Text({
      textBaseline: "bottom",

      font: '9px "Arial"'

      //  text: 'MP',
    }),

    zIndex: 0
  });

  private onPointerMovempPlots(event: MapBrowserEvent<UIEvent>): void {
    let mpFeatureId;
    let mpPlotFeature = event.map.forEachFeatureAtPixel(
      event.pixel,
      (featureMp) => {
        let mpFeatureId = featureMp.getId();
        console.log("mpFeatureId:", mpFeatureId);
        ManualPlotLayer.tooltip.style.display = "block";
        ManualPlotLayer.tooltip.innerHTML = renderToString(
          <ManualPlotsToolTip
            isVisiblemp={ManualPlotLayer.mpIsCalloutVisible}
            datamp={ManualPlotLayer.mpPlotMetaData}
            featureIdmp={Number(mpFeatureId)}
          />
        );
        ManualPlotLayer.tooltip.innerHTML =
          "<p> mpFeatureId = " + mpFeatureId + "</p>";
        ManualPlotLayer.overlayMp.setPosition(event.coordinate);
        return featureMp;
      }
    );
    if (!mpPlotFeature && mpFeatureId !== "") {
      mpFeatureId = "";
      if (ManualPlotLayer.overlayMp) {
        ManualPlotLayer.overlayMp.setPosition(undefined);
      }
    }
  }

  private onPointerClick(event: MapBrowserEvent<UIEvent>): void {
    // console.log("testing1",this.props.metaData);
    console.log("ManualPlotMetaData", ManualPlotLayer.ManualPlotMetaData);

    /*       const coord = mapService.map.getCoordinateFromPixel(event.pixel);
          console.log("coord", coord); */

    const coord = mapService.map.getCoordinateFromPixel(event.pixel);
    const NewLatLong = toLonLat(coord);
    console.log("New NewLatLong =", NewLatLong);
    ManualPlotLayer.ManualPlotMetaData.longitude = String(NewLatLong[0]);
    ManualPlotLayer.ManualPlotMetaData.latitude = String(NewLatLong[1]);

    const feature = new Feature({
      geometry: new Point(event.coordinate)
    });

    //feature.setStyle(ManualPlotLayer.pointerStyle);

    const source = new VectorSource({
      features: [feature]
    });
    const layer = new VectorLayer({
      source,
      style: ManualPlotLayer.pointerStyle
    });

    ManualPlotLayer.redirectingToManualPlot === true
      ? mapService.map.addLayer(layer)
      : mapService.map.removeLayer(layer);

    const content = document.createElement("div");
    content.innerHTML = `
        <button class="Popup_btn" id="acceptbtn" > Accept</button>
        <button class="Popup_btn" id="cancelbtn"> Cancel</button>
      `;

    /*       content.addEventListener("click", function() {
            console.log("You Clicked Accept");
          }); */

    content.className = "ol-popup";

    const newPopup = new Overlay({
      element: content,
      positioning: "bottom-center",
      stopEvent: true,
      offset: [0, -50]
    });
    ManualPlotLayer.redirectingToManualPlot === true
      ? mapService.map.addOverlay(newPopup)
      : mapService.map.getOverlays().clear();
    newPopup.setPosition(event.coordinate);

    const acpt = content?.querySelector('div > button[id="acceptbtn"]');
    acpt.onclick = function () {
      ManualPlotLayer.redirectingToManualPlot = false;
      layer.getSource().removeFeature(feature);
      mapService.map.getOverlays().clear();
      setTimeout(() => {
        mapService.manualPlotLayer.hide();
      }, "6000");
      console.log(
        "ManualPlotLayer.redirectingToManualPlot :",
        ManualPlotLayer.redirectingToManualPlot
      );

      console.log("Accpet Working Fine");
      // mapService.fdxPlotLayer.refresh()

      return (
        <div>
          {AcceptApi(
            ManualPlotLayer.ManualPlotMetaData.stopId,
            ManualPlotLayer.ManualPlotMetaData.stopIdType,
            ManualPlotLayer.ManualPlotMetaData.latitude,
            ManualPlotLayer.ManualPlotMetaData.longitude
          )}
          {!ManualPlotLayer.redirectingToManualPlot}
          {mapService._fdxPlotsLayer.refresh()}
        </div>
      );
    };

    const ele = content?.querySelector('div > button[id="cancelbtn"]');
    ele.onclick = function () {
      layer.getSource().removeFeature(feature);
      mapService.map.getOverlays().clear();
    };

    mapService.map.on("click", function (event) {
      if (feature) {
        ManualPlotLayer.redirectingToManualPlot === true
          ? mapService.map.addOverlay(newPopup)
          : mapService.map.getOverlays().clear();
        newPopup.setPosition(event.coordinate);
        feature.setStyle(undefined);
        layer.getSource().removeFeature(feature);
      }
    });

    ManualPlotLayer.overlayMp.setPosition(undefined);
  }

  public addPointer(): void {
    if (ManualPlotLayer.redirectingToManualPlot) {
      mapService.map.on("click", this.onPointerClick);
    }
  }

  public mpRegisterOnPointerMoveEventHandler(): void {
    mapService.map.on("pointermove", this.onPointerMovempPlots);
  }

  public addFeature(featureMp: Feature<any>): void {
    this.manualPlotvectorLayer.getSource().addFeature(featureMp);
  }

  public toggleHidden(): void {
    this.hidden = !this.hidden;
    if (this.hidden) this.hide();
    if (!this.hidden && this.currentZoom < this.zoomThreshold) this.show();
  }

  public show(): void {
    this._vectorLayer.setVisible(true);
  }

  public hide(): void {
    this._vectorLayer.setVisible(false);
  }

  get hidden(): boolean {
    return this._hidden;
  }

  set hidden(hidden) {
    this._hidden = hidden;
  }

  get currentZoom() {
    return this._currentZoom;
  }

  get zoomThreshold() {
    return this._zoomThreshold;
  }

  get manualPlotvectorLayer(): VectorLayer<any> {
    return this._vectorLayer;
  }

  render(): React.ReactNode {
    return <div></div>;
  }
}

export default ManualPlotLayer;
