import * as React from "react";
import "./style.css";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
  ColumnChooser,
  Inject,
  ForeignKey,
  table,
} from "@syncfusion/ej2-react-grids";
import ReactDOMServer from "react-dom/server";

function ColChooser({ data }) {
  const toolbarOptions = ["ColumnChooser"];
  const customAttributes = { class: "custom-calendrier-class" };
  data?.forEach((item) => {
    item.allumageTotal = item.lumiere.starts_at + " ~ " + item.lumiere.ends_at;
    item.FlashTotal = item.flash.starts_at + " ~ " + item.flash.ends_at;
    item.intensiteTotal = item.intensite + " " + item.intensite_unit;
    item.temp = item.temperature.max + "°/" + item.temperature.min + "°";
  });

  function formatData(data, isWeek) {
    if (isWeek) {
      return `${data?.reel} | ${data?.ecart ? data?.ecart : 0}`; // Ensure values or use defaults
    } else {
      return data;
    }
  }

  return (
    <div className="control-pane">
      <div className="control-section">
        <GridComponent
          dataSource={data}
          toolbar={toolbarOptions}
          allowPaging={false}
          showColumnChooser={true}
          height="400"
          // html
        >
          <ColumnsDirective>
            <ColumnDirective
              customAttributes={customAttributes}
              field="Calendrier"
              textAlign="Center"
              columns={[
                {
                  field: "semCivil",
                  headerText: "Semaine Civile",
                  width: "50",
                  textAlign: "Center",
                },
                {
                  headerText: "Date",
                  field: "date",
                  width: "50",
                  textAlign: "Center",
                },
                {
                  headerText: "Age(sem)",
                  field: "age",
                  width: "50",
                  textAlign: "Center",
                },
              ]}
            ></ColumnDirective>
            <ColumnDirective
              customAttributes={{
                class: "custom-ambiance-class",
              }}
              field="Ambiance"
              textAlign="Center"
              foreignKeyField="Ambiance"
              columns={[
                {
                  headerText: "Lumiére",
                  field: "allumageTotal",
                  foreignKeyField: "lumiere",
                  foreignKeyValue: "id",
                  width: "80",
                  textAlign: "Center",
                },
                {
                  headerText: "Flash",
                  width: "80",
                  textAlign: "Center",
                  field: "FlashTotal",
                },
                {
                  headerText: "intensité",
                  width: "50",
                  textAlign: "Center",
                  field: "intensiteTotal",
                },
                {
                  headerText: "Temp °C",
                  width: "60",
                  textAlign: "Center",
                  field: "temp",
                },
              ]}
            ></ColumnDirective>
            <ColumnDirective
              customAttributes={{
                class: "custom-viability-class",
              }}
              field="Viabilité"
              headerText="Viabilité"
              width={400}
              textAlign="Center"
              columns={[
                {
                  headerText: "Effectif présent",
                  width: "60",
                  textAlign: "Center",
                  field: "effectif",
                },
                {
                  headerText: "Homogénéité",
                  width: "60",
                  textAlign: "Center",
                  field: "homog",
                  formatter: (value, data) => {
                    return formatData(data?.homog, data?.isWeek);
                  },
                },
                {
                  headerText: "P.corporel (g)",
                  width: "60",
                  textAlign: "Center",
                  field: "poid_vif",
                  formatter: (value, data) => {
                    return formatData(data?.poid_vif, data?.isWeek);
                  },
                },
                {
                  headerText: "Viabilité(%)",
                  width: "60",
                  textAlign: "Center",
                  field: "viabilite",
                },
                {
                  headerText: "Mort /j",
                  width: "50",
                  textAlign: "Center",
                  field: "nbr_mort_jour",
                  formatter: (value, data) => {
                    console.log(data);
                    if (data?.isWeek) {
                      return `${data?.cent_mort_cuml?.reel} | ${data?.cent_mort_cuml?.ecart}`; // Ensure values or use defaults
                    } else {
                      return data?.nbr_mort_jour;
                    }
                  },
                },
                {
                  headerText: "Mort /sem",
                  width: "50",
                  textAlign: "Center",
                  field: "nbr_mort_sem",
                  formatter: (value, data) => {
                    if (data?.isWeek) {
                      return `${data?.cent_mort_sem?.reel} | ${data?.cent_mort_sem?.ecart}`; // Ensure values or use defaults
                    } else {
                      return data?.nbr_mort_sem;
                    }
                  },
                },
              ]}
            ></ColumnDirective>
            <ColumnDirective
              customAttributes={{
                class: "custom-consommation-class",
              }}
              field="Consommation"
              textAlign="Center"
              columns={[
                {
                  headerText: "Eau (m³)",
                  width: "40",
                  textAlign: "Center",
                  field: `eau_dist`,
                },
                {
                  headerText: "Aliment (t)",
                  width: "40",
                  textAlign: "Center",
                  field: "alt_dist",
                },
                {
                  headerText: "EPS(ml)",
                  width: "40",
                  textAlign: "Center",
                  field: "eps",
                },
                {
                  headerText: "APS(g)",
                  width: "40",
                  textAlign: "Center",
                  field: "aps",
                  formatter: (value, data) => {
                    return formatData(data?.aps, data?.isWeek);
                  },
                },
                {
                  headerText: "∑ APS(kg)",
                  width: "50",
                  textAlign: "Center",
                  field: "alt_cuml",
                  formatter: (value, data) => {
                    return formatData(data?.alt_cuml, data?.isWeek);
                  },
                },
                {
                  headerText: "Ratio E/A",
                  width: "40",
                  textAlign: "Center",
                  field: "ratio",
                  formatter: (value, data) => {
                    return formatData(data?.ratio, data?.isWeek);
                  },
                },
                // {
                //   headerText: "Réf.Alt",
                //   width: "50",
                //   textAlign: "Center",
                //   field: "FAP",
                //   toolTip: "Indice de conversion",
                // },
              ]}
            ></ColumnDirective>
            <ColumnDirective
              customAttributes={{
                class: "custom-ic-class",
              }}
              field="Indice de conversion"
              textAlign="Center"
              columns={[
                {
                  headerText: "Ic",
                  width: "80",
                  textAlign: "Center",
                  field: "ic",
                  toolTip: "Indice de conversion",
                  formatter: (value, data) => {
                    if (data?.isWeek) {
                      return `${data?.ic_cuml?.reel} | ${data?.ic_cuml?.ecart}`; // Ensure values or use defaults
                    } else {
                      return data?.nbr_mort_sem;
                    }
                  },
                },
              ]}
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Toolbar, Page, ColumnChooser, ForeignKey]} />
        </GridComponent>
      </div>
    </div>
  );
}
export default ColChooser;
