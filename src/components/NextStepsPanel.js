import React from "react";

function NextStepsPanel() {
    return (
        <div
            className="App"
            style={{
                display: "flex",
                minHeight: "90vh",
                flexDirection: "column"
            }}
        >
            <div style={{ height: "30%" }}>
                <h2 className="next-steps-panel">NEXT Steps</h2>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: "x-large",
                    height: "30%"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "10px"
                    }}
                >
                    <div style={{ margin: "10px" }}>
                        Closing the Digital Equity Gap
                    </div>
                    <div style={{ margin: "10px" }}>
                        The Digital Equity Walk
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "10px"
                    }}
                >
                    <div style={{ margin: "10px" }}>The Walk in Action</div>
                    <div style={{ margin: "10px" }}>Take the Virtual Walk</div>
                </div>
            </div>
        </div>
    );
}

export default NextStepsPanel;
