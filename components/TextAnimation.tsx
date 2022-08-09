import styles from "./TextAnimation.module.css";

<<<<<<< HEAD
type TextAnimationTypes = {
  voteCount: number;
};

// export function TextAnimation({ voteCount }: number) {
export function TextAnimation({ voteCount }: TextAnimationTypes) {
=======
type Props = {
  voteCount: number;
};

export function TextAnimation({ voteCount }: Props) {
>>>>>>> 48201b2427d880218b4fab659939972c161444ad
  return (
    <div className={`${styles.revealText}`}>
      👍
      <span className="italic ml-1.5">{voteCount}</span>
      <div className={`${styles.after}`}></div>
    </div>
  );
}
