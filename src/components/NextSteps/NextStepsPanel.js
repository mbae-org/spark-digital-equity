import React from "react";
import "../../App.css";

function NextStepsPanel() {

    return (
        <div>
            <h1>Next Steps</h1>
            <div className="Boxes">
                <div className="box">
                    <a href="https://www.mbae.org/initiatives/digitalequity/">
                        Closing the Digital Equity Gap
                </a>
                </div>
                <div className="box">
                    <a href="https://www.mbae.org/initiatives/digitalequity/digitalequitywalk/">
                        The Digital Equity Walk
                </a>
                </div>
                <div className="box">
                    <a href="https://www.mbae.org/initiatives/digitalequity/walkinaction/">
                        The Walk in Action
                    </a>
                </div>
                <div className="box">
                    <a href="https://www.mbae.org/initiatives/digitalequity/virtualwalk/">
                        Take the Virtual Walk
                    </a>
                </div>
            </div>
            <div className="learnMore">
                Want to learn more about the Digital Equity Walk or about
                opportunities to host a walk? Visit the Digital Equity Walk
                in Action or contact Jackney Prioly Joseph.
            </div>

        </div>
    );
}

export default NextStepsPanel;
