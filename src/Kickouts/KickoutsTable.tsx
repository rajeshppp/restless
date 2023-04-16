import {
  PrimaryButton,
  mergeStyleSets,
  IColumn,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Stack,
  getTheme
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { CSS_CLASSES } from "../Kickouts/StyleConstant";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import axios from "axios";
import CleanseInputs from "./CleanseInputs";
import CandidateTable from "./CandidateTable";
import mapService from "../component/MapService";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import ManualPlotLayer from "./ManualPlotLayer";
import View from "ol/View";

const KickoutsTable: React.FC = (props) => {
  const [tableData, setTableData] = useState([]);
  //  const [tablerowdata, setTablerowdata] =useState([])
  const [selectedItem, setSelectedItem] = useState<{}>("");
  //const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const theme = getTheme();
  const classesStyle = mergeStyleSets({
    cellTitle: {
      color: "black",
      background: "#EDEBE9"
    },
    body: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    topSection: {
      flex: 4,
      display: "flex"
    },
    bottomSection: {
      flex: 3,
      marginTop: 3,
      display: "flex",
      marginLeft: 0
    },
    inputSection: {
      flex: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    kickoutsTableSection: {
      flex: 3,
      marginLeft: 10,
      display: "flex",
      flexDirection: "column"
    },
    tableTitle: {
      ...theme.fonts.mediumPlus,
      fontWeight: "bold"
    },
    tableWrapper: {
      flex: 1,
      position: "relative",
      borderLeft: `1px solid LIGHT_GRAY`,
      borderRight: `1px solid LIGHT_GRAY`,
      borderBottom: `1px solid LIGHT_GRAY`,
      overflow: "auto"
    },
    modalFooter: {
      alignItems: "center",
      justifyContent: "center"
    },
    button: {
      border: "1px solid",
      background: "#4D148C"
    },
    table_cell: {
      fontSize: 11,
      minHeight: "0px !important",
      paddingLeft: "6px !important",
      paddingRight: "6px !important",
      paddingTop: "6px !important",
      paddingBottom: "6px !important",
      height: 28,
      padding: "0px 8px 0px 12px"
    }
  });

  function KickoutsData() {
    //const url = `http://localhost:3005/AMSData`;
    //const url = `http://localhost:8080/delivery-kickouts/201709/152/3152/2023-04-10/2023-04-17`;
    /*    axios.get(`http://localhost:8080/delivery-kickouts/201709/152/3152/2023-04-10/2023-04-17`) */
    axios
      .get(`http://localhost:3005/AMSData`)
      .then((kickoutRes) => {
        console.log("kickoutres:", kickoutRes);
        setTableData(kickoutRes.data);
        console.log("API tableData:", kickoutRes.data[0]);
        console.log("table data1", tableData);
      })
      .catch((err) => console.log(err));
  }

  const kickoutTableColumns: IColumn[] = [
    {
      key: "column1",
      name: "Primary Address",
      fieldName: "address1",
      minWidth: 120,
      maxWidth: 200,
      isResizable: true,
      headerClassName: CSS_CLASSES.tableHeaderLeftBorder,
      styles: classesStyle
    },
    {
      key: "column2",
      name: "City",
      fieldName: "city",
      minWidth: 120,
      maxWidth: 150,
      isResizable: true,
      headerClassName: CSS_CLASSES.tableHeaderLeftBorder,
      styles: classesStyle
    },
    {
      key: "column3",
      name: "State",
      fieldName: "state",
      minWidth: 50,
      isResizable: true,
      headerClassName: CSS_CLASSES.tableHeaderLeftBorder,
      styles: classesStyle
    },
    {
      key: "column4",
      name: "Zip",
      fieldName: "zip",
      minWidth: 50,
      isResizable: true,
      headerClassName: CSS_CLASSES.tableHeaderLeftBorder,
      styles: classesStyle
    },
    {
      key: "column5",
      name: "Valid",
      fieldName: "valid",
      minWidth: 50,
      isResizable: true,
      headerClassName: CSS_CLASSES.tableHeaderLeftBorder,
      styles: classesStyle
    },
    {
      key: "column6",
      name: "GeoCode",
      fieldName: "geocode",
      minWidth: 70,
      isResizable: true,
      headerClassName: CSS_CLASSES.tableHeaderLeftBorder,
      styles: classesStyle
    },
    {
      key: "column7",
      name: "Package Count",
      fieldName: "packagecount",
      minWidth: 100,
      isResizable: true,
      headerClassName: CSS_CLASSES.tableHeaderLeftBorder,
      styles: classesStyle
    },
    {
      key: "column8",
      name: "EFD",
      fieldName: "efd",
      minWidth: 120,
      isResizable: true,
      headerClassName: CSS_CLASSES.tableHeaderLeftBorder,
      styles: classesStyle
    }
  ];

  const renderItemColumn = (item: any, index: number, column: IColumn) => {
    const fieldContent = item[column.fieldName as keyof typeof item] as string;
    switch (column.key) {
      case "address1":
        return <span>{fieldContent}</span>;
      case "city":
        return <span>{fieldContent}</span>;
      case "state":
        return <span>{fieldContent}</span>;
      case "zip":
        return <span>{fieldContent}</span>;
      case "valid":
        return <span>{fieldContent}</span>;
      case "geocode":
        return <span>{fieldContent}</span>;
      case "packagecount":
        return <span>{fieldContent}</span>;
      case "efd":
        return <span>{fieldContent}</span>;
      default:
        return <span>{fieldContent}</span>;
    }
  };

  const onDataInvoked = (tableRowItem: any): void => {
    setSelectedItem(tableRowItem);
  };

  /* const onRenderRow =(props)=>{
    const isRowSelected = selectedItem && selectedItem.primaryAddress === props.tableRowItem.primaryAddress;
    const rowStyle = {
      backgroundColor: isRowSelected? "#e1e1e1": "",
    };
    return (
      <div
        {...props}
        style={rowStyle}
        onClick={() => setSelectedItem(props.tableRowItem)}
     />
    );
  }; */

  /*  const selectRowStyle = {
    selectors:{
      '.ms-DetailsRow.is-selected':{
        backgroundColor:'#F4F4F4'
      }
    }
  };

  const selection = new Selection(); */
  /*  const selectRowStyle = (tableRowItem: any) => {
    return selectedItem && selectedItem.key === tableRowItem.key ? 'selected': '';
  }; */

  /* const onDataInvoked = (tableRowItem: React.SetStateAction<{}>)=> {
    return{
      ...tableRowItem,
      toggleSelected: !tableRowItem.toggleSelected
    };
    // eslint-disable-next-line
    setSelectedItem(tableRowItem);
}
   
  const conditionalRowStyle = [
    {
      when: (selectedItem: { toggleSelected: any; }) => selectedItem.toggleSelected,
      style:{
        backgroundColor:"green",
        userSelect:"none"
      }
    }
  ]; */
  /*  const onDataInvoked = (tableRowItem) => {
     const rowData = tableData.map((item) =>{
      if(tableRowItem.primaryAddress !== item.primaryAddress){
        return item;
      }
      return{
        ...item,
        toggleSelected: !item.toggleSelected
      };
    }); 
  
    // eslint-disable-next-line
    setSelectedItem(tableRowItem);
  } */

  const redirectToMap = () => {
    tableData.forEach((manualPlotData) => {
      console.log("into foreach*", tableData, selectedItem);
      if (selectedItem) {
        if (/^\d/.test(manualPlotData.address1)) {
          console.log("into if ***", selectedItem);
          const selectedMpLatitude = selectedItem.latitudeNtq;
          const selectedMpLongitude = selectedItem.longitudeNtq;

          ManualPlotLayer.ManualPlotMetaData.stopId = selectedItem.stopId;
          ManualPlotLayer.ManualPlotMetaData.stopIdType =
            selectedItem.stopIdType;

          let manualPlotFeature: Feature = new Feature({
            geometry: new Point(
              fromLonLat([selectedMpLongitude, selectedMpLatitude])
            )
          });
          manualPlotFeature.setStyle(ManualPlotLayer.SELECTEDMP_STYLE);
          mapService.manualPlotLayer.addFeature(manualPlotFeature);

          console.log("for all Mp");
          const manualPlotLatitude = manualPlotData.latitudeNtq;
          const manualPlotLongitude = manualPlotData.longitudeNtq;
          ManualPlotLayer.ManualPlotMetaData.stopId = manualPlotData.stopId;
          ManualPlotLayer.ManualPlotMetaData.stopIdType =
            manualPlotData.stopIdType;
          mapService.manualPlotLayer.addFeature(
            new Feature({
              geometry: new Point(
                fromLonLat([manualPlotLongitude, manualPlotLatitude])
              )
            })
          );
          //  ManualPlotLayer.acceptFlag.redirectingToManualPlot = true ;
          ManualPlotLayer.redirectingToManualPlot = true;
          mapService.manualPlotLayer.addPointer();

          mapService.map.setView(
            new View({
              center: fromLonLat([selectedMpLongitude, selectedMpLatitude]),
              zoom: 17
            })
          );
        }
      } else {
        console.log("into if elseee");
        if (/^\d/.test(manualPlotData.address1)) {
          const manualPlotLatitude = manualPlotData.latitudeNtq;
          const manualPlotLongitude = manualPlotData.longitudeNtq;
          ManualPlotLayer.ManualPlotMetaData.stopId = manualPlotData.stopId;
          ManualPlotLayer.ManualPlotMetaData.stopIdType =
            manualPlotData.stopIdType;
          mapService.manualPlotLayer.addFeature(
            new Feature({
              geometry: new Point(
                fromLonLat([manualPlotLongitude, manualPlotLatitude])
              )
            })
          );
          //  ManualPlotLayer.acceptFlag.redirectingToManualPlot = true ;
          ManualPlotLayer.redirectingToManualPlot = true;
          mapService.manualPlotLayer.addPointer();
        }
      }
    });
  };

  useEffect(() => {
    initializeIcons();
    KickoutsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={classesStyle.body}>
        <div className={classesStyle.topSection}>
          <div className={classesStyle.kickoutsTableSection}>
            <Stack horizontal>
              <div className={classesStyle.tableTitle}>Kickouts</div>
              <div style={{ width: 650 }} />
              <div style={{ width: 5, height: 5 }} />
              <PrimaryButton
                text="Manual Plot"
                style={{ border: "1px solid", background: "#4D148C" }}
                //disabled={!isButtonEnabled}
                onClick={() => {
                  props.mClose();
                  redirectToMap();
                }}
              />
            </Stack>
            <div className={classesStyle.tableWrapper} id="check">
              <DetailsList
                items={tableData}
                columns={kickoutTableColumns}
                selectionMode={SelectionMode.single}
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                onRenderItemColumn={renderItemColumn}
                onItemInvoked={onDataInvoked}
              />
            </div>
          </div>
          <div className={classesStyle.inputSection}>
            <CleanseInputs textData={selectedItem} />
          </div>
        </div>
        <div className={classesStyle.tableTitle}>Candidate</div>
        <div className={classesStyle.bottomSection}>
          <div className={classesStyle.tableWrapper}>
            <CandidateTable tableData={selectedItem} />
          </div>
        </div>
      </div>
      {
        <div>
          <Stack horizontal className={classesStyle.modalFooter}>
            <div style={{ width: 5, height: 5 }} />
            <PrimaryButton className={classesStyle.button} disabled>
              Accept
            </PrimaryButton>
            <div style={{ width: 5, height: 5 }} />
            <PrimaryButton className={classesStyle.button}>Reset</PrimaryButton>
          </Stack>
        </div>
      }
    </div>
  );
};

export default KickoutsTable;
