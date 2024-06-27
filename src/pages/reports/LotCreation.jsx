import * as React from "react";
import { useFormik } from "formik";
import "./lotCreation.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  batiment: Yup.number().required("Batiment is required"),
  guide: Yup.number().required("Guide Activation is required"),
  code: Yup.string().required("Code is required "),
  effectifDP: Yup.number().required("Effect DP is required "),
  birthDate: Yup.string().required("birthDate is required "),
  transferDate: Yup.string().required("transferDate  DP is required "),
  mep: Yup.string().required("Mep is required "),
  hebdoFill: Yup.boolean().required("Hebdo fill is required "),
  reformStarted: Yup.boolean(),
});
let base_url = "https://farmdriver.savas.ma/api/";

const LotCreation = ({ lotdata }) => {
  const [loading, setLoading] = useState(false);
  const [guideTitle, setGuidetitle] = useState();
  const [selectedValue, setSelectedValue] = useState(false);

  const batimentsdata = lotdata?.filter((obj) => obj.isEmpty);
  // console.log(batimentsdata);

  const [openDrawer, setOpenDrawer] = useState({ bottom: false });
  const toggleDrawer = (anchor, open) => (event) => {
    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };

  const GetGuideTitle = async () => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}get-active-guides/`, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        // console.log(JSON.parse(data));
        setGuidetitle(JSON.parse(data));
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      batiment: 0,
      guide: 0,
      hebdoFill: false,
      code: "",
      effectifDP: 0,
      birthDate: "",
      transferDate: "",
      mep: "",
      reformStarted: false,
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log(JSON.stringify(values, null, 2));
      // console.log(values);
      const keyToRemove = ":r1f:";

      const newValues = { ...values };
      delete newValues[keyToRemove];
      // console.log(newValues);
      CreateLot(newValues);
    },
  });
  const CreateLot = (data) => {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    fetch(`${base_url}add-lot/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.parse(data));
      })
      .catch((error) => console.error(error));

    // .catch((error) => console.log("somthing xwrong"));
  };
  useEffect(() => {
    GetGuideTitle();
  }, []);

  return (
    <div className="lot-creattion-form">
      {["bottom"].map((anchor) => (
        <Fragment key={anchor}>
          <Button
            className="floating-button"
            onClick={toggleDrawer(anchor, true)}
          >
            <KeyboardArrowDownIcon />
          </Button>
          <Drawer
            ModalProps={{
              keepMounted: true,
            }}
            anchor={anchor}
            open={openDrawer[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
              }}
              role="presentation"
              className="lot-creattion-container"
            >
              <form
                className="lot-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                <h1>creation de lot</h1>
                <div className="lot-group">
                  <select
                    id="batiment"
                    name="batiment"
                    className="lot-input"
                    placeholder="Bâtiment"
                    value={formik.values.batiment}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      const parsedValue = Number(value); // Convert the value to a number

                      // Use setFieldValue to update the field value in Formik state
                      formik.setFieldValue("batiment", parsedValue);
                      // console.log(parsedValue);
                    }}
                  >
                    <option value="" disabled>
                      Select bâtiment
                    </option>
                    {batimentsdata.map((batiment) => (
                      <option
                        key={batiment.id}
                        value={batiment.id}
                        className="input"
                      >
                        {batiment.name}
                      </option>
                    ))}
                  </select>
                </div>
                <label htmlFor="batiment"></label>
                {formik.touched.batiment && formik.errors.batiment && (
                  <div className="error">{formik.errors.batiment}</div>
                )}
                <div className="ic1"></div>

                <div className="lot-group">
                  <select
                    id="guide"
                    name="guide"
                    className="lot-input"
                    placeholder="Guide Name "
                    value={formik.values.guide}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      const parsedValue = Number(value); // Convert the value to a number

                      // Use setFieldValue to update the field value in Formik state
                      formik.setFieldValue("guide", parsedValue);
                      // console.log(parsedValue);
                    }}
                  >
                    <option value="" disabled>
                      Select Souche
                    </option>

                    {guideTitle &&
                      guideTitle?.map((guide) => (
                        <option
                          key={guide.id}
                          value={guide.id}
                          className="input"
                        >
                          {guide.name}
                        </option>
                      ))}
                  </select>
                </div>
                <label htmlFor="guide"></label>
                {formik.touched.guide && formik.errors.guide && (
                  <div className="error">{formik.errors.guide}</div>
                )}
                <div className="ic1"></div>
                <div className="lot-group">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    className={
                      formik.values?.code?.length === 0
                        ? "lot-input"
                        : "lot-input-valid lot-input"
                    }
                    placeholder=""
                    value={formik.values.code}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="code">Lot code</label>
                  {formik.touched.code && formik.errors.code && (
                    <div className="error">{formik.errors.code}</div>
                  )}
                </div>
                <div className="ic1"></div>
                <div className="lot-group">
                  <input
                    id="effectifDP"
                    name="effectifDP"
                    type="number"
                    className="lot-input"
                    placeholder=""
                    value={formik.values.effectifDP}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="effectifDP">Effectif</label>
                  {formik.touched.effectifDP && formik.errors.effectifDP && (
                    <div className="error">{formik.errors.effectifDP}</div>
                  )}
                </div>
                <div className="ic1"></div>
                <div className="lot-group">
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className="lot-input"
                    placeholder=""
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="=birthDate">date Naissance</label>
                  {formik.touched.birthDate && formik.errors.birthDate && (
                    <div className="error">{formik.errors.birthDate}</div>
                  )}
                </div>
                <div className="ic1"></div>
                <div className="lot-group">
                  <input
                    id="mep"
                    name="mep"
                    type="date"
                    className="lot-input"
                    placeholder=""
                    value={formik.values.mep}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="=mep">date Mise en Place</label>
                  {formik.touched.mep && formik.errors.mep && (
                    <div className="error">{formik.errors.mep}</div>
                  )}
                </div>
                <div className="ic1"></div>
                <div className="lot-group">
                  <input
                    id="transferDate"
                    name="transferDate"
                    type="date"
                    className="lot-input"
                    placeholder=""
                    value={formik.values.transferDate}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="transferDate">date de transfert</label>
                  {formik.touched.transferDate &&
                    formik.errors.transferDate && (
                      <div className="error">{formik.errors.transferDate}</div>
                    )}
                </div>
                <div className="ic1"></div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Send method
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    value={formik.values.hebdoFill}
                    onChange={(e, newValue) => {
                      e.target.value == "true"
                        ? formik.setFieldValue("hebdoFill", true)
                        : formik.setFieldValue("hebdoFill", false);
                    }}
                    name="hebdoFill"
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Weekly"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Daily"
                    />
                  </RadioGroup>
                </FormControl>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={formik.values.reformStarted}
                        onChange={formik.handleChange}
                        name="reformStarted"
                      />
                    }
                    label="reformé"
                  />
                </FormGroup>
                {formik.touched.reformStarted &&
                  formik.errors.reformStarted && (
                    <div className="error">{formik.errors.reformStarted}</div>
                  )}
                <div className="ic1"></div>
                <button type="submit">Submit</button>
              </form>
            </Box>
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
};

export default LotCreation;
