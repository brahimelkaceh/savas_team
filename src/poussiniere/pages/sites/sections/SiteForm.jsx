import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useFormik } from "formik";
import ConfirmModal from "../../../../pages/settings/modals/ConfirmModal";
import { clearInputs } from "../../../../slices/LeftBar";
import { getRenderData } from "../../../../slices/SiteData";
let base_url = "https://farmdriver.savas.ma/api/";

function SiteForm() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      longtitude: "",
      latitude: "",
    },
    onSubmit: (values) => {
      CreateSite(values);
      formik.handleReset();
    },
  });
  const CreateSite = async (data) => {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}create-site/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        console.log("Le site a été ajouté au système");
        dispatch(getRenderData(new Date().toISOString()));
      } else {
        data = {};
        const errorMessage = "Site existe déjà";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="create-site slit-in-horizontal">
      {open && (
        <ConfirmModal
          setOpen={setOpen}
          open={open}
          onSubmit={formik.handleSubmit}
          message={message}
        />
      )}
      <form
        className="settings-form settings-form-pouss"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="title">Sites </p>
        <label>
          <input
            required
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="input"
            type="text"
            placeholder=" "
            onFocus={() => dispatch(clearInputs(false))}
          />
          <span>Site</span>
        </label>
        <label>
          <input
            required
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="input"
            type="text"
            placeholder=""
            onFocus={() => dispatch(clearInputs(false))}
          />
          <span> Télephone*</span>
        </label>
        <div className="flex">
          <label>
            <input
              required
              id="longtitude"
              name="longtitude"
              value={formik.values.longtitude}
              onChange={formik.handleChange}
              className="input"
              type="number"
              placeholder=""
            />
            <span> Longtitude*</span>
          </label>
          <label>
            <input
              required
              id="latitude"
              name="latitude"
              value={formik.values.latitude}
              onChange={formik.handleChange}
              className="input"
              type="number"
              placeholder=""
            />
            <span> Latitude*</span>
          </label>
        </div>

        <div className="btns">
          <button
            className="edit-btn"
            type="submit"
            disabled={
              !formik.values.name.length ||
              !formik.values.phone.length ||
              !formik.values.latitude ||
              !formik.values.longtitude
            }
            onClick={(e) => {
              setMessage(
                "Êtes-vous sûr(e) de vouloir soumettre ce formulaire ?"
              );
              setOpen(true);
            }}
          >
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <AiOutlineSend />
              </div>
            </div>
            <span>Envoyer</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SiteForm;
