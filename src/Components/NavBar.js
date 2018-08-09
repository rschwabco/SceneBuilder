

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
        sceneName: "FuelTankCaged"
    },
    {
        sceneName: "OilDrum"
    },
    {
        sceneName: "Pallet"
    },
    {
        sceneName: "Container"
    },
    {
        sceneName: "Enterprise"
    },
    {
        sceneName: "TankerShip"
    },
    {
        sceneName: "Propeller"
    },
    {
        sceneName: "Graph"
    }
]


export const NavBar = (props) => {

    const onSelect = (sceneName) => {
        console.log("Scene name: ", sceneName)
        props.onSelect(sceneName)
    }
    const makeMenuItems = () => {
        return scenes.map((scene, i) => {
            return <MenuItem onClick={() => onSelect(scene.sceneName)} text={scene.sceneName} key={i} />
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