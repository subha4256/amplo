export const designThinkingStakeHolderEndPoints = () => {
    var biArrowEndpointLow = {
        endpoint: ["Dot", {radius: 5, cssClass:"biArrowEndpointLow"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "equalInfluencedLow",
        isSource: true,
        reattach: true,
        connectorStyle: { stroke: "#708088", strokeWidth: 0.8, outlineStroke: "transparent", outlineWidth: 4 },
        maxConnections: -1,
        connectorOverlays:[
            [ "Arrow", {
                location: 13.5,
                id: "arrow",
                length: 7,
                width:7,
                foldback: 1,
                direction:-1
            } ],
            [ "Arrow", {
                location: -13.5,
                id: "bi-arrow",
                length: 7,
                width:7,
                foldback: 1,
                direction:1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };
    var biArrowEndpointMed = {
        endpoint: ["Dot", {radius: 5, cssClass:"biArrowEndpointMed"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "equalInfluencedMed",
        isSource: true,
        reattach: true,
        connectorStyle: { stroke: "#708088", strokeWidth: 1.7, outlineStroke: "transparent", outlineWidth: 4 },
        maxConnections: -1,
        connectorOverlays:[
            [ "Arrow", {
                location: 13.5,
                id: "arrow",
                length: 10,
                width:10,
                foldback: 1,
                direction:-1
            } ],
            [ "Arrow", {
                location: -13.5,
                id: "bi-arrow",
                length: 10,
                width:10,
                foldback: 1,
                direction:1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };
    var biArrowEndpointStrong = {
        endpoint: ["Dot", {radius: 5, cssClass:"biArrowEndpointStrong"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "equalInfluencedStrong",
        isSource: true,
        reattach: true,
        connectorStyle: { stroke: "#708088", strokeWidth: 2.6, outlineStroke: "transparent", outlineWidth: 4 },
        maxConnections: -1,
        connectorOverlays:[
            [ "Arrow", {
                location: 13.5,
                id: "arrow",
                length: 13.5,
                width:13.5,
                foldback: 1,
                direction:-1
            } ],
            [ "Arrow", {
                location: -13.5,
                id: "bi-arrow",
                length: 13.5,
                width:13.5,
                foldback: 1,
                direction:1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };
    var isInfluencedEndpointLow = {
        endpoint: ["Dot", {radius: 5, cssClass:"isInfluencedEndpointLow"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "isInfluencedLow",
        isSource: true,
        reattach: true,
        maxConnections: -1,
        connectorStyle: { stroke: "#708088", strokeWidth: 0.8, outlineStroke: "transparent", outlineWidth: 4 },
        connectorOverlays:[
            [ "Arrow", {
                location: 13.5,
                id: "arrow",
                length: 7,
                width:7,
                foldback: 1,
                direction:-1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };
    var isInfluencedEndpointMed = {
        endpoint: ["Dot", {radius: 5, cssClass:"isInfluencedEndpointMed"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "isInfluencedMed",
        isSource: true,
        reattach: true,
        maxConnections: -1,
        connectorStyle: { stroke: "#708088", strokeWidth: 1.7, outlineStroke: "transparent", outlineWidth: 4 },
        connectorOverlays:[
            [ "Arrow", {
                location: 13.5,
                id: "arrow",
                length: 10,
                width:10,
                foldback: 1,
                direction:-1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };
    var isInfluencedEndpointStrong = {
        endpoint: ["Dot", {radius: 5, cssClass:"isInfluencedEndpointStrong"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "isInfluencedStrong",
        isSource: true,
        reattach: true,
        maxConnections: -1,
        connectorStyle: { stroke: "#708088", strokeWidth: 2.6, outlineStroke: "transparent", outlineWidth: 4 },
        connectorOverlays:[
            [ "Arrow", {
                location: 13.5,
                id: "arrow",
                length: 13.5,
                width:13.5,
                foldback: 1,
                direction:-1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };
    var hasInfluencedEndpointLow = {
        endpoint: ["Dot", {radius: 5, cssClass:"hasInfluencedEndpointLow"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "hasInfluencedLow",
        isSource: true,
        reattach: true,
        maxConnections: -1,
        connectorStyle: { stroke: "#708088", strokeWidth: 0.8, outlineStroke: "transparent", outlineWidth: 4 },
        connectorOverlays:[
            [ "Arrow", {
                location: -13.5,
                id: "arrow",
                length: 7,
                width:7,
                foldback: 1,
                direction:1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };
    var hasInfluencedEndpointMed = {
        endpoint: ["Dot", {radius: 5, cssClass:"hasInfluencedEndpointMed"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "hasInfluencedMed",
        isSource: true,
        reattach: true,
        maxConnections: -1,
        connectorStyle: { stroke: "#708088", strokeWidth: 1.7, outlineStroke: "transparent", outlineWidth: 4 },
        connectorOverlays:[
            [ "Arrow", {
                location: -13.5,
                id: "arrow",
                length: 10,
                width:10,
                foldback: 1,
                direction:1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };
    var hasInfluencedEndpointStrong = {
        endpoint: ["Dot", {radius: 5, cssClass:"hasInfluencedEndpointStrong"}],
        anchor: "Center",
        paintStyle: { width: 25, height: 21, fill:"transparent"},
        scope: "hasInfluencedStrong",
        isSource: true,
        reattach: true,
        maxConnections: -1,
        connectorStyle: { stroke: "#708088", strokeWidth: 2.6, outlineStroke: "transparent", outlineWidth: 4 },
        connectorOverlays:[
            [ "Arrow", {
                location: -13.5,
                id: "arrow",
                length: 13.5,
                width:13.5,
                foldback: 1,
                direction:1
            } ]
        ],
        isTarget: true,
        // dropOptions: exampleDropOptions
    };

    return {
        biArrowEndpointLow          : biArrowEndpointLow,
        biArrowEndpointMed          : biArrowEndpointMed,
        biArrowEndpointStrong       : biArrowEndpointStrong,
        isInfluencedEndpointLow     : isInfluencedEndpointLow,
        isInfluencedEndpointMed     : isInfluencedEndpointMed,
        isInfluencedEndpointStrong  : isInfluencedEndpointStrong,
        hasInfluencedEndpointLow    : hasInfluencedEndpointLow,
        hasInfluencedEndpointMed    : hasInfluencedEndpointMed,
        hasInfluencedEndpointStrong : hasInfluencedEndpointStrong
    }
}