"use client";
import overlays from "./overlays";
import {
  registerFigure,
  registerIndicator,
  registerOverlay
} from "couriourc-klinecharts";
import indicators from "./indicators";
import figures from "./figures";

function registerOverlays() {
  overlays.forEach(registerOverlay);
}

function registerIndicators() {
  indicators.forEach(registerIndicator);
}

function registerFigures() {
  figures.forEach(registerFigure);
}

registerOverlays();
registerIndicators();
registerFigures();
