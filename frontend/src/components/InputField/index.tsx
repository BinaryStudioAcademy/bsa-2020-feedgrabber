import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import "./style.modules.scss";

const InputField: React.FC<any> = () => {
  return (
    <div className="form_main-container">
      <Form className="form_container">
        <Form.Input placeholder="Here should be answer..." disabled />
      </Form>
    </div>
  );
};

export default InputField;
