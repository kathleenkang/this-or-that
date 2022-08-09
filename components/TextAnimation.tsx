import styles from "./TextAnimation.module.css";

type TextAnimationTypes = {
  voteCount: number;
};

// export function TextAnimation({ voteCount }: number) {
export function TextAnimation({ voteCount }: TextAnimationTypes) {
  return (
    <div className={`${styles.revealText}`}>
      👍
      <span className="italic ml-1.5">{voteCount}</span>
      <div className={`${styles.after}`}></div>
    </div>
  );
}
