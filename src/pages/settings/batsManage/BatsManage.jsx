import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import ConfirmModal from "../modals/ConfirmModal";
import SuccessModal from "../modals/SuccessModal";
import { getRenderData } from "../../../slices/SiteData";
import { useFormik } from "formik";
import { Button } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

export default function BatsManage({ siteName }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      site: "",
      typeOf: "",
    },
    onSubmit: (values) => {
      CreateBatiment(values);
      formik.handleReset();
    },
  });
  const CreateBatiment = async (data) => {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}create-batmnt/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        dispatch(getRenderData(new Date().toISOString()));
        console.log("Le site a été ajouté au système");
      } else {
        data = {};
        const errorMessage = "Batiment existe déjà";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="create-bats">
      {open && (
        <ConfirmModal
          setOpen={setOpen}
          open={open}
          onSubmit={formik.handleSubmit}
          message={"Êtes-vous sûr(e) de vouloir soumettre ce formulaire ?"}
        />
      )}
      <form
        className="settings-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="title">Déclarer un bâtiment</p>
        <label>
          <input
            required
            name="name"
            className="input"
            type="text"
            placeholder=" "
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <span>Bâtiment</span>
        </label>
        <label>
          <select
            required
            id="typeOf"
            name="typeOf"
            value={formik.values.typeOf}
            onChange={formik.handleChange}
            className="input"
          >
            <option value="">--</option>
            <option value="production">Production</option>
            <option value="poussiniere">Poussiniere</option>
          </select>
          <span> Production/Poussiniere*</span>
        </label>
        <label>
          <select
            required
            id="site"
            name="site"
            value={formik.values.site}
            onChange={(e) => {
              // Parse the selected value to a number before updating formik state
              formik.handleChange(e);
              const selectedValue = parseInt(e.target.value, 10);
              formik.setFieldValue("site", selectedValue);
            }}
            className="input"
          >
            <option value="">--</option>
            {siteName?.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          <span> Sites*</span>
        </label>
        <div className="btns">
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={!formik.values.name || !formik.values.site}
            className="edit-btn"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
              // sendData();
            }}
          >
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
}
