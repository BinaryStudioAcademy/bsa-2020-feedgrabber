import React from "react";
import {SelectableGroup, SelectAll, DeselectAll} from "react-selectable-fast/lib";
import User from "./user";

export interface IUser {
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
}

export interface IHeaderProps {
    users: IUser[];
    onAdd: Function;
}

const Cards: React.FunctionComponent<IHeaderProps> = ({users, onAdd}) => (
    <SelectableGroup
        className="main"
        clickClassName="tick"
        enableDeselect
        // globalMouse={this.state.isGlobal}
        allowClickWithoutSelected={true}
        // duringSelection={this.handleSelecting}
        // onSelectionClear={this.handleSelectionClear}
        // onSelectionFinish={this.handleSelectionFinish}
        // onSelectedItemUnmount={this.handleSelectedItemUnmount}
    >
        <div>
            <SelectAll className="selectable-button">
                <button>Select all</button>
            </SelectAll>
            <DeselectAll className="selectable-button">
                <button>Clear selection</button>
            </DeselectAll>
            {users.map((u, i) => (
                <User key={i} username={u.username} firstname={u.firstname} avatar={u.avatar} lastname={u.lastname}/>
            ))}
        </div>
    </SelectableGroup>
);

Cards.defaultProps = {
    users: [
        {
            username: "nick",
            avatar: "https://img.icons8.com/cotton/64/000000/chat.png",
            firstname: "boy",
            lastname: "boi"
        },
        {
            username: "sicc",
            avatar: "https://img.icons8.com/cotton/64/000000/chat.png",
            firstname: "man",
            lastname: "tab"
        }
    ]
};
export default Cards;
