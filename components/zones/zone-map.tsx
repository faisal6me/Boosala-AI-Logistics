"use client"

import { useEffect, useRef } from "react"

interface ZoneMapProps {
  zones?: Array<{
    id: string
    name: string
    color: string
    geometry?: {
      coordinates: [number, number]
    }
  }>
  onZoneSelect?: (zoneId: string) => void
  selectedZoneId?: string
}

export default function ZoneMap({ zones = [], onZoneSelect, selectedZoneId }: ZoneMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simple map implementation - in a real app you'd use Google Maps, Mapbox, etc.
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          font-weight: 500;
          position: relative;
          overflow: hidden;
        ">
          <div style="text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🗺️</div>
            <div>Zone Map</div>
            <div style="font-size: 14px; opacity: 0.8; margin-top: 4px;">
              ${zones.length} zones configured
            </div>
          </div>
          ${zones.map((zone, index) => `
            <div style="
              position: absolute;
              top: ${20 + (index * 60)}px;
              left: ${30 + (index * 80)}px;
              width: 40px;
              height: 40px;
              background: ${zone.color};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 12px;
              font-weight: bold;
              cursor: pointer;
              border: ${selectedZoneId === zone.id ? '3px solid white' : '2px solid rgba(255,255,255,0.3)'};
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            " title="${zone.name}">
              ${zone.name.charAt(0)}
            </div>
          `).join('')}
        </div>
      `
    }
  }, [zones, selectedZoneId])

  return <div ref={mapRef} />
}
