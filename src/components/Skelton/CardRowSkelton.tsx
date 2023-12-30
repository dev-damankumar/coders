import CardSkelton from "./CardSkelton";
export type TypeCardRowsSkelton = {
  hideContext: boolean;
};
const CardRowSkelton = (props: TypeCardRowsSkelton) => {
  return (
    <>
      <div className={"col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12"}>
        <CardSkelton hideContext={props.hideContext} />
      </div>
      <div className={"col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12"}>
        <CardSkelton hideContext={props.hideContext} />
      </div>
      <div className={"col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12"}>
        <CardSkelton hideContext={props.hideContext} />
      </div>
    </>
  );
};

export default CardRowSkelton;
