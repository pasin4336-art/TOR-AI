import React, { useState } from 'react';
import { TORDocument } from '../types';

interface RadarChartProps {
  tors: TORDocument[];
  selectedIds: string[];
}

const AXES = [
  { key: 'timeline', label: 'ระยะเวลา', max: 10, angle: -90 },
  { key: 'expertise', label: 'ความเชี่ยวชาญทีมงาน', max: 10, angle: -18 },
  { key: 'scope', label: 'ขอบเขตงาน', max: 10, angle: 54 },
  { key: 'technical', label: 'เทคนิคที่นำมาใช้', max: 10, angle: 126 },
  { key: 'price', label: 'ราคาและความคุ้มค่า', max: 10, angle: 198 },
] as const;

// Palette for comparing TORs
const TOR_COLORS = [
  {
    border: '#2563eb', // Blue
    bg: 'rgba(37, 99, 235, 0.2)',
    text: 'text-blue-700',
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    dot: '#1d4ed8',
  },
  {
    border: '#059669', // Emerald
    bg: 'rgba(5, 150, 105, 0.2)',
    text: 'text-emerald-700',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dot: '#047857',
  },
  {
    border: '#7c3aed', // Purple
    bg: 'rgba(124, 58, 237, 0.2)',
    text: 'text-purple-700',
    badge: 'bg-purple-50 text-purple-800 border-purple-200',
    dot: '#6d28d9',
  },
  {
    border: '#ea580c', // Orange
    bg: 'rgba(234, 88, 12, 0.2)',
    text: 'text-orange-700',
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
    dot: '#c2410c',
  },
];

export const RadarChart: React.FC<RadarChartProps> = ({ tors, selectedIds }) => {
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);
  const [activeTorId, setActiveTorId] = useState<string | null>(null);

  const activeTors = tors.filter((t) => selectedIds.includes(t.id));

  // Chart geometry
  const size = 380;
  const center = size / 2;
  const radius = 135;
  const levels = [2, 4, 6, 8, 10];

  const getCoordinates = (value: number, angleDegrees: number) => {
    const angleRad = (angleDegrees * Math.PI) / 180;
    const dist = (value / 10) * radius;
    return {
      x: center + dist * Math.cos(angleRad),
      y: center + dist * Math.sin(angleRad),
    };
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h3 className="font-semibold text-slate-800 text-lg">
              กราฟเรดาร์ประเมิน TOR 5 มิติ (เกณฑ์ละ 10 คะแนน)
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            ประเมินตามเกณฑ์มาตรฐานพัสดุ: ระยะเวลา, ความเชี่ยวชาญ, ขอบเขต, เทคนิคที่นำมาใช้ และราคา
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2">
          {activeTors.map((tor, idx) => {
            const color = TOR_COLORS[idx % TOR_COLORS.length];
            const isHovered = activeTorId === tor.id;
            return (
              <button
                key={tor.id}
                onMouseEnter={() => setActiveTorId(tor.id)}
                onMouseLeave={() => setActiveTorId(null)}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                  color.badge
                } ${isHovered ? 'ring-2 ring-offset-1 ring-blue-400 font-semibold' : ''}`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color.border }}
                />
                <span className="truncate max-w-[140px]">{tor.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-4">
        {/* SVG Radar */}
        <div className="lg:col-span-7 flex justify-center items-center py-2 relative">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[380px] h-auto overflow-visible select-none"
          >
            {/* Background circular / polygon levels */}
            {levels.map((lvl) => {
              const points = AXES.map((axis) => {
                const { x, y } = getCoordinates(lvl, axis.angle);
                return `${x},${y}`;
              }).join(' ');

              return (
                <g key={lvl}>
                  <polygon
                    points={points}
                    fill={lvl === 10 ? '#f8fafc' : 'none'}
                    stroke="#e2e8f0"
                    strokeWidth={lvl === 10 ? '1.5' : '1'}
                    strokeDasharray={lvl % 2 === 0 ? 'none' : '3 3'}
                  />
                  <text
                    x={center + 4}
                    y={center - (lvl / 10) * radius - 2}
                    fill="#94a3b8"
                    fontSize="9"
                    fontWeight="500"
                  >
                    {lvl}
                  </text>
                </g>
              );
            })}

            {/* Axis Lines */}
            {AXES.map((axis) => {
              const { x, y } = getCoordinates(10, axis.angle);
              const labelCoord = getCoordinates(11.8, axis.angle);
              const isHovered = hoveredAxis === axis.key;

              return (
                <g key={axis.key}>
                  <line
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke={isHovered ? '#3b82f6' : '#cbd5e1'}
                    strokeWidth={isHovered ? '2' : '1.2'}
                  />
                  {/* Axis Label */}
                  <text
                    x={labelCoord.x}
                    y={labelCoord.y + 4}
                    textAnchor={
                      Math.abs(axis.angle - -90) < 10
                        ? 'middle'
                        : axis.angle > -90 && axis.angle < 90
                        ? 'start'
                        : 'end'
                    }
                    fill={isHovered ? '#1e293b' : '#475569'}
                    fontSize="11.5"
                    fontWeight={isHovered ? '700' : '600'}
                    className="cursor-pointer transition-colors"
                    onMouseEnter={() => setHoveredAxis(axis.key)}
                    onMouseLeave={() => setHoveredAxis(null)}
                  >
                    {axis.label}
                  </text>
                </g>
              );
            })}

            {/* Polygons for each active TOR */}
            {activeTors.map((tor, idx) => {
              const color = TOR_COLORS[idx % TOR_COLORS.length];
              const isDimmed = activeTorId !== null && activeTorId !== tor.id;
              const isHighlighted = activeTorId === tor.id;

              const points = AXES.map((axis) => {
                const val = tor.scores[axis.key] ?? 5;
                const { x, y } = getCoordinates(val, axis.angle);
                return `${x},${y}`;
              }).join(' ');

              return (
                <g
                  key={tor.id}
                  style={{
                    opacity: isDimmed ? 0.25 : 1,
                    transition: 'all 0.25s ease-in-out',
                  }}
                  onMouseEnter={() => setActiveTorId(tor.id)}
                  onMouseLeave={() => setActiveTorId(null)}
                >
                  <polygon
                    points={points}
                    fill={color.bg}
                    stroke={color.border}
                    strokeWidth={isHighlighted ? '3' : '2'}
                    className="cursor-pointer"
                  />
                  {/* Points on vertices */}
                  {AXES.map((axis) => {
                    const val = tor.scores[axis.key] ?? 5;
                    const { x, y } = getCoordinates(val, axis.angle);
                    return (
                      <circle
                        key={axis.key}
                        cx={x}
                        cy={y}
                        r={isHighlighted ? 5 : 3.5}
                        fill="#ffffff"
                        stroke={color.border}
                        strokeWidth={isHighlighted ? 2.5 : 2}
                        className="cursor-pointer transition-all"
                      >
                        <title>{`${tor.code} - ${axis.label}: ${val} / 10 คะแนน`}</title>
                      </circle>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Breakdown details per criterion */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            รายละเอียดคะแนนจำแนกตามเกณฑ์ (เต็ม 10)
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {AXES.map((axis) => {
              return (
                <div
                  key={axis.key}
                  onMouseEnter={() => setHoveredAxis(axis.key)}
                  onMouseLeave={() => setHoveredAxis(null)}
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    hoveredAxis === axis.key
                      ? 'bg-blue-50/70 border-blue-200 shadow-sm'
                      : 'bg-slate-50 border-slate-100 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                    <span>{axis.label}</span>
                    <span className="text-xs text-slate-500 font-normal">เต็ม 10.0</span>
                  </div>

                  {/* Per TOR score bars */}
                  <div className="space-y-1.5 mt-2">
                    {activeTors.map((tor, idx) => {
                      const color = TOR_COLORS[idx % TOR_COLORS.length];
                      const score = tor.scores[axis.key] ?? 0;
                      const rationale = tor.scoreRationales?.[axis.key] || '';

                      return (
                        <div key={tor.id} className="space-y-0.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-700 truncate max-w-[170px]">
                              {tor.code}
                            </span>
                            <span
                              className="font-bold tabular-nums"
                              style={{ color: color.border }}
                            >
                              {score.toFixed(1)}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${(score / 10) * 100}%`,
                                backgroundColor: color.border,
                              }}
                            />
                          </div>
                          {rationale && (
                            <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1">
                              {rationale}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
