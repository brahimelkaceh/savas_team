import "./dynamicSide.css";
import { RxDoubleArrowUp } from "react-icons/rx";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import egg100 from "../../assets/egge100.svg";

const DynamicSide = () => {
  const [value, setValue] = useState(4);
  return (
    <div className="table__container-dynamic">
      <div className="table__container-dynamic__row">
        <div className="table__container-dynamic__header">
          <p>B2</p>
        </div>
        <div className="table__container-dynamic__body">
          <p>38</p>
          <p>HISEX 2022</p>
          <p>22500</p>
          <div className="table__container-dynamic__body-content">
            <div className="table__container-dynamic__body-content-row">
              <p>Réel</p>
              <p>2</p>
              <p>25</p>
              <p>45</p>
              <p>10</p>
              <p>190</p>
              <p>0.6</p>
              <p>5</p>
              <p>66.5</p>
              <p>75</p>
              <p>10.5</p>
              <p>7.99</p>
              <p>150</p>
              <p>29</p>
              <p>98</p>
              <p>11h 25min</p>
            </div>
            <div className="table__container-dynamic__body-content-row">
              <p>Ecart</p>
              <p>2</p>
              <p className="green">25</p>
              <p className="red">45</p>
              <p>
                <RxDoubleArrowUp className="arrow-icon" />
              </p>
              <p className="green">190</p>
              <p>0.6</p>
              <p className="green">5</p>
              <p className="green">66.5</p>
              <p className="red">75</p>
              <p>10.5</p>
              <p>7.99</p>
              <p className="red">150</p>
              <p className="green">29</p>
              <p className="orange">98</p>
              <p>11h 25min</p>
            </div>
          </div>
        </div>
        <div className="table__container-dynamic__footer">
          <p>3500 Fc</p>
          <p>
            <Rating name="read-only" value={value} readOnly />
          </p>
          <p>
            <img src={egg100} alt="egg100" />
          </p>

          <ul>
            <li>observation 1 </li>
            <li>observation 1 </li>
            <li>observation 1 </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DynamicSide;
