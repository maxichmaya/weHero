// function component
import Registration from "./registration";
import React from "react";
import axios from "./axios";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import $ from "jquery";

export default class Welcome extends React.Component {
    constructor() {
        super();
        $(document).ready(function() {
            scaleVideoContainer();

            initBannerVideoSize(".video-container .poster img");
            initBannerVideoSize(".video-container .filter");
            initBannerVideoSize(".video-container video");

            $(window).on("resize", function() {
                scaleVideoContainer();
                scaleBannerVideoSize(".video-container .poster img");
                scaleBannerVideoSize(".video-container .filter");
                scaleBannerVideoSize(".video-container video");
            });
        });

        function scaleVideoContainer() {
            var height = $(window).height() + 5;
            var unitHeight = parseInt(height) + "px";
            $(".homepage-hero-module").css("height", unitHeight);
        }

        function initBannerVideoSize(element) {
            $(element).each(function() {
                $(this).data("height", $(this).height());
                $(this).data("width", $(this).width());
            });

            scaleBannerVideoSize(element);
        }

        function scaleBannerVideoSize(element) {
            var windowWidth = $(window).width(),
                windowHeight = $(window).height() + 5,
                videoWidth,
                videoHeight;

            // console.log(windowHeight);

            $(element).each(function() {
                var videoAspectRatio =
                    $(this).data("height") / $(this).data("width");

                $(this).width(windowWidth);

                if (windowWidth < 1000) {
                    videoHeight = windowHeight;
                    videoWidth = videoHeight / videoAspectRatio;
                    $(this).css({
                        "margin-top": 0,
                        "margin-left": -(videoWidth - windowWidth) / 2 + "px"
                    });

                    $(this)
                        .width(videoWidth)
                        .height(videoHeight);
                }

                $(".homepage-hero-module .video-container video").addClass(
                    "fadeIn animated"
                );
            });
        }
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1 className="logoNameStart">weHero</h1>
                    <h4>here I will put a text about us</h4>
                    <div className="homepage-hero-module">
                        <div className="video-container">
                            <div className="filter"></div>
                            <video
                                autoPlay
                                loop
                                muted
                                playsinline
                                src="PATH_TO_MP4"
                                className="fillWidth"
                            ></video>
                            <div className="poster hidden">
                                <img src="PATH_TO_JPEG" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="registration">
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
