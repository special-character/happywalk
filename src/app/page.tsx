"use client";

import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./page.module.css";
import { FindPathResponse } from "@/app/types";

const HAPPYWALK_MAPBOX_DEV_TOKEN =
  process.env.NEXT_PUBLIC_HAPPYWALK_MAPBOX_DEV_TOKEN;

export default function Home() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>(null);

  useEffect(() => {
    mapboxgl.accessToken = HAPPYWALK_MAPBOX_DEV_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      center: [-122.293223, 47.591574], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
  }, []);

  const [prompt, setPrompt] = useState("");
  const [path, setPath] = useState<FindPathResponse | undefined>();
  // distance

  const findPath = async () => {
    const response = await fetch("/api/find-path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const res = await response.json();

    setPath(res);
  };

  useEffect(() => {
    if (path) {
      // const pathGeoJSON = JSON.parse(
      //   path.choices[0].message.content
      //     .replace("```json\n", "")
      //     .replace("\n```", "")
      // );

      const pathGeoJSON = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [-122.293223, 47.591574],
                [-122.292891, 47.592009],
                [-122.292485, 47.592589],
                [-122.292136, 47.593168],
                [-122.291782, 47.593733],
                [-122.291358, 47.594339],
                [-122.290968, 47.594879],
                [-122.291024, 47.595486],
                [-122.291451, 47.595921],
                [-122.292059, 47.596123],
                [-122.292684, 47.596199],
                [-122.293337, 47.595987],
                [-122.293774, 47.595572],
                [-122.294011, 47.594945],
                [-122.293941, 47.594321],
                [-122.293595, 47.593739],
                [-122.293358, 47.593135],
                [-122.293248, 47.592551],
                [-122.293223, 47.591574],
              ],
            },
          },
        ],
      };

      mapRef.current?.addSource("path", {
        type: "geojson",
        data: pathGeoJSON,
      });

      mapRef.current?.addLayer({
        id: "path",
        type: "line",
        source: "path",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    }
  }, [path]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          style={{ height: "100%", width: "100%" }}
          ref={mapContainerRef}
          className="map-container"
        />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={findPath}>Find Path</button>
        {JSON.stringify(path)}
      </main>
    </div>
  );
}
