import React, {useState} from "react";
import {Segment, Tab} from "semantic-ui-react";
import Upload from "./Upload";
import UrlFile from "./UrlFile";

const panes = [
    {
        menuItem: "Add",
        render: () => <Tab.Pane><Upload /></Tab.Pane>
    },
    {
        menuItem: "Url",
        render: () => <Tab.Pane><UrlFile/></Tab.Pane>
    },
    {
        menuItem: "Uploaded files",
        render: () => <Tab.Pane><div>Upload</div></Tab.Pane>
    }
];

const FileUpload = () => {
    return (
        <Segment>
            <Tab panes={panes}/>
        </Segment>
    );
};

export default FileUpload;
