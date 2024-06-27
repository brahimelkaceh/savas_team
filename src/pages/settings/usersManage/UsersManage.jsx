import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { getRenderData } from "../../../slices/SiteData";
import { clearInputs } from "../../../slices/LeftBar";
import ConfirmModal from "../modals/ConfirmModal";
import { Button } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

function UsersManage({ siteName }) {
  let renderData = useSelector((state) => state.getSiteData.renderData);

  const predefinedOptions = [
    { value: 2, label: "Admin" },
    { value: 3, label: "Technicien" },
    { value: 4, label: "Consultant d'un site" },
    { value: 5, label: "Consultant global" },
  ];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      first_name: "",
      last_name: "",
      role: "",
      site: "",
    },
    onSubmit: (values) => {
      CreateUsers(formik.values);
      formik.handleReset();
    },
  });

  const CreateUsers = async (data) => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}user-register/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        data = {};
      }
      if (response.ok) {
        setLoading(true);
        console.log("L'utilisateur a été ajouté au système");
        dispatch(getRenderData(new Date().toISOString()));

        handleOpen();
      } else {
        setLoading(false);
        const errorMessage = "Un utilisateur avec ce identifiant existe déjà";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    formik.initialValues;
  }, []);
  return (
    <div className="create-user slit-in-horizontal">
      {open && (
        <ConfirmModal
          open={open}
          setOpen={setOpen}
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
        <p className="title">Déclarer un utilisateur</p>
        {/* <p className="message">Login now and get full access to our app. </p> */}

        <label>
          <input
            required
            name="username"
            value={formik?.values.username}
            onChange={formik?.handleChange}
            id="username"
            className="input"
            type="text"
            placeholder=" "
            onFocus={() => dispatch(clearInputs(false))}
          />
          <span>Identifiant</span>
        </label>
        <label>
          <input
            placeholder=""
            type="password"
            className="input"
            name="password"
            value={formik?.values.password}
            onChange={formik?.handleChange}
            id="password"
            required
          />
          <span>Password</span>
        </label>
        <label>
          <input
            required
            value={formik?.values.email}
            onChange={formik?.handleChange}
            id="email"
            name="email"
            className="input"
            type="email"
            placeholder=" "
            onFocus={() => dispatch(clearInputs(false))}
          />
          <span>Email</span>
        </label>
        <label>
          <input
            required
            id="phone"
            name="phone"
            value={formik?.values.phone}
            onChange={formik?.handleChange}
            className="input"
            type="tel"
            placeholder=" "
            onFocus={() => dispatch(clearInputs(false))}
          />
          <span>Telephone</span>
        </label>

        <div className="flex">
          <label>
            <input
              required
              id="firstName"
              name="first_name"
              value={formik?.values.first_name}
              onChange={formik?.handleChange}
              className="input"
              type="text"
              placeholder=" "
              onFocus={() => dispatch(clearInputs(false))}
            />
            <span>Prénom</span>
          </label>
          <label>
            <input
              required
              id="lastName"
              className="input"
              name="last_name"
              value={formik?.values.last_name}
              onChange={formik?.handleChange}
              type="text"
              placeholder=" "
              onFocus={() => dispatch(clearInputs(false))}
            />
            <span>Nom</span>
          </label>
        </div>
        <div className="flex">
          <label className="select">
            <select
              className="input"
              name="role"
              value={formik?.values.role}
              onChange={formik?.handleChange}
            >
              <option value="" disabled>
                --
              </option>

              {predefinedOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span>Role</span>
          </label>
          <label className="select">
            <select
              id="site "
              className="input"
              name="site"
              value={formik?.values.site}
              onChange={formik?.handleChange}
            >
              <option value="" disabled>
                --
              </option>
              {siteName?.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
            <span>Site</span>
          </label>
        </div>
        <div className="btns">
          <Button
            color="success"
            variant="contained"
            disabled={
              !formik.values.email ||
              !formik.values.first_name ||
              !formik.values.last_name ||
              !formik.values.username ||
              !formik.values.password ||
              !formik.values.phone ||
              !formik.values.site ||
              !formik.values.role
            }
            type="submit"
            className="edit-btn"
            onClick={(e) => setOpen(true)}
          >
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UsersManage;
