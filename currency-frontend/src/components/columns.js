import { BsFillPinAngleFill, BsInfoSquareFill, BsFillPinFill} from "react-icons/bs";
import { useState } from "react";
import tableStyle from "../styles/TableStyle.css";

export const COLUMNS = [
    {
        Header: "Currency Pair",
        accessor: "currency_pair",
    },
    {
        Header: "Bid",
        accessor: "bid",
        Cell: (value) => {
           //format the value for 5 decimal places
              return parseFloat(value.value).toFixed(5);
        },
    },
    {
        Header: "Ask",
        accessor: "ask",
        Cell: (value) => {
            //format the value for 5 decimal places
               return parseFloat(value.value).toFixed(5);
         },
    },
    {
        Header: "",
        accessor: "pin",
        Cell: () => {
            const [pinned, setPinned] = useState(false);

            return (
                <div className="pin-cell" onClick={() => setPinned(!pinned)}>
                    {pinned ? (
                        <BsFillPinFill className="pin-icon-pinned"/>
                    ) : (
                        <BsFillPinAngleFill
                            className="pin-icon"
                        />
                    )}
                </div>
            );
        },
    },
    {
        Header: "",
        accessor: "info",
        Cell: (value) => {
            return (
                <div style={{ textAlign: "center" }}>
                    <BsInfoSquareFill className="info-icon" />
                </div>
            );
        },
    },
];
