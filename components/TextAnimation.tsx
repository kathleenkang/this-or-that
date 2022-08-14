import styles from "./TextAnimation.module.css";

type Props = {
  voteCount: number;
};

export function TextAnimation({ voteCount }: Props) {
  return (
    <div className={`${styles.revealText}`}>
      👍
      <span className="italic ml-1.5">{voteCount}</span>
      <div className={`${styles.after}`}></div>
    </div>
  );
}
