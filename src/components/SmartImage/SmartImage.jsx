
import { useState } from "react";
import styles from "./SmartImage.module.css";

export default function SmartImage({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  fetchPriority,
  ...props
}) {
  const [status, setStatus] = useState("loading");

  return (
    <span
      className={`${styles.wrapper} ${className}`}
      data-status={status}
    >
      {status === "loading" && (
        <span className={styles.skeleton} aria-hidden="true" />
      )}

      {status === "error" ? (
        <span className={styles.fallback} role="img" aria-label={alt}>
          <span aria-hidden="true">🐈</span>
        </span>
      ) : (
        <img
          {...props}
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          className={styles.image}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </span>
  );
}
