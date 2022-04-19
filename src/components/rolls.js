export default function Rolls(props) {
  const styles = {
    color: props.best ? '#59e391' : 'white',
  };
  return (
    <div className="rolls" style={styles}>
      {props.best ? <span>Best Rolls : </span> : <span>Your Rolls : </span>}
      <span className="digits">
        {props.best ? props.bestRolls : props.rolls}
      </span>
    </div>
  );
}
