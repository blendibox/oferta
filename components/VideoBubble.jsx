"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Produto.module.css";
import Link from 'next/link';



export default function VideoBubble({ title }) {
  const bubbleRef = useRef(null);
  const videoRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 554 }); // posição inicial (right:10px; bottom:84px)

  const urlWidgetBubble = "";
  const productName = title || "";
  const videoName = productName.split("|")[1]?.trim() || "";
  const videoUrl = `/videos/${videoName}.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.play().catch(() => {}); // tenta autoplay no modo miniatura
      videoRef.current.muted = true; // autoplay só funciona muted
      setIsMuted(true);
      setIsPaused(false);
    }
  }, [videoUrl]);

  // Variáveis para arrastar
  const posRef = useRef({ x: 0, y: 0, startX: 0, startY: 0 });

  const onMouseDown = (e) => {
    if (expanded) return; // não arrasta se expandido
    e.preventDefault();
    setDragging(true);

    posRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      x: position.x,
      y: position.y,
    };
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();

    const dx = e.clientX - posRef.current.startX;
    const dy = e.clientY - posRef.current.startY;

    let newX = posRef.current.x + dx;
    let newY = posRef.current.y + dy;

    // Limitar para não sair da tela
    const maxX = window.innerWidth - bubbleRef.current.offsetWidth;
    const maxY = window.innerHeight - bubbleRef.current.offsetHeight;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    setPosition({ x: newX, y: newY });
  };

  const onMouseUp = (e) => {
    if (!dragging) return;
    e.preventDefault();
    setDragging(false);
  };

  const toggleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPaused(false);
      }
    }
  };

  const closeBubble = (e) => {
    e.stopPropagation();
    setExpanded(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      setIsPaused(false);
    }
  };

  const togglePause = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div key="videobubble"
      ref={bubbleRef}
	 
      className={[
        styles["video-bubble"],
        expanded ? styles.expanded : "",
        dragging ? styles.dragging : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={toggleExpand}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        top: position.y,
        right: position.x,
        position: "fixed",
        cursor: expanded ? "default" : "move",
      }}
    >
      <video
        id="produtoVideo"
        ref={videoRef}
        playsInline
        loop
		autoPlay
		muted
        className={expanded ? styles.expanded : ""}
      />
      <button
        id="closeBtn"
        className={styles["close-btn"]}
        onClick={closeBubble}
		 title="Clique para Fechar"
      >
        ✕
      </button>

      <div className={styles["video-controls"]}>
	 
         <Link id="comprarBtn" className="inline-block bg-emerald-600 text-white px-4 py-2 rounded text-xl"
		 alt="Clique para Comprar"
		  href="https://www.blendibox.com.br/bolsa-puffer-3-em-1-de-ombro-transversal-e-mochila-blendibox/p">
		  COMPRAR
		 </Link>
    
        <button id="pauseBtn" onClick={togglePause}>
          <img
            id="pauseIcon"
            src={`/images/videocommands/${
              isPaused ? "play" : "pause"
            }.png`}
            alt="Play/Pause"
          />
        </button>
        <button id="muteBtn" onClick={toggleMute}>
          <img
            id="muteIcon"
            src={`/images/videocommands/${
              isMuted ? "soundx" : "sound"
            }.png`}
            alt="Mute/Unmute"
          />
        </button>
      </div>
    </div>
  );
}
