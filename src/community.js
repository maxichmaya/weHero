import React from "react";

export default function Community() {
    return (
        <div className="community-container">
            <div>
                WATER <img />
            </div>
            <div>
                HEALTH CENTAR <img />
            </div>
            <div>
                SCHOOL'S ROOF <img />
            </div>
            <div>
                ORPHANAGE <img />
            </div>

            <div className="donationButton">
                <form
                    action="https://www.paypal.com/cgi-bin/webscr"
                    method="post"
                    target="_top"
                >
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input
                        type="hidden"
                        name="hosted_button_id"
                        value="96LV82KGSUCJE"
                    />
                    <input
                        type="image"
                        src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif"
                        border="0"
                        name="submit"
                        title="PayPal - The safer, easier way to pay online!"
                        alt="Donate with PayPal button"
                    />
                    <img
                        alt=""
                        border="0"
                        src="https://www.paypal.com/en_DE/i/scr/pixel.gif"
                        width="1"
                        height="1"
                    />
                </form>
            </div>
        </div>
    );
}
