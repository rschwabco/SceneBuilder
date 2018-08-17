

import React, { Component } from "react";
import {
    Alignment,
    Button,
    Classes,
    H5,
    Menu,
    MenuItem,
    Popover,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
} from "@blueprintjs/core";

const scenes = [
    {
        sceneName: "CargoShip-aggregation",
        displayName: "Cargo Ship Scene"
    },
    {
        sceneName: "",
        displayName: "Empty"
    }
]


export const NavBar = (props) => {

    const onSelect = (sceneName) => {
        console.log("Scene name: ", sceneName)
        props.onSelect(sceneName)
    }
    const makeMenuItems = () => {
        return scenes.map((scene, i) => {

            return <MenuItem onClick={() => onSelect(scene.sceneName)} text={scene.displayName} key={i} />

        })
    }
    return (

        <Navbar className="bp3-dark">
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>Scenes</NavbarHeading>
                <NavbarDivider />
                <Popover content={(<Menu>{makeMenuItems()}</Menu>)}>
                    <Button icon="share" text="Choose Scene" />
                </Popover>
            </NavbarGroup>
        </Navbar>
    )
}