import React, { useState } from 'react';
import { Shape, getArea, formatArea } from '../types';

const ShapeAreaDemo: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<Shape>({
    kind: "circle",
    radius: 5
  });

  const handleShapeChange = (kind: string) => {
    switch (kind) {
      case "circle":
        setSelectedShape({ kind: "circle", radius: 5 });
        break;
      case "rectangle":
        setSelectedShape({ kind: "rectangle", width: 5, height: 3 });
        break;
      case "square":
        setSelectedShape({ kind: "square", side: 5 });
        break;
      case "triangle":
        setSelectedShape({ kind: "triangle", base: 5, height: 4 });
        break;
    }
  };

  const renderShapeControls = () => {
    switch (selectedShape.kind) {
      case "circle":
        return (
          <div className="form-group">
            <label>Radius</label>
            <input
              type="number"
              value={selectedShape.radius}
              onChange={(e) => setSelectedShape({
                kind: "circle",
                radius: Number(e.target.value)
              })}
            />
          </div>
        );
      case "rectangle":
        return (
          <>
            <div className="form-group">
              <label>Width</label>
              <input
                type="number"
                value={selectedShape.width}
                onChange={(e) => setSelectedShape({
                  kind: "rectangle",
                  width: Number(e.target.value),
                  height: selectedShape.height
                })}
              />
            </div>
            <div className="form-group">
              <label>Height</label>
              <input
                type="number"
                value={selectedShape.height}
                onChange={(e) => setSelectedShape({
                  kind: "rectangle",
                  width: selectedShape.width,
                  height: Number(e.target.value)
                })}
              />
            </div>
          </>
        );
      case "square":
        return (
          <div className="form-group">
            <label>Side Length</label>
            <input
              type="number"
              value={selectedShape.side}
              onChange={(e) => setSelectedShape({
                kind: "square",
                side: Number(e.target.value)
              })}
            />
          </div>
        );
      case "triangle":
        return (
          <>
            <div className="form-group">
              <label>Base</label>
              <input
                type="number"
                value={selectedShape.base}
                onChange={(e) => setSelectedShape({
                  kind: "triangle",
                  base: Number(e.target.value),
                  height: selectedShape.height
                })}
              />
            </div>
            <div className="form-group">
              <label>Height</label>
              <input
                type="number"
                value={selectedShape.height}
                onChange={(e) => setSelectedShape({
                  kind: "triangle",
                  base: selectedShape.base,
                  height: Number(e.target.value)
                })}
              />
            </div>
          </>
        );
    }
  };

  const area = getArea(selectedShape);

  return (
    <div className="card">
      <h2>📐 Discriminated Union Demo</h2>
      <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '1rem' }}>
        Type-safe shape area calculator using discriminated union
      </p>
      
      <div className="form-group">
        <label>Select Shape</label>
        <select
          value={selectedShape.kind}
          onChange={(e) => handleShapeChange(e.target.value)}
        >
          <option value="circle">Circle</option>
          <option value="rectangle">Rectangle</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>
      
      {renderShapeControls()}
      
      <div className="shape-demo">
        <div style={{ fontSize: '0.75rem', color: '#666' }}>
          Type: <strong>{selectedShape.kind}</strong>
        </div>
        <div className="shape-result">
          Area = {formatArea(area)} sq units
        </div>
      </div>
      
      <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: '#999' }}>
        <pre style={{ background: '#f0f0f0', padding: '0.5rem', borderRadius: '4px', overflow: 'auto' }}>
{`type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "rectangle": return shape.width * shape.height;
    case "square": return shape.side ** 2;
    case "triangle": return (shape.base * shape.height) / 2;
  }
}`}
        </pre>
      </div>
    </div>
  );
};

export default ShapeAreaDemo;