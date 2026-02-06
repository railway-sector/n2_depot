import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import {
  CalciteShellPanel,
  CalciteActionBar,
  CalciteAction,
  CalcitePanel,
} from "@esri/calcite-components-react";
import { useEffect, useState } from "react";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-legend";

function ActionPanel() {
  const [activeWidget, setActiveWidget] = useState(null);
  const [nextWidget, setNextWidget] = useState(null);

  useEffect(() => {
    if (activeWidget) {
      const actionActiveWidget = document.querySelector(
        `[data-panel-id=${activeWidget}]`,
      );
      actionActiveWidget.hidden = true;
    }

    if (nextWidget !== activeWidget) {
      const actionNextWidget = document.querySelector(
        `[data-panel-id=${nextWidget}]`,
      );
      actionNextWidget.hidden = false;
    }
  });

  return (
    <>
      <CalciteShellPanel
        width="1"
        slot="panel-start"
        position="start"
        id="left-shell-panel"
        displayMode="dock"
      >
        <CalciteActionBar
          slot="action-bar"
          style={{
            borderStyle: "solid",
            borderRightWidth: 3.5,
            borderLeftWidth: 3.5,
            borderBottomWidth: 4.5,
            borderColor: "#555555",
          }}
        >
          <CalciteAction
            data-action-id="layers"
            icon="layers"
            text="layers"
            id="layers"
            //textEnabled={true}
            onClick={(event) => {
              setNextWidget(event.target.id);
              setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
            }}
          ></CalciteAction>

          <CalciteAction
            data-action-id="basemaps"
            icon="basemap"
            text="basemaps"
            id="basemaps"
            onClick={(event) => {
              setNextWidget(event.target.id);
              setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
            }}
          ></CalciteAction>

          <CalciteAction
            data-action-id="information"
            icon="information"
            text="Information"
            id="information"
            onClick={(event) => {
              setNextWidget(event.target.id);
              setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
            }}
          ></CalciteAction>
        </CalciteActionBar>

        <CalcitePanel
          heading="Layers"
          height="l"
          width="l"
          data-panel-id="layers"
          hidden
          style={{ width: "21vw" }}
        >
          <arcgis-layer-list
            referenceElement="arcgis-scene"
            selectionMode="multiple"
            visibilityAppearance="checkbox"
            // show-collapse-button
            // show-filter
            // filter-placeholder="Filter layers"
            listItemCreatedFunction={(event) => {
              const { item } = event;
              if (item.layer.type !== "group") {
                item.panel = {
                  content: "legend",
                  open: true,
                  visible: true,
                };
              }
            }}
          ></arcgis-layer-list>
        </CalcitePanel>

        <CalcitePanel
          heading="Basemaps"
          height="l"
          data-panel-id="basemaps"
          style={{ width: "21vw" }}
          hidden
        >
          <arcgis-basemap-gallery referenceElement="arcgis-scene"></arcgis-basemap-gallery>
        </CalcitePanel>

        <CalcitePanel heading="Description" data-panel-id="information" hidden>
          {nextWidget === "information" ? (
            <div style={{ paddingLeft: "20px" }}>
              This smart map shows the construction progress on structural
              components of depot buildings:
              <ul>
                <li>Structural Foundation, </li>
                <li>Structural Column, </li>
                <li>Structural Framing, </li>
                <li>Roofs, </li>
                <li>Floors, </li>
                <li>Walls, </li>
                <li>Others </li>
              </ul>
              <div style={{ paddingLeft: "20px" }}>
                <li>
                  The source of data: <b>BIM models.</b>
                </li>
                <li>
                  {" "}
                  The construction progress is manually updated based on the
                  information provided by the N2 Civil Team.
                </li>
              </div>
            </div>
          ) : (
            <div className="informationDiv" hidden></div>
          )}
        </CalcitePanel>
      </CalciteShellPanel>
    </>
  );
}

export default ActionPanel;
