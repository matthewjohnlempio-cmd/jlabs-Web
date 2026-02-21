'use client';

import { useEffect } from "react";

export default function BubbleAnimation() {
  useEffect(() => {
    const bubbleOptions = {
      maxBubbles: 120,
      bubbles: [],
      hue: 188,
      hueRand: 20,
      saturation: 60,
      saturationRand: 10,
      light: 55,
      lightRand: 10,
      opacityFactor: 4,
      minOpacity: 0.25,
    };

    class Bubble {
      constructor(element) {
        this.e = element;
        this.reset();
      }

      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = window.innerHeight + Math.random() * 200;
        this.xVel = (Math.random() - 0.5) * 0.3;
        this.yVel = -(Math.random() * 0.8 + 0.2);
        this.diam = Math.random() * 15 + 5;
        this.time = 0;
        this.opacityPhase = Math.random() * Math.PI * 2;

        const hue = Math.floor(Math.random() * bubbleOptions.hueRand) + bubbleOptions.hue;
        const saturation = Math.floor(Math.random() * bubbleOptions.saturationRand) + bubbleOptions.saturation;
        const light = Math.floor(Math.random() * bubbleOptions.lightRand) + bubbleOptions.light;
        const opacity = Math.min(Math.max(Math.random() / bubbleOptions.opacityFactor, bubbleOptions.minOpacity), 1);

        const hsla = `hsla(${hue},${saturation}%,${light}%,${opacity})`;

        this.e.style.width = this.diam + "px";
        this.e.style.height = this.diam + "px";
        this.e.style.backgroundColor = hsla;
        this.e.style.boxShadow = `0 0 ${Math.random() * 12 + 4}px ${hsla}`;
        this.e.style.borderRadius = "50%";
        this.e.style.position = "fixed";
        this.e.style.left = this.x + "px";
        this.e.style.top = this.y + "px";
        this.e.style.opacity = opacity.toString();
        this.e.style.zIndex = "0";
      }

      move() {
        this.y += this.yVel;
        this.x += this.xVel + Math.sin(this.time / 20) * 0.1;
        this.opacityPhase += 0.02;
        const opacity = Math.min(Math.max(Math.sin(this.opacityPhase) * 0.3 + 0.7, bubbleOptions.minOpacity), 1);
        this.e.style.opacity = opacity.toString();

        if (this.y + this.diam < 0) this.reset();
        this.e.style.left = this.x + "px";
        this.e.style.top = this.y + "px";
        this.time++;
      }
    }

    const container = document.getElementById("bubbleContainer");
    if (container) {
      for (let i = 0; i < bubbleOptions.maxBubbles; i++) {
        const div = document.createElement("div");
        container.appendChild(div);
        bubbleOptions.bubbles.push(new Bubble(div));
      }
    }

    const animate = () => {
      bubbleOptions.bubbles.forEach(b => b.move());
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return <div id="bubbleContainer" className="absolute inset-0 z-0"></div>;
}