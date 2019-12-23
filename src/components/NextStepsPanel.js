import React from "react";

function NextStepsPanel() {
    const styles = {
        action: {
            margin: "10px",
            width: "50%",
            borderStyle: "ridge",
            borderWidth: "2px",
            padding: "10px"
        },
        row: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "10px",
            width: "70%"
        },

        header: {
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            fontSize: "xx-large"
        },
        learn: {
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            fontSize: "22px",
            width: "100%"
        },
        footer: {
            display: "flex",
            flexDirection: "row-reverse",
            backgroundColor: "#674063",
            height: "10%",
            alignItems: "center",
            fontSize: "20px"
        }
    };

    return (
        <div
            className="App"
            style={{
                display: "flex",
                minHeight: "90vh",
                flexDirection: "column",
                backgroundColor: "#d24242",
                width: "100%"
            }}
        >
            <div style={styles.header}>
                <h2 className="next-steps-panel">Next Steps</h2>
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
                <div style={styles.row}>
                    <div style={styles.action}>
                        Closing the Digital Equity Gap
                    </div>
                    <div style={styles.action}>The Digital Equity Walk</div>
                </div>
                <div style={styles.row}>
                    <div style={styles.action}>The Walk in Action</div>
                    <div style={styles.action}>Take the Virtual Walk</div>
                </div>
            </div>
            <div style={styles.learn}>
                <span style={{ width: "60%" }}>
                    Want to learn more about the Digital Equity Walk or about
                    opportunities to host a walk? Visit the Digital Equity Walk
                    in Action or contact Jackney Prioly Joseph.
                </span>
            </div>
            <div style={styles.footer}>
                <span style={{ marginRight: "20px" }}>Contact Info</span>
            </div>
        </div>
    );
}

export default NextStepsPanel;
