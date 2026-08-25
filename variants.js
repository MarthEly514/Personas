// variants.js

const VARIANTS = {
    skinTones: [
        { name: "Base", value: "#FFFFFF" },
        { name: "Light", value: "#FFFCF9" },
        { name: "Fair", value: "#F8D3C4" },
        { name: "Medium", value: "#E5A684" },
        { name: "Tan", value: "#8D5524" },
        { name: "Dark", value: "#5E3A1A" }
    ],

    hairStyles: [
        {
            id: "plain",
            name: "Plain (Default)",
            // Note: We use only the raw path/group data here, not the whole <svg> tag.
            // This is the original hair you provided.
            backSVGUrl: "/svg/hair/plain/plain-back.svg",
            frontSVGUrl: "/svg/hair/plain/plain-front.svg"
        },
        {
            id: "smooth",
            name: "Smooth",
            // *** THIS IS THE NEW SVG YOU PROVIDED ***
            // I cleaned up the raw SVG to include necessary classes for color swapping.
            backSVGUrl: "/svg/hair/smooth/smooth-back.svg",
            frontSVGUrl: "/svg/hair/smooth/smooth-front.svg"
        },
        {
            id: "bald",
            name: "Bald",
            // left empty because the guy is bald
            backSVGUrl: "",
            frontSVGUrl: ""
        },
        {
            id: "curly-girl",
            name: "Curly (Girl)",
            backSVGUrl: "/svg/hair/curly-girl/curly-girl-back.svg",
            frontSVGUrl: "/svg/hair/curly-girl/curly-girl-front.svg"
        }
    ],

    clothesTops: [
        {
            id: "default",
            name: "V-Neck Top",
            svgUrl: "/svg/clothes/top/default-top.svg"
        },
        {
            id: "pull-over",
            name: "Pull Over",
            svgUrl: "/svg/clothes/top/pull-over.svg"
        },
        {
            id: "hoodie",
            name: "Hoodie",
            svgUrl: "/svg/clothes/top/hoodie.svg"
        }
    ],

    clothesBottoms: [
        {
            id: "default",
            name: "Trousers",
            svgUrl: "/svg/clothes/bottom/default-bottom.svg"
        },
        {
            id: "shorts",
            name: "Shorts",
            svgUrl: "/svg/clothes/bottom/shorts.svg"
        },
        {
            id: "skirt",
            name: "Skirt",
            svgUrl: "/svg/clothes/bottom/skirt.svg"
        }
    ],

    mouths: [
        { id: "default", name: "Default Smile", svgUrl: "/svg/mouths/default.svg" }
    ],

    eyes: [
        {
            id: "default", name: "Default Eyes", svgUrl: "/svg/eyes/default.svg" }
    ]
};