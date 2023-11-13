import React from "react";
import Joyride from "react-joyride";

export default function Tour() {

    const steps = [
        {
            target: "body",
            disableBeacon: true,
            content: "Welcome to the AgentLang sandbox!"
        },
        {
            target: ".step-2",
            content: "You can create a new simulation by clicking on this button"
        },
        {
            target: ".step-3",
            content: "Enter the simulation name here"
        },
        {
            target: ".step-4",
            content: "Write the simulation code here"
        },
        {
            target: ".step-5",
            content: "You can save the simulation by clicking this button"
        },
        {
            target: ".step-6",
            content: "You can delete the simulation by clicking this button"
        },
        {
            target: ".step-7",
            content: "After writing the simualtion code, you can run and visualise it in this tab"
        },
        {
            target: "body",
            content: "Happy coding!"
        }
    ]

    return (
        <Joyride
            steps={steps}
            continuous={true}
            showSkipButton={true}
            showProgress={false}
            styles={{
                options: {
                    arrowColor: "rgb(25, 25, 25)",
                    backgroundColor: "rgb(25, 25, 25)",
                    overlayColor: "transparent  ",
                    primaryColor: "#000",
                    textColor: "white",
                    zIndex: 1000,
                },
                tooltipContainer: {
                    textAlign: "left",
                    fontSize: 14,
                    lineHeight: "180%",
                    paddingTop: 20,
                },
                buttonNext: {
                    fontSize: 14,
                    padding: "10px 16px",
                    backgroundColor: "#DE3C4B",
                    outline: "none",
                    border: "none"
                },
                buttonBack: {
                    color: "white",
                    fontWeight: 300,
                    fontSize: 14,
                    marginRight: 10
                }
            }}
        />
    )
}