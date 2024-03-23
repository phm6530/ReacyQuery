export function Person(props) {
  const { hairhair_color, eye_color, name } = props;

  // console.log(props);
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hairhair_color}</li>
        <li>eyes: {eye_color}</li>
      </ul>
    </li>
  );
}
