type TypeHeadingOwnProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
};

type TypeHeadingProps<E extends React.ElementType> = TypeHeadingOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TypeHeadingOwnProps<E>>;

const Heading = <E extends React.ElementType = "div">({
  as,
  children,
  ...rest
}: TypeHeadingProps<E>) => {
  const Component = as || "h2";
  const array = children!.toString().split(" ");
  const half = Math.ceil(array?.length / 2);
  const firstHalf = array?.slice(0, half);
  const secondHalf = array?.slice(half, array?.length);

  return (
    <Component {...rest}>
      <>
        {firstHalf.join(" ")}{" "}
        <span className="highlight-span">{secondHalf?.join(" ")}</span>
      </>
    </Component>
  );
};

export default Heading;
