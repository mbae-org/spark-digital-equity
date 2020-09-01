import React from "react";

// defaultSchoolOptions =

function login() {

    return (
        <div className="YearFilter">
            <p>Login as admin to add data</p>
            <div>
                <form>
                    <label>
                        Username:
    <input type="text" name="name" />
                    </label>
                    <label>
                        Password:
    <input type="text" name="password" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default login;
