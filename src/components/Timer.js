export default function Timer(props) {
  const styles = {
    color: props.best ? '#59e391' : 'white',
  };
  return (
    <div className="timer" style={styles}>
      {props.best ? <span>Best Time : </span> : <span>Your Time : </span>}
      <span className="digits">
        {props.timer.hours ? props.timer.hours : '00'}
      </span>
      <span>:</span>
      <span className="digits">
        {props.timer.minutes ? props.timer.minutes : '00'}
      </span>
      <span>:</span>
      <span className="digits">
        {props.timer.seconds ? props.timer.seconds : '00'}
      </span>
    </div>
  );
}
