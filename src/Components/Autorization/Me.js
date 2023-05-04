import React from "react";

const AboutMe = ({ userData }) => {
    return (
        <div>
            <h2>{`${userData.surname} ${userData.name} ${userData.middlename}`}</h2>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default AboutMe;