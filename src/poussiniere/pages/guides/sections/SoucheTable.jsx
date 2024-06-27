import { useState } from "react";
function SoucheTable(guideData, loading) {
  return (
    <div className="souche-table slit-in-horizontal">
      <table className="">
        <thead className="fixed-header">
          <tr>
            <th>Souche</th>
            <th>Nom</th>
            <th>Type</th>
            <th>Age</th>
            <th>mort/Sem</th>
            <th>∑ mort/PD</th>
            <th>Ponte</th>
            <th>NopppSem</th>
            <th>Noppp ∑</th>
            <th>NoppdSem</th>
            <th>Noppd ∑</th>
            <th>Poid vif</th>
            <th>Homog</th>
            <th>PMO</th>
            <th>APS</th>
            <th>Alt ∑ /Sem PP</th>
            <th>Alt ∑ PD</th>
            <th>Alt ∑ / OeufPD</th>
            <th>Mass Oe / Sem PP</th>
            <th>Mass Oe ∑ PP</th>
            <th>Mass Oe / Sem PD</th>
            <th>Mass Oe ∑ PD</th>
            <th>Ic / Sem</th>
            <th>Ic ∑</th>
          </tr>
        </thead>
        <tbody>
          {guideData.guideData !== undefined &&
            guideData.guideData?.map((data, i) => (
              <tr className="scale-in-hor-center" key={i}>
                <td>{data.souche}</td>
                <td>{data.name}</td>
                <td>{data.guideType}</td>
                <td>{data.G_age}</td>
                <td>{data.G_mortSem}</td>
                <td>{data.G_mortCumlPD}</td>
                <td>{data.G_ponte}</td>
                <td>{data.G_nopppSem}</td>
                <td>{data.G_nopppCuml}</td>
                <td>{data.G_noppdSem}</td>
                <td>{data.G_noppdCuml}</td>
                <td>{data.G_poidVif}</td>
                <td>{data.G_homog}</td>
                <td>{data.G_pmo}</td>
                <td>{data.G_aps}</td>
                <td>{data.G_altCumlSemPP}</td>
                <td>{data.G_altCumlPD}</td>
                <td>{data.G_altCumlParOeufPD}</td>
                <td>{data.G_massOeParSemPP}</td>
                <td>{data.G_massOeCumlPP}</td>
                <td>{data.G_massOeParSemPD}</td>
                <td>{data.G_massOeCumlPPD}</td>
                <td>{data.G_icSem}</td>
                <td>{data.G_icCuml}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {guideData.guideData == undefined && (
        <div className="tracking-in-contract-bck-top guide-msg">
          <span> Veuillez choisir une souche pour afficher les données.</span>
        </div>
      )}
    </div>
  );
}

export default SoucheTable;
