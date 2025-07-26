'use client';

import React, { useRef, useState } from 'react';

interface AnnotationCanvasProps {
  imageSrc: string;
  mode: 'draw' | 'move' | 'select' | 'comment' | 'delete';
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  comments: string[];
}

const AnnotationCanvas: React.FC<AnnotationCanvasProps> = ({ imageSrc, mode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rects, setRects] = useState<Rect[]>([]);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  const getMousePos = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    return rect
      ? {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      : { x: 0, y: 0 };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    if (mode === 'draw') {
      setStart({ x, y });
    } else if (mode === 'move') {
      rects.forEach((r, i) => {
        if (x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height) {
          setSelectedIndex(i);
          setStart({ x: x - r.x, y: y - r.y });
        }
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode === 'move' && selectedIndex !== null && start) {
      const { x, y } = getMousePos(e);
      const updated = [...rects];
      updated[selectedIndex] = {
        ...updated[selectedIndex],
        x: x - start.x,
        y: y - start.y,
      };
      setRects(updated);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    if (mode === 'draw' && start) {
      const newRect: Rect = {
        x: Math.min(start.x, x),
        y: Math.min(start.y, y),
        width: Math.abs(x - start.x),
        height: Math.abs(y - start.y),
        comments: [],
      };
      setRects([...rects, newRect]);
    }
    setStart(null);
    setSelectedIndex(null);
  };

  const handleClick = (e: React.MouseEvent, i: number) => {
    if (mode === 'comment') {
      setSelectedIndex(i);
      setShowCommentBox(true);
    } else if (mode === 'delete') {
      const updated = rects.filter((_, idx) => idx !== i);
      setRects(updated);
    }
  };

  const submitComment = () => {
    if (selectedIndex !== null && comment.trim()) {
      const updated = [...rects];
      updated[selectedIndex].comments.push(comment);
      setRects(updated);
      setComment('');
      setShowCommentBox(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full max-w-4xl border bg-white aspect-video overflow-hidden ${
        mode === 'draw'
          ? 'cursor-crosshair'
          : mode === 'move'
          ? 'cursor-move'
          : mode === 'comment'
          ? 'cursor-pointer'
          : mode === 'delete'
          ? 'cursor-not-allowed'
          : 'cursor-default'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Image underneath */}
      <img
        src={imageSrc}
        alt="annotation"
        className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        draggable={false}
      />

      {/* Render boxes */}
      {rects.map((r, i) => (
        <div
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e, i);
          }}
          className="absolute border-2 border-blue-500 bg-blue-200/30"
          style={{
            top: r.y,
            left: r.x,
            width: r.width,
            height: r.height,
          }}
        >
          {r.comments.length > 0 && (
            <span className="text-xs bg-white px-1 py-0.5 absolute bottom-0 left-0">
              💬 {r.comments.length}
            </span>
          )}
        </div>
      ))}

      {/* Comment box */}
      {showCommentBox && (
        <div className="absolute top-4 right-4 bg-white p-3 shadow-md z-50 w-64 rounded">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment"
            className="w-full h-20 border p-2"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={submitComment}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnotationCanvas;
