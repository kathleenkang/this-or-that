import styles from "./TextAnimation.module.css";

export function TextAnimation({ voteCount }) {
  return (
    <div className={`${styles.revealText}`}>
      👍
      <span className="italic ml-1.5">{voteCount}</span>
      <div className={`${styles.after}`}></div>
    </div>
  );
}
