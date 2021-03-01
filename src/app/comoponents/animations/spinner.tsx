import React from 'react';
import PropTypes, { InferProps } from "prop-types";


function Spinner({ color }: InferProps<typeof Spinner.propTypes>) {
    return (
      <>
        <div
          className="lds-ring"
          style={{
            border:
              `8px solid ${color} !important` || "8px solid #fff !important",
            borderColor:
              `${color} transparent transparent transparent !important` ||
              "#fff transparent transparent transparent !important",
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    );
}

Spinner.propTypes = {
  color: PropTypes.string
}

export default Spinner;
