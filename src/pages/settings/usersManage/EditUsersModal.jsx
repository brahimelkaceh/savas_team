import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import "../modals/style.css";
import { useEffect } from "react";
import { clearInputs } from "../../../slices/LeftBar";
import { useFormik } from "formik";
import SuccessModal from "../modals/SuccessModal";
import Loader from "../../../components/loader/Loader";
import { getRenderData } from "../../../slices/SiteData";
import { Button, DialogActions } from "@mui/material";

let base_url = "https://farmdriver.savas.ma/api/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // border: "2px solid transparent",
  boxShadow: 24,
  width: 600,
  // p: 1,
};

export default function EditModal({
  openEditModal,
  setOpenEditModal,
  siteName,
  userid,
}) {
  let renderData = useSelector((state) => state.getSiteData.renderData);

  const predefinedOptions = [
    { value: 2, label: "Admin" },
    { value: 3, label: "Technicien" },
    { value: 4, label: "Consultant d'un site" },
    { value: 5, label: "Consultant global" },
  ];
  let userName = useSelector((state) => state.toggleLeftBar.userName);
  let email = useSelector((state) => state.toggleLeftBar.email);
  let phone = useSelector((state) => state.toggleLeftBar.phone);
  let firstName = useSelector((state) => state.toggleLeftBar.firstName);
  let lastName = useSelector((state) => state.toggleLeftBar.lastName);
  let userRole = useSelector((state) => state.toggleLeftBar.userRole);
  let site = useSelector((state) => state.toggleLeftBar.site);
  let siteId = useSelector((state) => state.toggleLeftBar.siteId);
  let inputs = useSelector((state) => state.toggleLeftBar.inputs);

  const handleClose = () => setOpenEditModal(false);
  const newSiteName = siteName?.filter((site) => site.id !== siteId);
  const currentSiteName = siteName?.filter((site) => site.id === siteId);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const disable = true;

  let userNameRef = useRef();
  let emailRef = useRef();
  let phoneRef = useRef();
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let userRoleRef = useRef();
  let siteRef = useRef();

  if (inputs) {
    userNameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    userRoleRef.current.value = "";
    siteRef.current.value = "";
  }
  const sendData = () => {
    let userData = {
      user_id: userid,
      username: userNameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      role: userRoleRef.current.value,
      siteName: siteRef.current.value,
    };

    if (userData.username.trim() && userData.phone.trim()) {
      UpdateUser(userData);
    } else {
      console.log("something wrong");
    }
  };
  const UpdateUser = async (data) => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}update-user-site/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log("L'utilisateur a été modifié ");
        // handleOpen();
      } else {
        data = {};
        setLoading(false);
        const errorMessage = "Un utilisateur avec ce identifiant existe déjà";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openEditModal}>
          <Box sx={style} className="edit-modal">
            <div className="edit-site slit-in-horizontal">
              {isModalOpen && (
                <SuccessModal
                  open={isModalOpen}
                  setOpen={setIsModalOpen}
                  onClose={handleClose}
                  message={"Vos données ont été enregistrées avec succès."}
                />
              )}
              <form className="settings-form">
                <p className="title"> Modifier</p>
                <label>
                  <input
                    disabled={disable}
                    id="username"
                    ref={userNameRef}
                    name="username"
                    className="input"
                    type="text"
                    placeholder=" "
                    defaultValue={userName}
                    onFocus={() => dispatch(clearInputs(false))}
                  />
                  {/* <span>Identifiant*</span> */}
                </label>

                <label>
                  <input
                    id="email"
                    ref={emailRef}
                    defaultValue={email}
                    name="email"
                    className="input"
                    type="email"
                    placeholder=" "
                    onFocus={() => dispatch(clearInputs(false))}
                  />
                  <span>E-mail</span>
                </label>
                <label>
                  <input
                    id="phone"
                    ref={phoneRef}
                    defaultValue={phone}
                    name="phone"
                    className="input"
                    type="text"
                    placeholder=" "
                    onFocus={() => dispatch(clearInputs(false))}
                  />
                  <span>Télephone</span>
                </label>

                <label>
                  <input
                    id="firstName"
                    ref={firstNameRef}
                    disabled={disable}
                    defaultValue={firstName}
                    name="first_ame"
                    className="input"
                    type="text"
                    placeholder=" "
                    onFocus={() => dispatch(clearInputs(false))}
                  />
                  {/* <span>Nom*</span> */}
                </label>
                <label>
                  <input
                    id="lastName"
                    ref={lastNameRef}
                    defaultValue={lastName}
                    disabled={disable}
                    name="last_name"
                    className="input"
                    type="text"
                    placeholder=" "
                    onFocus={() => dispatch(clearInputs(false))}
                  />
                  {/* <span>Prénom*</span> */}
                </label>
                <div className="flex">
                  <label>
                    <select
                      id="admin"
                      ref={userRoleRef}
                      name="role"
                      className="input"
                      onFocus={() => dispatch(clearInputs(false))}
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
                    <span>Role*</span>
                  </label>
                  <label>
                    <input
                      id="site"
                      name="site"
                      ref={siteRef}
                      disabled={disable}
                      defaultValue={site}
                      className="input"
                      onFocus={() => dispatch(clearInputs(false))}
                    >
                      {/* {currentSiteName.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.name}
                        </option>
                      ))}
                      {newSiteName.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))} */}
                    </input>
                    {/* <span>Sites*</span> */}
                  </label>
                </div>

                <DialogActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      sendData();
                      setIsModalOpen(true);
                    }}
                    autoFocus
                    variant="contained"
                    color="success"
                  >
                    Enregistrer
                  </Button>
                </DialogActions>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
// update-user-site/
